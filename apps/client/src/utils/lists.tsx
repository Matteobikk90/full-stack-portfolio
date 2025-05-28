import { IslandIcon, LaptopIcon, SoccerBallIcon } from '@phosphor-icons/react';

export const aboutMeList = [
  {
    icon: <IslandIcon size={32} weight="duotone" />,
    text: 'I love to travel — get lost, eat great food, and pretend I understand local signs.',
  },
  {
    icon: <LaptopIcon size={32} weight="duotone" />,
    text: 'Enjoy hacking and replacing hardware — but now I also build web apps instead of just breaking stuff. Mostly.',
  },
  {
    icon: <SoccerBallIcon size={32} weight="duotone" />,
    text: 'I’m Italian — of course I love football. Born in Turin, so I’ll let you guess which of the two teams I support.',
  },
];

export const resumeItems = [
  { href: '/resume/experience', label: 'Experience' },
  { href: '/resume/education', label: 'Education' },
  { href: '/resume/skills', label: 'Skills' },
  { href: '/resume/about', label: 'About Me' },
];

export const cornerSketches = {
  topLeft: {
    h: 'M0 5 C20 0, 40 10, 60 5',
    v: 'M5 0 C0 20, 10 40, 5 60',
    styleH: 'top-2 left-2 w-20',
    styleV: 'top-2 left-2 h-20',
  },
  topRight: {
    h: 'M0 5 C20 0, 40 10, 60 5',
    v: 'M5 0 C0 20, 10 40, 5 60',
    styleH: 'top-2 right-2 w-20 rotate-180',
    styleV: 'top-2 right-2 h-20 rotate-180',
  },
  bottomLeft: {
    h: 'M0 5 C20 0, 40 10, 60 5',
    v: 'M5 0 C0 20, 10 40, 5 60',
    styleH: 'bottom-2 left-2 w-20 rotate-180',
    styleV: 'bottom-2 left-2 h-20 rotate-180',
  },
  bottomRight: {
    h: 'M0 5 C20 0, 40 10, 60 5',
    v: 'M5 0 C0 20, 10 40, 5 60',
    styleH: 'bottom-2 right-2 w-20',
    styleV: 'bottom-2 right-2 h-20',
  },
};
