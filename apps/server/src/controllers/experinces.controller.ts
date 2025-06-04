import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const getAllExperiences = async (_req: Request, res: Response) => {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: 'desc' },
    select: {
      id: true,
      company: true,
      title: true,
      location: true,
      isRemote: true,
      startDate: true,
      endDate: true,
    },
  });
  res.json(experiences);
};

export const getExperienceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const experience = await prisma.experience.findUnique({
    where: { id },
    include: {
      comments: { include: { user: true } },
      likes: true,
      projects: true,
    },
  });

  if (!experience) {
    res.status(404).json({ message: 'Experience not found' });
  }

  res.json(experience);
};

export const createExperience = async (req: Request, res: Response) => {
  const experience = await prisma.experience.create({ data: req.body });
  res.status(201).json(experience);
};

export const updateExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await prisma.experience.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
};

export const deleteExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.experience.delete({ where: { id } });
  res.status(204).send();
};
