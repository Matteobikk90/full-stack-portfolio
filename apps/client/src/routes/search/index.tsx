import { queryClient } from '@/config/queryClient';
import { fetchSearchResult } from '@/queries/search';
import { createFileRoute } from '@tanstack/react-router';

const toStringArray = (value: unknown) => {
  const values = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [];
  const strings = values.filter(
    (item): item is string => typeof item === 'string' && item.length > 0
  );

  return strings.length ? strings : undefined;
};

type SearchFilters = {
  technology?: string[];
  location?: string[];
  company?: string[];
  role?: string[];
};

export const Route = createFileRoute('/search/')({
  validateSearch: (search: Record<string, unknown>): SearchFilters => {
    const filters: SearchFilters = {};
    const technology = toStringArray(search.technology);
    const location = toStringArray(search.location);
    const company = toStringArray(search.company);
    const role = toStringArray(search.role);

    if (technology) filters.technology = technology;
    if (location) filters.location = location;
    if (company) filters.company = company;
    if (role) filters.role = role;

    return filters;
  },
  loaderDeps: ({ search }) => ({
    location: search?.location,
    technology: search?.technology,
    company: search?.company,
    role: search?.role,
  }),
  loader: async ({ deps }) => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['getSearchResult', deps],
      queryFn: () => fetchSearchResult({ filters: deps }),
    });

    return {
      data,
      crumb: 'Search',
    };
  },
});
