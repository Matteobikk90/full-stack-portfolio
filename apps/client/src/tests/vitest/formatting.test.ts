import { formatDateRange } from '@/utils/formatting';
import { describe, expect, it } from 'vitest';

describe('formatDateRange', () => {
  it('shows months for a short experience within the same year', () => {
    expect(formatDateRange('2026-02-01', '2026-03-31', 'en')).toBe(
      'Feb - Mar 2026'
    );
    expect(formatDateRange('2026-02-01', '2026-03-31', 'it')).toBe(
      'Feb - Mar 2026'
    );
  });

  it('keeps the compact year range for multi-year experience', () => {
    expect(formatDateRange('2022-03-01', '2025-07-01', 'en')).toBe(
      '2022 - 2025'
    );
  });

  it('localizes ongoing experience', () => {
    expect(formatDateRange('2025-12-01', null, 'en')).toBe('2025 - Present');
    expect(formatDateRange('2025-12-01', null, 'it')).toBe('2025 - Presente');
  });
});
