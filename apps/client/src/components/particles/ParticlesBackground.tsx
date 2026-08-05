import { lazy, Suspense } from 'react';

const ParticlesCanvas = lazy(
  () => import('@/components/particles/ParticlesCanvas')
);

export const ParticlesBackground = () => {
  return (
    <Suspense fallback={null}>
      <ParticlesCanvas />
    </Suspense>
  );
};
