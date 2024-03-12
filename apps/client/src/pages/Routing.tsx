import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from '@client/app';
import React, { PropsWithChildren } from 'react';
import { Chat, SignIn, SignUp } from '@client/pages';

export const Routing: React.FC<PropsWithChildren> = () => {
  // TODO error boundary

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/chat', element: <Chat /> },
  ]);

  return <RouterProvider router={router} />;
};
