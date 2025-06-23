import { cn } from '@/lib/utils';
import { hoverStyles, menuLinks } from '@/utils/menu';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const MenuDesktop = () => {
  const { t } = useTranslation();

  return (
    <nav className="md:flex items-center gap-8 hidden">
      {menuLinks.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            'relative flex items-center gap-2 transition-all before:content-[""] before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:w-0 before:transition-all before:duration-300',
            'hover:before:w-full focus:before:w-full outline-0',
            hoverStyles[path]
          )}
          activeProps={{
            className: cn('font-semibold before:w-full', hoverStyles[path]),
          }}
          aria-label={label || 'Homepage'}
        >
          <Icon className="size-5" weight="duotone" />
          {t(`menu.${label}`)}
        </Link>
      ))}
    </nav>
  );
};
