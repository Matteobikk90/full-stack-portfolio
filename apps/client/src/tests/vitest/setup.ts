import '@testing-library/jest-dom';
import { server } from '@/mocks/server';
import { useStore } from '@/stores';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

beforeEach(() => {
  useStore.setState({
    mode: 'light',
  });
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
