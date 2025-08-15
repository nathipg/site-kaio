import { memo } from 'react';
import { Outlet } from 'react-router';

import { GrowlContainer } from '@/components';

import { Header } from '../Header';

const DefaultLayout = () => {
  return (
    <>
      <GrowlContainer />

      <Header />
      
      <Outlet />
    </>
  );
};

const DefaultLayoutMemo = memo(DefaultLayout);

export { DefaultLayoutMemo as DefaultLayout };
