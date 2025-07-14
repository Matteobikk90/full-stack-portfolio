import { queryClient } from '@/config/queryClient';
import Work from '@/pages/work';
import { fetchWorks } from '@/queries/works';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/work/$slug')({
  component: Work,
  loader: async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['getWork'],
      queryFn: fetchWorks,
    });

    return {
      data,
      crumb: 'Work',
    };
  },
});
