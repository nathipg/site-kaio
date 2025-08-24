import { memo } from 'react';

import { About, Contact, FAQ, HeroSection, Partnerships, Services, Testimonials } from '@/layouts';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.HomePage} id='homePage'>
      <HeroSection />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <FAQ />
      <Partnerships />
    </div>
  );
};

const HomePageMemo = memo(HomePage);

export { HomePageMemo as HomePage };
