import { memo } from 'react';

import { About, FAQ, HeroSection, Services, Testimonials } from '@/layouts';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <HeroSection />
      <About />
      <Services />
      <Testimonials />
      <FAQ />
    </div>
  );
};

const HomePageMemo = memo(HomePage);

export { HomePageMemo as HomePage };
