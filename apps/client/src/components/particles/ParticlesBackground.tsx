import { useStore } from '@/stores';
import { getParticlesOptions } from '@/utils/particles';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const background = useStore(useShallow((state) => state.background));

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(() => getParticlesOptions(background), [background]);

  if (!init) return null;

  return <Particles options={options} />;
};
