import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const toggleLike = async (req: Request, res: Response) => {
  const userId = (req.user as { userId: string }).userId;
  const { experienceId, projectId } = req.body;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId,
      experienceId: experienceId || undefined,
      projectId: projectId || undefined,
    },
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
    res.status(204).json({ liked: false });
  }

  const newLike = await prisma.like.create({
    data: {
      userId,
      experienceId,
      projectId,
    },
  });

  res.status(201).json({ liked: true, like: newLike });
};
