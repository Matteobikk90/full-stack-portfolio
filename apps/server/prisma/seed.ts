import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.experience.create({
    data: {
      company: 'World Data Lab',
      title: 'Front End Developer',
      location: 'Vienna, AT',
      isRemote: true,
      startDate: new Date('2022-03-01'),
      endDate: new Date('2025-07-01'),
      description:
        'Built responsive web applications delivering real-time data and projections out to 2030. Developed models for data visualization on various global issues such as population, hunger, poverty, and water shortage.',
      duties: [
        'Built responsive web applications delivering real-time data and projections out to 2030',
        'Developed models for data visualization on global issues',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Angular',
        'JavaScaript',
        'Node.js',
        'Express.js',
        'Prisma',
        'PostgreSQL',
        'Zustand',
        'TailwindCSS',
        'TanStack Router',
        'TanStack Form',
        'React Query',
        'Framer Motion',
        'ShadeCn',
        'Material UI',
        'Radix UI',
        'Vite',
        'PNPM',
        'Vitest',
        'Playwright',
        'Storybook',
        'GitHub',
        'GitLab',
        'Atlassian Suite (Jira, Confluence)',
        'Sentry',
        'Hotjar',
        'Figma',
      ],
      imageUrl: null,
      projects: {
        create: [
          {
            title: 'World Emissions Clock',
            url: 'https://worldemissions.io/',
          },
          {
            title: 'Internet Poverty Index',
            url: 'https://internetpoverty.io/',
          },
          { title: 'Africa Youth Clock', url: 'https://africayouthjobs.io/' },
          {
            title: 'Africa Social Protection',
            url: 'https://africasocialprotection.io/',
          },
          { title: 'Water Crisis Clock', url: 'https://worldwater.io/' },
          {
            title: 'Categories Clock',
            url: 'https://futureconsumerdemand.io/',
          },
        ],
      },
    },
  });

  await prisma.experience.createMany({
    data: [
      {
        company: 'Hydrogrid',
        title: 'Front End Developer',
        location: 'Vienna, AT',
        isRemote: false,
        startDate: new Date('2020-11-01'),
        endDate: new Date('2022-02-28'),
        description:
          'Maintained real-time electricity dashboards for Hydrogrid using React with Hooks. Supported both client-facing and internal systems.',
        duties: [
          'Designed and maintained real-time electricity dashboards',
          'Used React.js with Hooks for fast, secure, and interactive UIs',
          'Developed internal dashboard for simulation and onboarding',
        ],
        technologies: [
          'React',
          'TypeScript',
          'React Native',
          'JavaScaript',
          'TailwindCSS',
          'GitHub',
          'GitLab',
          'Atlassian Suite (Jira, Confluence)',
          'Sentry',
          'Hotjar',
          'Figma',
        ],
        imageUrl: null,
      },
      {
        company: 'Eis World',
        title: 'Front End Developer',
        location: 'Turin, IT',
        isRemote: false,
        startDate: new Date('2019-01-01'),
        endDate: new Date('2020-01-01'),
        description:
          'Built websites from scratch, led GIT merging processes, and handled backend tasks using PHP and MySQL.',
        duties: [
          'Developed websites using modern web technologies',
          'Managed Git merges as team lead',
          'Handled backend with PHP and MySQL, including PDF generation',
        ],
        technologies: [
          'JavaScript',
          'PHP',
          'MySQL',
          'SCSS',
          'TailwindCSS',
          'GitLab',
          'Atlassian Suite (Jira, Confluence)',
        ],
        imageUrl: null,
      },
      {
        company: 'Loro Piana',
        title: 'Front End Developer',
        location: 'Turin, IT',
        isRemote: false,
        startDate: new Date('2018-01-01'),
        endDate: new Date('2019-01-01'),
        description:
          'Built a new e-commerce platform focused on front-end design and WCAG compliance.',
        duties: [
          'Developed a custom e-commerce frontend',
          'Focused on UI/UX and WCAG accessibility standards',
        ],
        technologies: [
          'JavaScript',
          'jQuery',
          'WCAG',
          'BootStrap',
          'HTML5',
          'CSS3',
          'Gulp',
        ],
        imageUrl: null,
      },
      {
        company: 'VideoSmart',
        title: 'Front End Developer',
        location: 'London, UK',
        isRemote: false,
        startDate: new Date('2017-04-01'),
        endDate: new Date('2018-01-01'),
        description:
          'Created responsive HTML5 landing pages and email templates. Ensured cross-browser compatibility and responsiveness across devices.',
        duties: [
          'Created responsive HTML5 landing pages and email templates based on specified designs',
          'Ensured cross-browser compatibility and responsiveness on various devices',
        ],
        technologies: ['JavaScript', 'jQuery', 'BootStrap', 'HTML5', 'CSS3'],
        imageUrl: null,
      },
    ],
  });

  console.log('Seeded experiences successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding:', e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
