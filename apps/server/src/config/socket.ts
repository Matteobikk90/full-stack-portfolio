import { createServer } from 'http';
import app from '@/app';
import { Server as SocketIOServer } from 'socket.io';

export const httpServer = createServer(app);
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://dev.matteosoresini.com',
      'https://matteosoresini.com',
      'https://www.matteosoresini.com',
    ],
    credentials: true,
  },
});
