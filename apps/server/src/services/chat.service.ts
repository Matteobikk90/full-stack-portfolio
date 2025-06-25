import { notifyEmail, sendAllThreads, sendHistory } from '@/utils/chat';
import { adminEmails, emailCooldowns, JWT_SECRET } from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

export const registerChat = (io: Server) => {
  io.use((socket, next) => {
    const token = socket.request.headers.cookie
      ?.split('; ')
      .find((c) => c.startsWith('accessToken='))
      ?.split('=')[1];

    if (!token) return next(new Error('missing token'));

    try {
      const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
      socket.data.userId = userId;
      next();
    } catch (err) {
      console.error('JWT error', err);
      next(new Error('bad token'));
    }
  });

  io.on('connection', async (socket: Socket) => {
    const connectedId = socket.data.userId as string;
    const user = await prisma.user.findUnique({ where: { id: connectedId } });
    const admin = await prisma.user.findFirst({
      where: { email: { in: adminEmails } },
    });
    if (!user || !admin) return;

    const isAdmin = adminEmails.includes(user.email);

    if (isAdmin) sendAllThreads(socket, admin.id);
    else sendHistory(connectedId, admin.id, socket);

    socket.on('admin:set-partner', (partnerId, callback) => {
      socket.data.chatPartnerId = partnerId;
      sendHistory(admin.id, partnerId, socket).then(() => {
        if (callback) callback();
      });
    });

    socket.on('chat:message', async (txt: string) => {
      const content = txt.trim();
      if (!content) return;

      const to = isAdmin ? socket.data.chatPartnerId : admin.id;
      if (!to) {
        console.warn(`admin socket ${socket.id} has no partner set`);
        return;
      }

      const msg = await prisma.chatMessage.create({
        data: { senderId: connectedId, receiverId: to, content },
        include: { sender: true, receiver: true },
      });
      const targetId = isAdmin ? msg.receiverId : msg.senderId;

      io.sockets.sockets.forEach((s) => {
        const uid = s.data.userId;
        if (uid === connectedId || uid === to) {
          s.emit('chat:message', msg);
        }
      });

      if (emailCooldowns.has(targetId)) {
        clearTimeout(emailCooldowns.get(targetId)!);
      }

      emailCooldowns.set(
        targetId,
        setTimeout(() => {
          notifyEmail(isAdmin, msg);
          emailCooldowns.delete(targetId);
        }, 20_000)
      );
    });

    socket.on('disconnect', () =>
      console.log('user disconnected', connectedId)
    );
  });
};
