import { initSentry } from '@/config/sentry';
import { httpServer, io } from '@/config/socket';
import { JWT_SECRET, PORT } from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';

initSentry();

io.use((socket, next) => {
  const token = socket.request.headers.cookie
    ?.split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  if (!token) {
    return next(new Error('Authentication token missing'));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    socket.data.userId = payload.userId;
    next();
  } catch (err) {
    console.error(err);
    return next(new Error('Invalid token'));
  }
});

io.on('connection', async (socket) => {
  console.log('✅ User connected:', socket.data.userId, socket.id);

  socket.emit(
    'chat:history',
    await prisma.chatMessage.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: { sender: true },
    })
  );

  socket.on('chat:message', async (content: string) => {
    if (!content.trim()) return;

    try {
      const saved = await prisma.chatMessage.create({
        data: {
          content,
          senderId: socket.data.userId,
        },
        include: {
          sender: true,
        },
      });

      io.to('public-room').emit('chat:message', saved);
    } catch (err) {
      console.error('❌ Failed to save message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('🚪 User disconnected:', socket.data.userId, socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server + WebSocket listening on http://localhost:${PORT}`);
});
