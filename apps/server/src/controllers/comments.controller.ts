import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const createComment = async (req: Request, res: Response) => {
  const userId = (req.user as { userId: string }).userId;
  const { content, experienceId, projectId } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      experienceId,
      projectId,
    },
  });

  res.status(201).json(comment);
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req.user as { userId: string }).userId;
  const { content } = req.body;

  const existing = await prisma.comment.findUnique({ where: { id } });

  if (!existing || existing.userId !== userId) {
    res.status(403).json({ message: 'Not allowed to update this comment' });
  }

  const updated = await prisma.comment.update({
    where: { id },
    data: { content },
  });

  res.json(updated);
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.comment.delete({
    where: { id },
  });

  res.status(204).send();
};
