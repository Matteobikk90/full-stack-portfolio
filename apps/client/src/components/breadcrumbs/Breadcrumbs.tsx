// Info.tsx
import type { ExperienceTypes } from '@/types/experiences.types';
import { useLoaderData, useMatches } from '@tanstack/react-router';

export const Breadcrumbs = () => {
  const data = useLoaderData({
    from: '/resume/experience/$id',
  }) as ExperienceTypes;
  const matches = useMatches();

  const breadcrumbs = matches.map((match) => {
    const label =
      match.routeId === '/resume/experience/$id'
        ? data.company
        : match.routeId?.split('.').pop();
    return { name: label, href: match.pathname };
  });

  return (
    <div>
      <nav className="text-sm mb-4 text-muted-foreground">
        <ul className="flex items-center gap-2">
          {breadcrumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <a href={crumb.href} className="hover:underline">
                {crumb.name}
              </a>
              {i < breadcrumbs.length - 1 && <span>/</span>}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
