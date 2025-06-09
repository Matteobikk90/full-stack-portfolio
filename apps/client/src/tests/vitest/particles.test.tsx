import ParticlesBackground from '@/components/particles';
import { render, screen } from '@testing-library/react';
import * as tsparticles from '@tsparticles/react';
import { beforeEach, expect, test, vi } from 'vitest';

vi.mock('@tsparticles/react', async () => {
  const actual =
    await vi.importActual<typeof tsparticles>('@tsparticles/react');
  return {
    ...actual,
    initParticlesEngine: vi.fn(() => Promise.resolve()),
    default: vi.fn(() => <div data-testid="particles" />),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

test('renders particles after initialization', async () => {
  render(<ParticlesBackground />);
  expect(await screen.findByTestId('particles')).toBeInTheDocument();
});
