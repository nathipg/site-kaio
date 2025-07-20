import { memo } from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router';

import { DefaultLayout } from './layouts';
import { AthleteArea, Home } from './pages';

import '@/styles/global.scss';

const router = createHashRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'athlete', element: <AthleteArea /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
