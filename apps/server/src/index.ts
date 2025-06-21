import 'dotenv/config';
import { initSentry } from '@/config/sentry';
import { httpServer, io } from '@/config/socket';
import { JWT_SECRET, PORT } from '@/utils/constants';
import prisma from '@/utils/prisma';
import type { ChatMessage } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { transporter } from './config/mailer';

initSentry();

const ADMIN_EMAIL = 'matteo.soresini@hotmail.it';

io.use((socket, next) => {
  const token = socket.request.headers.cookie
    ?.split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  if (!token) return next(new Error('Authentication token missing'));

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    socket.data.userId = payload.userId;
    next();
  } catch (err) {
    console.error('❌ Invalid JWT:', err);
    return next(new Error('Invalid token'));
  }
});

io.on('connection', async (socket) => {
  const userId = socket.data.userId;

  const [admin, user] = await Promise.all([
    prisma.user.findUnique({ where: { email: ADMIN_EMAIL } }),
    prisma.user.findUnique({ where: { id: userId } }),
  ]);

  if (!admin || !user) return;

  const isAdmin = user.email === ADMIN_EMAIL;

  if (isAdmin) {
    const messages = await prisma.chatMessage.findMany({
      where: {
        OR: [{ receiverId: admin.id }, { senderId: admin.id }],
      },
      orderBy: { createdAt: 'asc' },
      include: { sender: true, receiver: true },
    });

    const threads: Record<string, ChatMessage[]> = {};
    for (const msg of messages) {
      const otherUser = msg.senderId === admin.id ? msg.receiver : msg.sender;

      if (!otherUser) continue;
      if (!threads[otherUser.id]) threads[otherUser.id] = [];
      threads[otherUser.id].push(msg);
    }

    socket.emit('admin:all-conversations', threads);
  } else {
    const history = await prisma.chatMessage.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: admin.id },
          { senderId: admin.id, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: { sender: true, receiver: true },
    });

    socket.emit('chat:history', history);
  }

  socket.on('chat:message', async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const receiverId =
      user.email === ADMIN_EMAIL ? socket.data.chatPartnerId : admin.id;

    try {
      const saved = await prisma.chatMessage.create({
        data: {
          content: trimmed,
          senderId: userId,
          receiverId,
        },
        include: {
          sender: true,
          receiver: true,
        },
      });

      const sockets = await io.fetchSockets();
      sockets.forEach((s) => {
        const sid = s.data.userId;
        if (sid === userId || sid === receiverId) {
          s.emit('chat:message', saved);
        }
      });

      if (user.email !== ADMIN_EMAIL) {
        await transporter.sendMail({
          from: `"Portfolio Chat" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL,
          subject: `💬 New Chat Message from ${user.name || 'Anonymous'}`,
          text: `Message:\n${trimmed}\n\nFrom: ${user.email}\n\nOpen chat: https://matteosoresini.com`,
        });
      }
    } catch (err) {
      console.error('❌ Failed to save message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('🚪 User disconnected:', userId, socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server + WebSocket listening on http://localhost:${PORT}`);
});
