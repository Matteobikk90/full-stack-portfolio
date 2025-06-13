import prisma from '@/utils/prisma';
import { Request, Response } from 'express';

export const getAllExperiences = async (_req: Request, res: Response) => {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: 'desc' },
    select: {
      id: true,
      company: true,
      slug: true,
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
  const { id: slug } = req.params;
  const experience = await prisma.experience.findUnique({
    where: { slug },
    include: {
      projects: true,
    },
  });

  if (!experience) {
    res.status(404).json({ message: 'Experience not found' });
  }

  res.json(experience);
};
