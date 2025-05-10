import { sendContactEmail } from '@/services/contact.service';
import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const handleContactMessage = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  await prisma.contactMessage.create({
    data: { name, email, message },
  });

  await sendContactEmail({ name, email, message });

  res.status(201).json({ message: 'Message sent successfully' });
  return;
};
