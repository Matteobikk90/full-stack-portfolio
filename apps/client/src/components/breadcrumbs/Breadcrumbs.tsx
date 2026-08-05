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
    <nav aria-label="Breadcrumb" className="text-sm mb-4 text-primary">
      <ul className="flex items-center gap-2">
        <li className="flex items-center gap-2">
          <PopUpInfo
            hoverText="Home"
            position="bottom"
            align="right"
            className="gap-2"
          >
            <Link to="/" aria-label="Home">
              <HouseIcon
                aria-hidden="true"
                weight="duotone"
                className="size-5"
              />
            </Link>
          </PopUpInfo>
          {breadcrumbs.length > 0 && <span aria-hidden="true">/</span>}
        </li>
        {breadcrumbs.map(({ label, path }, i) => (
          <li key={path} className="flex items-center gap-2">
            <Link
              to={path}
              className="hover:underline"
              aria-current={i === breadcrumbs.length - 1 ? 'page' : undefined}
            >
              {label}
            </Link>
            {i < breadcrumbs.length - 1 && (
              <span aria-hidden="true">/</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
