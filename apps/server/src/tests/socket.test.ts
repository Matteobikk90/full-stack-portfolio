import { httpServer } from '@/config/socket';
import { PORT } from '@/utils/constants';
import { io as Client } from 'socket.io-client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const URL = `http://localhost:${PORT}`;

let server: ReturnType<typeof httpServer.listen>;

beforeAll(() => {
  server = httpServer.listen(PORT, () => {
    return;
  });
});

afterAll(() => server.close());

describe('Socket.IO Chat', () => {
  it('sender also receives their own message', () => {
    return new Promise<void>((resolve, reject) => {
      const client = Client('http://localhost:4000', {
        transports: ['websocket'],
        reconnection: false,
      });

      const testMessage = 'self message';

      client.on('connect', () => {
        client.emit('chat:message', testMessage);
      });

      client.on('chat:message', (msg) => {
        try {
          expect(msg).toBe(testMessage);
          client.disconnect();
          resolve();
        } catch (error) {
          client.disconnect();
          reject(error);
        }
      });

      client.on('connect_error', reject);
    });
  });

  it('allows multiple clients to connect simultaneously', () =>
    new Promise<void>((resolve) => {
      const client1 = Client(URL);
      const client2 = Client(URL);

      let connectedCount = 0;

      const onConnect = () => {
        connectedCount++;
        if (connectedCount === 2) {
          client1.disconnect();
          client2.disconnect();
          resolve();
        }
      };

      client1.on('connect', onConnect);
      client2.on('connect', onConnect);
    }));

  it('sender also receives their own message', () =>
    new Promise<void>((resolve) => {
      const client = Client(URL);
      const testMessage = 'self message';

      client.on('chat:message', (msg) => {
        expect(msg).toBe(testMessage);
        client.disconnect();
        resolve();
      });

      client.on('connect', () => {
        client.emit('chat:message', testMessage);
      });
    }));

  it('handles client disconnects gracefully', () =>
    new Promise<void>((resolve) => {
      const client = Client(URL);

      client.on('connect', () => {
        client.disconnect();
      });

      client.on('disconnect', () => {
        resolve();
      });
    }));
});
