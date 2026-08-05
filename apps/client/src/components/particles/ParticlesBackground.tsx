import { lazy, Suspense, useEffect, useState } from 'react';

const ParticlesCanvas = lazy(
  () => import('@/components/particles/ParticlesCanvas')
);

export const ParticlesBackground = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShouldRender(true), 400);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <ParticlesCanvas />
    </Suspense>
  );
};
