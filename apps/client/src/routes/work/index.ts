import { queryClient } from '@/config/queryClient';
import { fetchWorks } from '@/queries/works';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/work/')({
  loader: async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['getWork'],
      queryFn: fetchWorks,
    });

    if (!data.length) {
      throw new Error('No projects found');
    }

    throw redirect({
      to: '/work/$slug',
      params: { slug: data[0].slug },
    });
  },
});
