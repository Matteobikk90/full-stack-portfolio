import { queryClient } from '@/config/queryClient';
import { fetchExperienceById } from '@/queries/experiences';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/experience/$id')({
  loader: async ({ params }) => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['experience', params.id],
      queryFn: () => fetchExperienceById(params.id),
    });

    return {
      data,
      crumb: data?.company,
    };
  },
});
