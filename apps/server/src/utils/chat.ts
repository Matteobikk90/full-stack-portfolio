import prisma from '@/utils/prisma';
import type { ChatMessage } from '@prisma/client';
import type { Socket } from 'socket.io';

export const sendHistory = async (a: string, b: string, socket: Socket) => {
  const hist = await prisma.chatMessage.findMany({
    where: {
      OR: [
        { senderId: a, receiverId: b },
        { senderId: b, receiverId: a },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });

  socket.emit('chat:history', hist);
};

export const sendAllThreads = async (socket: Socket, adminId: string) => {
  const msgs = await prisma.chatMessage.findMany({
    where: { OR: [{ senderId: adminId }, { receiverId: adminId }] },
    orderBy: { createdAt: 'asc' },
  });

  const threads: Record<string, ChatMessage[]> = {};
  msgs.forEach((m) => {
    const other = m.senderId === adminId ? m.receiverId : m.senderId;
    threads[other] ??= [];
    threads[other].push(m);
  });

  socket.emit('admin:all-conversations', threads);
};

// export const notifyAdmin = (msg: ChatMessage) => {
//   transporter
//     .sendMail({
//       from: `"Portfolio Chat" <${process.env.SMTP_USER}>`,
//       to: process.env.CONTACT_EMAIL,
//       subject: '💬 New chat message',
//       text: msg.content,
//     })
//     .catch((err) => console.error('mail error', err));
// };
