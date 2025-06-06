import App from '@/App';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <App />,
  errorComponent: () => <div>Something went wrong</div>,
});
