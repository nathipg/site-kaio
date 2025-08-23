import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { About, FAQ, HeroSection, Services, Testimonials } from '@/layouts';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroSection />
      <About />
      <Services />
      <Testimonials />
      <FAQ />
    </>
  );
};

const HomePageMemo = memo(HomePage);

export { HomePageMemo as HomePage };
