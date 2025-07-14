import { queryClient } from '@/config/queryClient';
import { fetchSearchResult } from '@/queries/search';
import { filterSchema } from '@/schemas/search.schema';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/search/')({
  validateSearch: filterSchema,
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
