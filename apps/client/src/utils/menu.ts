import {
  BriefcaseIcon,
  PenIcon,
  StackOverflowLogoIcon,
} from '@phosphor-icons/react';

export const menuLinks = [
  // { path: '/', label: '', icon: Home },
  { path: '/resume', label: 'Resume', icon: BriefcaseIcon },
  { path: '/work', label: 'Work', icon: StackOverflowLogoIcon },
  { path: '/contact', label: 'Contact', icon: PenIcon },
];

export const hoverStyles: Record<string, string> = {
  '/work':
    'md:data-[status=active]:text-[var(--section-work)] md:[data-status=active]:text-[var(--section-work)] md:focus:text-[var(--section-work)] md:hover:text-[var(--section-work)] before:bg-[var(--section-work)]',
  '/resume':
    'md:data-[status=active]:text-[var(--section-resume)] md:focus:text-[var(--section-resume)] md:hover:text-[var(--section-resume)] before:bg-[var(--section-resume)]',
  '/contact':
    'md:data-[status=active]:text-[var(--section-contact)] md:focus:text-[var(--section-contact)] md:hover:text-[var(--section-contact)] before:bg-[var(--section-contact)]',
};
