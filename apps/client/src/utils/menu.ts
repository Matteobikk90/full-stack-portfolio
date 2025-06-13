import { Logo } from '@/features/header/Logo';
import {
  BriefcaseIcon,
  PenIcon,
  StackOverflowLogoIcon,
} from '@phosphor-icons/react';

export const menuLinks = [
  { path: '/', label: '', icon: Logo },
  { path: '/resume', label: 'Resume', icon: BriefcaseIcon },
  { path: '/work', label: 'Work', icon: StackOverflowLogoIcon },
  { path: '/contact', label: 'Contact', icon: PenIcon },
];

export const hoverStyles: Record<string, string> = {
  '/resume':
    'md:data-[status=active]:text-[var(--primary)] md:focus:text-[var(--primary)] md:hover:text-[var(--primary)] before:bg-[var(--primary)]',
  '/work':
    'md:data-[status=active]:text-[var(--section-work)] md:focus:text-[var(--section-work)] md:hover:text-[var(--section-work)] before:bg-[var(--section-work)]',
  '/contact':
    'md:data-[status=active]:text-[var(--section-contact)] md:focus:text-[var(--section-contact)] md:hover:text-[var(--section-contact)] before:bg-[var(--section-contact)]',
};
