import '@testing-library/jest-dom';
import { server } from '@/mocks/server';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
