import { queryClient } from '@/config/queryClient';
import { fetchWorks } from '@/queries/works';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/work')({
  async loader() {
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
