import { transporter } from '@/config/mailer';
import { virtualAdminId } from '@/utils/constants';
import prisma from '@/utils/prisma';
import type { ChatMessage } from '@prisma/client';
import type { Socket } from 'socket.io';

export const sendHistory = async (a: string, b: string, socket: Socket) => {
  const history = await prisma.chatMessage.findMany({
    where: {
      OR: [
        { senderId: a, receiverId: b },
        { senderId: b, receiverId: a },
      ],
    },
    orderBy: { createdAt: 'asc' },
    include: {
      sender: { select: { id: true, name: true, avatarUrl: true } },
      receiver: { select: { id: true, name: true, avatarUrl: true } },
    },
  });

  socket.emit('chat:history', history);
};

export const sendAllThreads = async (socket: Socket) => {
  const msgs = await prisma.chatMessage.findMany({
    where: {
      OR: [{ senderId: virtualAdminId }, { receiverId: virtualAdminId }],
    },
    orderBy: { createdAt: 'asc' },
    include: { sender: true, receiver: true },
  });

  const threads: Record<string, ChatMessage[]> = {};
  msgs.forEach((m) => {
    const other = m.senderId === virtualAdminId ? m.receiverId : m.senderId;
    threads[other] ??= [];
    threads[other].push(m);
  });

  socket.emit('admin:all-conversations', threads);
};

export const notifyEmail = (
  isAdmin: boolean,
  msg: ChatMessage & {
    sender: { email: string };
    receiver: { email: string };
  }
) => {
  const target = msg.receiver;

  if (!target?.email) return;

  const subject = isAdmin
    ? '💬 Matteo replied to your message'
    : '💬 New chat message';

  const text = isAdmin ? `Matteo replied: ${msg.content}` : msg.content;

  transporter
    .sendMail({
      from: `Matteo Soresini Portfolio Chat`,
      to: target.email,
      subject,
      text,
      html: `
        <div style="font-family: sans-serif; font-size: 14px;">
          <p>${isAdmin ? 'Matteo replied to your message:' : 'You have a new message:'}</p>
          <blockquote style="margin: 0; padding-left: 1em; border-left: 3px solid #ccc;">
            ${msg.content}
          </blockquote>
          <p>Reply on <a href="https://matteosoresini.com">matteosoresini.com</a></p>
        </div>
      `,
    })
    .catch((err) => console.error('mail error', err));
};
