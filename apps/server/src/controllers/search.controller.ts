import prisma from '@/utils/prisma';
import type { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

export const handleSearch = async (_req: Request, res: Response) => {
  const {
    technology = [],
    location = [],
    company = [],
  } = res.locals.query as Record<string, string[]>;

  const [experiences, projects] = await Promise.all([
    prisma.experience.findMany({
      where: {
        AND: [
          technology.length && { technologies: { hasSome: technology } },
          location.length && {
            OR: [
              { location: { in: location } },
              { isRemote: location.includes('Remote') },
            ],
          },
          company.length && { company: { in: company } },
        ].filter(Boolean) as Prisma.ExperienceWhereInput[],
      },
      orderBy: { startDate: 'desc' },
    }),

    prisma.project.findMany({
      where: {
        AND: [
          technology.length && { technologies: { hasSome: technology } },
          company.length && {
            experience: {
              some: {
                company: { in: company },
              },
            },
          },
        ].filter(Boolean) as Prisma.ProjectWhereInput[],
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  res.status(200).json({ experiences, projects });
};
