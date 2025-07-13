import prisma from '@/utils/prisma';
import type { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

export const handleSearch = async (_req: Request, res: Response) => {
  const filters = res.locals.query;

  const { technology, location, company } = filters as {
    technology?: string[];
    location?: string[];
    company?: string[];
  };

  const experiencePromise = prisma.experience.findMany({
    where: {
      AND: [
        technology?.length
          ? { technologies: { hasSome: technology } }
          : undefined,
        location?.length
          ? {
              OR: [
                { location: { in: location } },
                { isRemote: location.includes('Remote') },
              ],
            }
          : undefined,
        company?.length ? { company: { in: company } } : undefined,
      ].filter(Boolean) as Prisma.ExperienceWhereInput[],
    },
    orderBy: { startDate: 'desc' },
  });

  const projectPromise = prisma.project.findMany({
    where: {
      AND: [
        technology?.length
          ? { technologies: { hasSome: technology } }
          : undefined,
        company?.length
          ? {
              experience: {
                some: {
                  company: { in: company },
                },
              },
            }
          : undefined,
      ].filter(Boolean) as Prisma.ProjectWhereInput[],
    },
    orderBy: { createdAt: 'desc' },
  });

  const [experiences, projects] = await Promise.all([
    experiencePromise,
    projectPromise,
  ]);

  res.status(200).json({ experiences, projects });
};
