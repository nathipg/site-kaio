import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { About, HeroSection } from '@/layouts';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroSection />
      <About />
    </>
  );
};

const HomePageMemo = memo(HomePage);

export { HomePageMemo as HomePage };
