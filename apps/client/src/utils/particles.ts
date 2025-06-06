import {
  MoveDirection,
  OutMode,
  type ISourceOptions,
} from '@tsparticles/engine';

export const getCSSVariable = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const getParticlesOptions = (color: string): ISourceOptions => ({
  fullScreen: { enable: true, zIndex: 1 },
  background: {
    color: { value: 'transparent' },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'repulse' } },
    modes: { repulse: { distance: 120, duration: 0.4 } },
  },
  particles: {
    number: { value: 120, density: { enable: true } },
    links: {
      enable: true,
      color,
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
    color: { value: color },
  },
  detectRetina: true,
});
