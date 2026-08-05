import skillIconsUrl from '@/assets/icons/skill-icons.svg';
import { skillsFontSize } from '@/utils/constants';

const renderSkillIcon = (name: string, iconHeight = 256) => {
  const iconWidth = (skillsFontSize * 256) / iconHeight;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height={skillsFontSize}
      width={iconWidth}
      viewBox={`0 0 256 ${iconHeight}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href={`${skillIconsUrl}#${name}`} width="100%" height="100%" />
    </svg>
  );
};

export const skillItems = [
  { id: 'html', icon: renderSkillIcon('html-5', 361) },
  { id: 'css', icon: renderSkillIcon('css-3', 361) },
  { id: 'js', icon: renderSkillIcon('javascript') },
  { id: 'react', icon: renderSkillIcon('react', 228) },
  { id: 'next', icon: renderSkillIcon('typescript-icon') },
  { id: 'tailwind', icon: renderSkillIcon('tailwindcss-icon', 154) },
  { id: 'node', icon: renderSkillIcon('nodejs-icon', 289) },
  { id: 'postgres', icon: renderSkillIcon('postgresql', 264) },
  { id: 'prisma', icon: renderSkillIcon('prisma', 310) },
  { id: 'vitest', icon: renderSkillIcon('vitest', 234) },
  { id: 'playwright', icon: renderSkillIcon('playwright', 192) },
  { id: 'figma', icon: renderSkillIcon('figma', 384) },
];
