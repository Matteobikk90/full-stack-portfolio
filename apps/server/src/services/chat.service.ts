import { notifyEmail, sendAllThreads, sendHistory } from '@/utils/chat';
import {
  adminEmails,
  emailCooldowns,
  JWT_SECRET,
  virtualAdminId,
} from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

const chatRoom = (userId: string) => `chat:${userId}`;

export const registerChat = (io: Server) => {
  io.use(async (socket, next) => {
    const token = socket.request.headers.cookie
      ?.split('; ')
      .find((c) => c.startsWith('accessToken='))
      ?.split('=')[1];

    if (!token) return next(new Error('missing token'));

    try {
      const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) return next(new Error('user not found'));

      const isAdmin = adminEmails.includes(user.email);
      socket.data.realUserId = userId;
      socket.data.isAdmin = isAdmin;
      socket.data.userId = isAdmin ? virtualAdminId : user.id;
      next();
    } catch (err) {
      console.error('JWT error', err);
      next(new Error('bad token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const connectedId = socket.data.userId as string;
    const isAdmin = socket.data.isAdmin as boolean;

    void socket.join(chatRoom(connectedId));

    if (isAdmin) {
      void sendAllThreads(socket).catch((error) =>
        console.error('chat threads error', error)
      );
    } else {
      void sendHistory(connectedId, virtualAdminId, socket).catch((error) =>
        console.error('chat history error', error)
      );
      socket.emit('chat:init', { adminId: virtualAdminId });
    }

    socket.on('admin:set-partner', (partnerId: unknown, callback) => {
      if (!isAdmin || typeof partnerId !== 'string' || !partnerId) {
        if (callback) callback(false);
        return;
      }

      socket.data.chatPartnerId = partnerId;
      sendHistory(virtualAdminId, partnerId, socket)
        .then(() => {
          if (callback) callback(true);
        })
        .catch((error) => {
          console.error('chat history error', error);
          if (callback) callback(false);
        });
    });

    socket.on('chat:message', async (txt: unknown) => {
      if (typeof txt !== 'string') return;

      const content = txt.trim();
      if (!content) return;

      const to = isAdmin ? socket.data.chatPartnerId : virtualAdminId;
      if (!to) {
        console.warn(`admin socket ${socket.id} has no partner set`);
        return;
      }

      try {
        const msg = await prisma.chatMessage.create({
          data: {
            senderId: connectedId,
            receiverId: to,
            content,
          },
          include: { sender: true, receiver: true },
        });

        const targetId = isAdmin ? msg.receiverId : msg.senderId;

        io.to(chatRoom(connectedId)).to(chatRoom(to)).emit('chat:message', msg);

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
      } catch (error) {
        console.error('chat message error', error);
      }
    });

    socket.on('disconnect', () =>
      console.log('user disconnected', connectedId)
    );
  });
};
