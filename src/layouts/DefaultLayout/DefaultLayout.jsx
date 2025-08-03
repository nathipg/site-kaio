import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router';

import { Button, ButtonConstants, GrowlContainer } from '@/components';
import { UserSlice } from '@/store/slices';

const DefaultLayout = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);

  const onLogout = useCallback((event) => {
    event.preventDefault();

    dispatch(UserSlice.actions.signOutUser());
  }, [ dispatch ]);

  return (
    <>
      <GrowlContainer />

      <Link to={{ pathname: '' }}>{t('Home')}</Link>
      <Link to={{ pathname: '/sign-in' }}>{t('Sign in')}</Link>
      <Link to={{ pathname: '/athlete' }}>{t('Athlete')}</Link>
      
      {
        isLoggedIn ? (
          <Button
            category={ButtonConstants.ButtonCategories.DANGER}
            textOnly={true}
            onClick={onLogout}
          >
            {t('Sign Out')}
          </Button>
        ) : <></>
      }
      
      <Outlet />
    </>
  );
};

const DefaultLayoutMemo = memo(DefaultLayout);

export { DefaultLayoutMemo as DefaultLayout };
