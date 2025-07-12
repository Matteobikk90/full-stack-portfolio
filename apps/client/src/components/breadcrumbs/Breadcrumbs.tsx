import { HouseIcon } from '@phosphor-icons/react';
import { Link, useMatches } from '@tanstack/react-router';
import PopUpInfo from '../pop-up-info';

export const Breadcrumbs = () => {
  const matches = useMatches();

  const breadcrumbs = matches
    .map((match) => {
      const crumb = match.loaderData?.crumb;
      if (!crumb) return null;

      return {
        label: crumb,
        path: match.pathname,
      };
    })
    .filter(Boolean) as { label: string; path: string }[];

  return (
    <nav className="text-sm mb-4 text-secondary">
      <ul className="flex items-center gap-2">
        <Link to={'/'}>
          <PopUpInfo
            hoverText="Home"
            position="bottom"
            align="right"
            className="gap-2"
          >
            <HouseIcon weight="duotone" className="size-5" />/
          </PopUpInfo>
        </Link>
        {breadcrumbs.map(({ label, path }, i) => (
          <li key={path} className="flex items-center gap-2">
            <Link to={path} className="hover:underline">
              {label}
            </Link>
            {i < breadcrumbs.length - 1 && <span>/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};
