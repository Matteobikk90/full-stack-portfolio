import { sendContactEmail } from '@/services/contact.service';
import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const handleContactMessage = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  try {
    const savedMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    await sendContactEmail({ name, email, message });

    return res.status(201).json({
      status: 'success',
      message: 'Message sent successfully',
      data: {
        id: savedMessage.id,
        createdAt: savedMessage.createdAt,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong while sending your message.',
    });
  }
};
