export const mockExperiences = [
  {
    id: 'exp_1',
    company: 'Hydrogrid GmbH',
    title: 'Frontend Developer',
    location: 'Vienna, Austria',
    startDate: '2021-06-01T00:00:00.000Z',
    endDate: '2023-04-01T00:00:00.000Z',
    description:
      'Designed and maintained internal and customer-facing dashboards for monitoring hydropower plant performance.',
    duties: [
      'Developed modular React components using hooks and Tailwind CSS',
      'Worked closely with designers to implement responsive UI',
      'Integrated real-time data via WebSocket and REST APIs',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Chart.js',
      'WebSocket',
    ],
    imageUrl: 'https://logo.clearbit.com/hydrogrid.io',
    likesCount: 12,
    commentsCount: 3,
    hasLiked: false,
  },
  {
    id: 'exp_2',
    company: 'Freelance',
    title: 'Full-Stack Developer',
    location: 'Remote',
    startDate: '2023-05-01T00:00:00.000Z',
    endDate: null,
    description:
      'Built a travel blogging platform with authentication, real-time chat, and interactive maps.',
    duties: [
      'Implemented backend with Express and Prisma',
      'Used React + TanStack Router for routing and forms',
      'Integrated chat with Socket.IO and deployed with Docker',
    ],
    technologies: [
      'React',
      'Node.js',
      'Express',
      'Prisma',
      'Docker',
      'Socket.IO',
    ],
    imageUrl: null,
    likesCount: 27,
    commentsCount: 8,
    hasLiked: true,
  },
  {
    id: 'exp_3',
    company: 'StartupX',
    title: 'Product Engineer',
    location: 'Milan, Italy',
    startDate: '2020-01-15T00:00:00.000Z',
    endDate: '2021-05-30T00:00:00.000Z',
    description:
      'Contributed to building and scaling the MVP for a B2B SaaS analytics platform from scratch.',
    duties: [
      'Worked on authentication and user onboarding',
      'Implemented interactive dashboards with charting libraries',
      'Set up CI/CD pipelines and monitoring tools',
    ],
    technologies: ['Next.js', 'Firebase', 'Zod', 'Vercel', 'Vitest'],
    imageUrl: 'https://logo.clearbit.com/startupx.io',
    likesCount: 9,
    commentsCount: 1,
    hasLiked: false,
  },
];
