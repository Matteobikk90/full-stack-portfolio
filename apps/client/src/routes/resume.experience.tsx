import { queryClient } from '@/config/queryClient';
import { fetchExperiences } from '@/queries/experiences';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/experience')({
  loader: () =>
    queryClient.ensureQueryData({
      queryKey: ['getExperiences'],
      queryFn: fetchExperiences,
    }),
});
