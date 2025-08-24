import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Image } from '@/components';
import teamKaioImg from '@/images/kaio-aulao.jpg';

import styles from './About.module.scss';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.About}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h2>{t('Why join my team?')}</h2>
          <p>{t('I am a personal trainer and researcher - PhD candidate at Unicamp.')}</p>
          <p>{t('My approach combines objective assessments, individualized planning, and constant monitoring.')}</p>
          <ul>
            <li>{t('Plans fitted to your goals')}</li>
            <li>{t('Evidence-based method and practice')}</li>
            <li>{t('Weekly adjustments and close follow-up')}</li>
          </ul>
          {/* TODO: After create the "Currículo" page change this button */}
          {/* <Button>
            {t('Learn More About Me')}
          </Button> */}
        </div>
        <Image className={styles.image} src={teamKaioImg} alt={t('Team Kaio')} />
      </div>
    </section>
  );
};

const AboutMemo = memo(About);

export { AboutMemo as About };