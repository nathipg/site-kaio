import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router';

import { GrowlContainer } from '@/components';

const DefaultLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <GrowlContainer />

      <Link to={{ pathname: '' }}>{t('Home')}</Link>
      <Link to={{ pathname: '/sign-in' }}>{t('Sign in')}</Link>
      <Link to={{ pathname: '/athlete' }}>{t('Athlete')}</Link>
      
      <Outlet />
    </>
  );
};

const DefaultLayoutMemo = memo(DefaultLayout);

export { DefaultLayoutMemo as DefaultLayout };
