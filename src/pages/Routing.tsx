import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "app";
import React, { PropsWithChildren } from "react";
import { SignIn } from "pages";

export const Routing: React.FC<PropsWithChildren> = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,

    },
    { path: "/sign-in", element: <SignIn /> }
  ]);

  return <RouterProvider router={router} />;
};