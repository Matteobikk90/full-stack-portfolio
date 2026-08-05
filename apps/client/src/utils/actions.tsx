import { handleDownload } from '@/utils/download';
import {
  FilePdfIcon,
  GithubLogoIcon,
  HandshakeIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react';

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
    href: 'https://linkedin.com/in/matteosoresini90/',
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
