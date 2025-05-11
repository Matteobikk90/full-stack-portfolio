import App from '@/App';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  errorComponent: () => <div>Something went wrong</div>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <App />,
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({ routeTree });

export function RouterProviderWrapper() {
  return <RouterProvider router={router} />;
}
