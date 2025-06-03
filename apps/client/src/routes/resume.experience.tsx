import { fetchExperiences } from '@/queries/experiences';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/experience')({
  loader: fetchExperiences,
});
