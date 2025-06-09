import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const getAllProjects = async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    res.status(404).json({ message: 'Project not found' });
  }

  res.json(project);
};

export const createProject = async (req: Request, res: Response) => {
  const project = await prisma.project.create({ data: req.body });
  res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await prisma.project.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.project.delete({ where: { id } });
  res.status(204).send();
};
