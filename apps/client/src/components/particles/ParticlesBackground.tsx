import useStore from '@/stores';
import { getCSSVariable } from '@/utils/particles';
import {
  MoveDirection,
  OutMode,
  type Container,
  type ISourceOptions,
} from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const ParticlesBackground = () => {
  const mode = useStore(useShallow((state) => state.mode));
  const [init, setInit] = useState(false);
  const [foreground, setForeground] = useState(getCSSVariable('--foreground'));

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log('Particles loaded:', container);
  };

  useEffect(() => {
    const nextColor = getCSSVariable('--foreground');
    setForeground(nextColor);
  }, [mode]);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 1 },
      background: {
        color: { value: 'transparent' },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 120, duration: 0.4 } },
      },
      particles: {
        number: { value: 60, density: { enable: true } },
        links: {
          enable: true,
          color: foreground,
          distance: 120,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: MoveDirection.none,
          outModes: { default: OutMode.out },
        },
        opacity: { value: 0.5 },
        size: { value: { min: 1, max: 3 } },
        shape: { type: 'circle' },
        color: { value: foreground },
      },
      detectRetina: true,
    }),
    [foreground]
  );

  if (!init) return null;

  return <Particles options={options} particlesLoaded={particlesLoaded} />;
};
