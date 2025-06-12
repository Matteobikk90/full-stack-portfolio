import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const getAllProjects = async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(projects);
};
