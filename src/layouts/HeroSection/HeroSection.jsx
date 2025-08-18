import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, Image } from '@/components';

import kaioImg from '../../../public/images/kaio-hero-section.png';


import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.HeroSection}>
      <div className={styles.content}>
        <h1>{t('Science-based training')}</h1>
        <p>{t('More than 10 years combining scientific evidence and practice to transform health and performance.')}</p>
        <Button className={styles.primary} category={ButtonConstants.ButtonCategories.PRIMARY}>
            Entre em contato
        </Button>
      </div>
      <Image className={styles.img} src={kaioImg} width='240px' />
    </section>
  );
};

const HeroSectionMemo = memo(HeroSection);

export { HeroSectionMemo as HeroSection };
