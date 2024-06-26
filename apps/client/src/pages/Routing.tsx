import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';
import { Chat, Profile, SignIn, SignUp } from '@client/pages';
import { Layout } from '@client/app';

export const Routing: React.FC<PropsWithChildren> = () => {
  // TODO error boundary

  const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      Component: Layout,
      children: [
        { index: true, Component: Chat },
        { path: 'sign-in', Component: SignIn },
        { path: 'sign-up', Component: SignUp },
        { path: 'profile', Component: Profile },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
