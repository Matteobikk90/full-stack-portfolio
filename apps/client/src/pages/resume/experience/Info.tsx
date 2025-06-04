import Breadcrumbs from '@/components/breadcrumbs';
import type { ExperienceTypes } from '@/types/experiences.types';
import { useLoaderData } from '@tanstack/react-router';

export const Info = () => {
  const data: ExperienceTypes = useLoaderData({
    from: '/resume/experience/$id',
  });

  console.log(data);

  return (
    <section className="animate-fade-up">
      <Breadcrumbs />
      <h2>{data.description}</h2>
    </section>
  );
};
