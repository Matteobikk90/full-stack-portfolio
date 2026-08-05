import {
  GithubLogoIcon,
  GoogleLogoIcon,
  LinkedinLogoIcon,
  SlackLogoIcon,
} from '@phosphor-icons/react';

export const authProviders = [
  {
    id: 'google',
    label: 'Google',
    icon: <GoogleLogoIcon className="size-5" weight="duotone" />,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <LinkedinLogoIcon className="size-5" weight="duotone" />,
  },
  // {
  //   id: 'facebook',
  //   label: 'Facebook',
  //   icon: <FacebookLogoIcon className="size-5" weight="duotone" />,
  // },
  {
    id: 'slack',
    label: 'Slack',
    icon: <SlackLogoIcon className="size-5" weight="duotone" />,
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <GithubLogoIcon className="size-5" weight="duotone" />,
  },
];
