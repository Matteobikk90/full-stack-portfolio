import { experience, skillsFontSize } from '@/utils/constants';
import { Icon } from '@iconify/react';

export const resumeItems = [
  { href: '/resume/experience', label: 'Experience' },
  { href: '/resume/education', label: 'Education' },
  { href: '/resume/skills', label: 'Skills' },
  { href: '/resume/about', label: 'About Me' },
];

export const educationItems = [
  {
    id: 'webDev',
    year: '2016',
    title: 'Web Development Bootcamp',
    institution: 'General Assembly',
    location: 'London, UK',
  },
  {
    id: 'highSchool',
    year: '2011',
    title: 'High School Diploma',
    institution: 'Liceo Scientifico',
    location: 'Turin, IT',
  },
];

export const skillItems = [
  { id: 'html', icon: <Icon fontSize={skillsFontSize} icon="logos:html-5" /> },
  { id: 'css', icon: <Icon fontSize={skillsFontSize} icon="logos:css-3" /> },
  {
    id: 'js',
    icon: <Icon fontSize={skillsFontSize} icon="logos:javascript" />,
  },
  { id: 'react', icon: <Icon fontSize={skillsFontSize} icon="logos:react" /> },
  {
    id: 'next',
    icon: <Icon fontSize={skillsFontSize} icon="logos:typescript-icon" />,
  },
  {
    id: 'tailwind',
    icon: <Icon fontSize={skillsFontSize} icon="logos:tailwindcss-icon" />,
  },
  {
    id: 'node',
    icon: <Icon fontSize={skillsFontSize} icon="logos:nodejs-icon" />,
  },
  {
    id: 'postgres',
    icon: <Icon fontSize={skillsFontSize} icon="logos:postgresql" />,
  },
  {
    id: 'prisma',
    icon: <Icon fontSize={skillsFontSize} icon="logos:prisma" />,
  },
  {
    id: 'vitest',
    icon: <Icon fontSize={skillsFontSize} icon="logos:vitest" />,
  },
  {
    id: 'playwright',
    icon: <Icon fontSize={skillsFontSize} icon="logos:playwright" />,
  },
  { id: 'figma', icon: <Icon fontSize={skillsFontSize} icon="logos:figma" /> },
];

export const aboutInfo = [
  { label: 'Name', value: 'Matteo Soresini' },
  { label: 'Phone', value: '(+39) 347 043 8232' },
  { label: 'Email', value: 'matteo.soresini@hotmail.it' },
  { label: 'Experience', value: experience },
  { label: 'GitHub', value: '/Matteobikk90' },
  { label: 'LinkedIn', value: '/in/matteosoresini90/' },
  { label: 'Nationality', value: 'Italian' },
  { label: 'Languages', value: 'English, Spanish' },
];
