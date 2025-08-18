import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { HeroSection } from '@/layouts';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroSection />
    </>
  );
};

const HomePageMemo = memo(HomePage);

export { HomePageMemo as HomePage };
