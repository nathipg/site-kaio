import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { KaioLogo } from '@/components';

import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.Footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <KaioLogo width='1rem' color='#393939cc' />
          <p className={styles.name}>Kaio Guerrero</p>
        </div>
        <div>
          <p className={styles.copy}>{new Date().getFullYear()} {t('Kaio Borges Guerrero Personal Training. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};

const FooterMemo = memo(Footer);

export { FooterMemo as Footer };