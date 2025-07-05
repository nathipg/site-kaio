import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router';

const DefaultLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link to={{ pathname: '' }}>{t('Home')}</Link>
      <Link to={{ pathname: '/athlete' }}>{t('Athlete')}</Link>
      
      <Outlet />
    </>
  );
};

const DefaultLayoutMemo = memo(DefaultLayout);

export { DefaultLayoutMemo as DefaultLayout };
