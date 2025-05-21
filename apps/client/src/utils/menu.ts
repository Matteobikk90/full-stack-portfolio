import {
  BriefcaseIcon,
  InfoIcon,
  PenIcon,
  StackOverflowLogoIcon,
} from '@phosphor-icons/react';

export const menuLinks = [
  // { path: '/', label: '', icon: Home },
  { path: '/projects', label: 'Projects', icon: StackOverflowLogoIcon },
  { path: '/experience', label: 'Experience', icon: BriefcaseIcon },
  { path: '/about', label: 'About', icon: InfoIcon },
  { path: '/contact', label: 'Contact', icon: PenIcon },
];

export const hoverStyles: Record<string, string> = {
  '/projects':
    'md:data-[status=active]:text-[var(--section-projects)] md:[data-status=active]:text-[var(--section-projects)] md:focus:text-[var(--section-projects)] md:hover:text-[var(--section-projects)] before:bg-[var(--section-projects)]',
  '/experience':
    'md:data-[status=active]:text-[var(--section-experience)] md:focus:text-[var(--section-experience)] md:hover:text-[var(--section-experience)] before:bg-[var(--section-experience)]',
  '/about':
    'md:data-[status=active]:text-[var(--section-about)] md:focus:text-[var(--section-about)] md:hover:text-[var(--section-about)] before:bg-[var(--section-about)]',
  '/contact':
    'md:data-[status=active]:text-[var(--section-contact)] md:focus:text-[var(--section-contact)] md:hover:text-[var(--section-contact)] before:bg-[var(--section-contact)]',
};
