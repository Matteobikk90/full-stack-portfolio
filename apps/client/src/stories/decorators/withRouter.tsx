// src/stories/decorators/withRouter.tsx
import type { Decorator } from '@storybook/react';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

export const withRouter: Decorator = (Story) => {
  const rootRoute = createRootRoute({
    component: () => <Story />,
  });

  const router = createRouter({
    routeTree: rootRoute,
  });

  return <RouterProvider router={router} />;
};
