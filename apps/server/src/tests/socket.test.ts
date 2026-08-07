import { createServer, type Server as HttpServer } from 'http';
import { registerChat } from '@/services/chat.service';
import {
  adminEmails,
  emailCooldowns,
  JWT_SECRET,
  virtualAdminId,
} from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import { Server as SocketServer } from 'socket.io';
import {
  io as createClient,
  type Socket as ClientSocket,
} from 'socket.io-client';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

vi.mock('@/utils/prisma', () => ({
  default: {
    user: { findUnique: vi.fn() },
    chatMessage: { create: vi.fn() },
  },
}));

vi.mock('@/utils/chat', () => ({
  notifyEmail: vi.fn(),
  sendAllThreads: vi.fn().mockResolvedValue(undefined),
  sendHistory: vi.fn().mockResolvedValue(undefined),
}));

const adminUser = {
  id: 'real-admin-id',
  email: adminEmails[0],
  name: 'Matteo',
  avatarUrl: null,
};

const virtualAdmin = {
  id: virtualAdminId,
  email: 'matteo@admin.com',
  name: 'Matteo',
  avatarUrl: null,
};

const regularUser = {
  id: 'regular-user-id',
  email: 'user@example.com',
  name: 'User',
  avatarUrl: null,
};

const users = new Map([
  [adminUser.id, adminUser],
  [virtualAdmin.id, virtualAdmin],
  [regularUser.id, regularUser],
]);

const tokenFor = (userId: string) => jwt.sign({ userId }, JWT_SECRET);

const once = <T>(socket: ClientSocket, event: string) =>
  new Promise<T>((resolve) => socket.once(event, resolve));

const connectClient = (url: string, userId: string) =>
  new Promise<ClientSocket>((resolve, reject) => {
    const socket = createClient(url, {
      extraHeaders: { Cookie: `accessToken=${tokenFor(userId)}` },
      forceNew: true,
      reconnection: false,
      transports: ['websocket'],
    });

    socket.once('connect', () => resolve(socket));
    socket.once('connect_error', reject);
  });

describe('Socket.IO chat', () => {
  let httpServer: HttpServer;
  let io: SocketServer;
  let url: string;
  let messageId = 0;
  const clients: ClientSocket[] = [];

  beforeAll(async () => {
    httpServer = createServer();
    io = new SocketServer(httpServer);
    registerChat(io);

    await new Promise<void>((resolve) => httpServer.listen(0, resolve));
    const address = httpServer.address();
    if (!address || typeof address === 'string') {
      throw new Error('Could not start socket test server');
    }
    url = `http://127.0.0.1:${address.port}`;
  });

  beforeEach(() => {
    vi.mocked(prisma.user.findUnique).mockImplementation((async ({
      where,
    }: {
      where: { id?: string };
    }) => (where.id ? (users.get(where.id) ?? null) : null)) as never);

    vi.mocked(prisma.chatMessage.create).mockImplementation((async (args: {
      data: { content: string; receiverId: string; senderId: string };
    }) => {
      const { data } = args;
      const sender = users.get(data.senderId);
      const receiver = users.get(data.receiverId);

      if (!sender || !receiver) throw new Error('Unknown chat participant');

      return {
        id: `message-${++messageId}`,
        content: data.content,
        createdAt: new Date(),
        senderId: data.senderId,
        receiverId: data.receiverId,
        sender,
        receiver,
      } as never;
    }) as never);
  });

  afterEach(() => {
    clients.splice(0).forEach((client) => client.disconnect());
    emailCooldowns.forEach((timeout) => clearTimeout(timeout));
    emailCooldowns.clear();
    vi.clearAllMocks();
  });

  afterAll(async () => {
    await io.close();
  });

  it('delivers messages from user to admin and from admin to user', async () => {
    const [admin, user] = await Promise.all([
      connectClient(url, adminUser.id),
      connectClient(url, regularUser.id),
    ]);
    clients.push(admin, user);

    const adminReceivesUserMessage = once<{
      content: string;
      senderId: string;
      receiverId: string;
    }>(admin, 'chat:message');
    user.emit('chat:message', 'Hello admin');

    await expect(adminReceivesUserMessage).resolves.toMatchObject({
      content: 'Hello admin',
      senderId: regularUser.id,
      receiverId: virtualAdminId,
    });

    await new Promise<void>((resolve, reject) => {
      admin.emit('admin:set-partner', regularUser.id, (accepted: boolean) => {
        if (accepted) resolve();
        else reject(new Error('Admin partner was rejected'));
      });
    });

    const userReceivesAdminMessage = once<{
      content: string;
      senderId: string;
      receiverId: string;
    }>(user, 'chat:message');
    admin.emit('chat:message', 'Hello user');

    await expect(userReceivesAdminMessage).resolves.toMatchObject({
      content: 'Hello user',
      senderId: virtualAdminId,
      receiverId: regularUser.id,
    });
  });

  it('rejects connections without an authenticated user', async () => {
    const socket = createClient(url, {
      forceNew: true,
      reconnection: false,
      transports: ['websocket'],
    });
    clients.push(socket);

    await expect(once<Error>(socket, 'connect_error')).resolves.toMatchObject({
      message: 'missing token',
    });
  });
});
