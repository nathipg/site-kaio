import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createHashRouter, Navigate, RouterProvider, useLocation, useNavigate, useSearchParams } from 'react-router';

import { DefaultLayout } from '@/layouts';
import { AddExercise, AthleteArea, Home, SignIn, SignUp, Training } from '@/pages';
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
        element: <Home />,
      },
      {
        path: 'athlete',
        element: (
          <ProtectedRoute>
            <AthleteArea />
          </ProtectedRoute>
        ),
      },
      {
        path: 'training',
        element: (
          <ProtectedRoute>
            <Training />
          </ProtectedRoute>
        ),
      },
      {
        path: 'add-exercise',
        element: (
          <ProtectedAdminRoute>
            <AddExercise />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: 'sign-in',
        element: (
          <CheckLoginRedirectRoute>
            <SignIn />
          </CheckLoginRedirectRoute>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <CheckLoginRedirectRoute>
            <SignUp />
          </CheckLoginRedirectRoute>
        ),
      },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
};

export { Router };
