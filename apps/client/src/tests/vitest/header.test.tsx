import Header from '@/features/header';
import { useStore } from '@/stores';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@/components/menu', () => ({
  MenuDesktop: () => <nav data-testid="menu-desktop" />,
  MenuMobile: () => <nav data-testid="menu-mobile" />,
}));

describe('Header', () => {
  test('toggles theme on button click', async () => {
    render(<Header />);

    const toggleButton = screen.getAllByRole('button')[0];
    const initialMode = useStore.getState().mode;

    fireEvent.click(toggleButton);

    await waitFor(() => {
      const newMode = useStore.getState().mode;
      expect(newMode).not.toBe(initialMode);
    });
  });
});
