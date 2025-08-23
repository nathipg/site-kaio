import { memo } from 'react';
import { Outlet } from 'react-router';

import { ContentContainer, GrowlContainer } from '@/components';

import { Header } from '../Header';

const DefaultLayout = () => {
  return (
    <>
      <GrowlContainer />

      <Header />

      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
};

const DefaultLayoutMemo = memo(DefaultLayout);

export { DefaultLayoutMemo as DefaultLayout };
