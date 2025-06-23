import { experience, skillsFontSize } from '@/utils/constants';
import { handleDownload } from '@/utils/download';
import { Icon } from '@iconify/react';
import {
  FilePdfIcon,
  GithubLogoIcon,
  HandshakeIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react';

export const resumeItems = [
  { href: '/resume/experience', id: 'experience' },
  { href: '/resume/education', id: 'education' },
  { href: '/resume/skills', id: 'skills' },
  { href: '/resume/about', id: 'about' },
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

export const actions = [
  {
    id: 'GitHub',
    label: 'GitHub',
    icon: <GithubLogoIcon className="size-5" weight="duotone" />,
    href: 'https://github.com/Matteobikk90',
    external: true,
    align: 'center' as const,
  },
  {
    id: 'LinkedIn',
    label: 'LinkedIn',
    icon: <LinkedinLogoIcon className="size-5" weight="duotone" />,
    href: 'https://www.linkedin.com/in/matteosoresini90/',
    external: true,
    align: 'center' as const,
  },
  {
    id: 'WhatsApp',
    label: 'WhatsApp',
    icon: <WhatsappLogoIcon className="size-5" weight="duotone" />,
    href: 'https://wa.me/+393470438232',
    external: true,
    align: 'center' as const,
  },
  {
    id: 'cv',
    label: 'Download CV',
    icon: <FilePdfIcon className="size-5" weight="duotone" />,
    onClick: handleDownload,
    align: 'center' as const,
  },
  {
    id: 'hire',
    label: 'Hire Me',
    icon: <HandshakeIcon className="size-5" weight="duotone" />,
    href: '/contact',
    isLink: true,
    className: 'animate-bounce',
    align: 'center' as const,
  },
];
