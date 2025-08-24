import { memo } from 'react';
import { Outlet } from 'react-router';

import { ContentContainer, GrowlContainer } from '@/components';

import { Footer } from '../Footer';
import { Header } from '../Header';

const DefaultLayout = () => {
  return (
    <>
      <GrowlContainer />

      <Header />

      <ContentContainer>
        <Outlet />
      </ContentContainer>

      <Footer />
    </>
  );
};

const DefaultLayoutMemo = memo(DefaultLayout);

export { DefaultLayoutMemo as DefaultLayout };
