import { queryClient } from '@/config/queryClient';
import { fetchExperiences } from '@/queries/experiences';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/experience')({
  async loader() {
    const data = await queryClient.ensureQueryData({
      queryKey: ['getExperiences'],
      queryFn: fetchExperiences,
    });

    return {
      data,
      crumb: 'Experience',
    };
  },
});
