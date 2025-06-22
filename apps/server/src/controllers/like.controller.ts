import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const getLikes = async (req: Request, res: Response) => {
  const userId = (req.user as { userId: string }).userId;
  const { projectId } = req.params;

  const likesCount = await prisma.like.count({ where: { projectId } });

  const hasLiked = userId
    ? !!(await prisma.like.findFirst({
        where: { userId, projectId },
        select: { id: true },
      }))
    : false;

  return res.status(200).json({ likesCount, hasLiked });
};

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

  const likesCount = await prisma.like.count({ where: { projectId } });
  const hasLiked = !existingLike;

  return res.status(200).json({ likesCount, hasLiked });
};
