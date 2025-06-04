import { queryClient } from '@/config/queryClient';
import { fetchExperienceById } from '@/queries/experiences';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/experience/$id')({
  loader: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ['experience', params.id],
      queryFn: () => fetchExperienceById(params.id),
    }),
});
