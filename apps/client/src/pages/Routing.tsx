import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';
import { Chat, SignIn, SignUp } from '@client/pages';
import { App } from '@client/app';

export const Routing: React.FC<PropsWithChildren> = () => {
  // TODO error boundary

  const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      Component: App,
      children: [
        { index: true, Component: Chat },
        { path: 'sign-in', Component: SignIn },
        { path: 'sign-up', Component: SignUp },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
