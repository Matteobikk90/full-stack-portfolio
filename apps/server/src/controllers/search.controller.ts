import prisma from '@/utils/prisma';
import type { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

export const handleSearch = async (_req: Request, res: Response) => {
  const {
    technology = [],
    location = [],
    company = [],
    role = [],
  } = res.locals.query as Record<string, string[]>;

  const [experiences, projects] = await Promise.all([
    prisma.experience.findMany({
      where: {
        AND: [
          technology.length && { technologies: { hasSome: technology } },
          location.length && {
            OR: [
              ...location.map((loc) => ({
                location: { contains: loc, mode: 'insensitive' },
              })),
              ...(location.includes('Remote') ? [{ isRemote: true }] : []),
            ],
          },
          company.length && { company: { in: company } },
          role.length && { role: { in: role } },
        ].filter(Boolean) as Prisma.ExperienceWhereInput[],
      },
      orderBy: { startDate: 'desc' },
    }),

    prisma.project.findMany({
      where: {
        AND: [
          technology.length && { technologies: { hasSome: technology } },
          location.length && {
            OR: [
              ...location.map((loc) => ({
                company: { contains: loc, mode: 'insensitive' },
              })),
              ...(location.includes('Remote') ? [{ isRemote: true }] : []),
            ],
          },
          company.length && { company: { in: company } },
          role.length && { role: { in: role } },
        ].filter(Boolean) as Prisma.ProjectWhereInput[],
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  res.status(200).json({ experiences, projects });
};
