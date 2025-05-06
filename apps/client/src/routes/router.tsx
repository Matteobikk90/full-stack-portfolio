import App from '@/App';
import User from '@/components/User';
import api from '@/config/axios';
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

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user',
  component: () => <User />,
  loader: async () => {
    const response = await api.get('/api/user');
    return { name: response.data.name };
  },
});

const routeTree = rootRoute.addChildren([indexRoute, userRoute]);

export const router = createRouter({ routeTree });

export function RouterProviderWrapper() {
  return <RouterProvider router={router} />;
}
