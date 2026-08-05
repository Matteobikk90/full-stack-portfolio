import { useStore } from '@/stores';
import { getParticlesOptions } from '@/utils/particles';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useState } from 'react';

export const ParticlesCanvas = () => {
  const [isReady, setIsReady] = useState(false);
  const background = useStore(({ background }) => background);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setIsReady(true));
  }, []);

  const options = useMemo(() => getParticlesOptions(background), [background]);

  if (!isReady) return null;

  return <Particles options={options} />;
};

export default ParticlesCanvas;
