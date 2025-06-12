import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const toggleLike = async (req: Request, res: Response) => {
  const userId = (req.user as { userId: string }).userId;
  const { projectId } = req.body;

  if (!userId || !projectId) {
    return res.status(400).json({ error: 'Missing projectId or userId' });
  }

  const existingLike = await prisma.like.findFirst({
    where: { userId, projectId },
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
  } else {
    await prisma.like.create({ data: { userId, projectId } });
  }

  const updatedCount = await prisma.like.count({ where: { projectId } });
  const stillLiked = await prisma.like.findFirst({
    where: { userId, projectId },
  });

  return res.status(201).json({
    likesCount: updatedCount,
    hasLiked: !!stillLiked,
  });
};
