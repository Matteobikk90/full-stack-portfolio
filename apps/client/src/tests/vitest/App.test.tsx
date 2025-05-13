import App from '@/App';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders heading', () => {
    render(<App />);
    expect(screen.getByText('Full Stack Portfolio')).toBeInTheDocument();
  });
});
