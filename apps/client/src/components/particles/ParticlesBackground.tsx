import { lazy, Suspense, useEffect, useState } from 'react';

const ParticlesCanvas = lazy(
  () => import('@/components/particles/ParticlesCanvas')
);

export const ParticlesBackground = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const shouldEnableParticles =
      import.meta.env.MODE === 'test' ||
      window.matchMedia(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
      ).matches;

    setShouldRender(shouldEnableParticles);
  }, []);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <ParticlesCanvas />
    </Suspense>
  );
};
