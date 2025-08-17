import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createHashRouter, Navigate, RouterProvider, useLocation, useNavigate, useSearchParams } from 'react-router';

import { DefaultLayout } from '@/layouts';
import { AthleteAreaPage, HomePage, ManageExercisesPage, ManageWorkoutsPage, SignInPage, SignUpPage, TrainingPage } from '@/pages';
import { UserSlice } from '@/store/slices';

const CheckLoginRedirectRoute = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn) {
      const redirectUrl = searchParams.get('url') || '/';

      navigate(redirectUrl, { replace: true });
    }
  }, [ isLoggedIn, navigate, searchParams ]);

  return children;
};

const ProtectedRoute = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [ searchParams ] = useSearchParams();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);
  const isLoginVerificationComplete = useSelector(UserSlice.selectors.isLoginVerificationComplete);

  useEffect(() => {
    if (!isLoggedIn) {
      const currentPath = location.pathname + location.search;
      const urlParam = isLoginVerificationComplete ? '' : `?url=${currentPath}`;

      navigate(`/sign-in${urlParam}`, { replace: true });
    }

    if(isLoggedIn) {
      const redirectUrl = searchParams.get('url') || null;

      redirectUrl && navigate(redirectUrl, { replace: true });
    }
  }, [ isLoggedIn, isLoginVerificationComplete, location.pathname, location.search, navigate, searchParams ]);

  return children;
};

const ProtectedAdminRoute = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [ searchParams ] = useSearchParams();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);
  const isLoginVerificationComplete = useSelector(UserSlice.selectors.isLoginVerificationComplete);
  const isAdmin = true; // TODO Change to actually check if is admin

  useEffect(() => {
    if (!isLoggedIn) {
      const currentPath = location.pathname + location.search;
      const urlParam = isLoginVerificationComplete ? '' : `?url=${currentPath}`;

      navigate(`/sign-in${urlParam}`, { replace: true });
    }

    if(!isAdmin) {
      navigate('/', { replace: true });
    }

    if(isLoggedIn) {
      const redirectUrl = searchParams.get('url') || null;

      redirectUrl && navigate(redirectUrl, { replace: true });
    }
  }, [ isAdmin, isLoggedIn, isLoginVerificationComplete, location.pathname, location.search, navigate, searchParams ]);

  return children;
};

const router = createHashRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'athlete',
        element: (
          <ProtectedRoute>
            <AthleteAreaPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'training',
        element: (
          <ProtectedRoute>
            <TrainingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'sign-in',
        element: (
          <CheckLoginRedirectRoute>
            <SignInPage />
          </CheckLoginRedirectRoute>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <CheckLoginRedirectRoute>
            <SignUpPage />
          </CheckLoginRedirectRoute>
        ),
      },
    ],
  },
  {
    path: '/manage',
    element: <DefaultLayout />,
    children: [
      {
        path: 'exercises',
        element: (
          <ProtectedAdminRoute>
            <ManageExercisesPage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'workouts',
        element: (
          <ProtectedAdminRoute>
            <ManageWorkoutsPage />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
};

export { Router };
