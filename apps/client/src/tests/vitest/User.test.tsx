import User from '@/components/User';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';

test('shows user name from API', async () => {
  render(<User />);
  await waitFor(() => {
    expect(screen.getByText('Hello Matteo')).toBeInTheDocument();
  });
});
