import { Briefcase, Code, Contact, Info } from 'lucide-react';

export const menuLinks = [
  // { path: '/', label: '', icon: Home },
  { path: '/projects', label: 'Projects', icon: Code },
  { path: '/experience', label: 'Experience', icon: Briefcase },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Contact },
];

export const hoverStyles: Record<string, string> = {
  '/projects':
    'md:focus:text-[var(--section-projects)] md:hover:text-[var(--section-projects)] before:bg-[var(--section-projects)]',
  '/experiences':
    'md:focus:text-[var(--section-experiences)] md:hover:text-[var(--section-experiences)] before:bg-[var(--section-experiences)]',
  '/about':
    'md:focus:text-[var(--section-about)] md:hover:text-[var(--section-about)] before:bg-[var(--section-about)]',
  '/contact':
    'md:focus:text-[var(--section-contact)] md:hover:text-[var(--section-contact)] before:bg-[var(--section-contact)]',
};
