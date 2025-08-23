import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '@/components';

import styles from './Contact.module.scss';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.Contact}>
      <div className={styles.container}>
        <h2>{t('Ready to Start?')}</h2>
        <Button className={styles.button} category={ButtonConstants.ButtonCategories.PRIMARY}>
          <a target='_blank' href='https://wa.me/19999472024?text=Me ajuda,%20gostaria%20de%20falar%20sobre%20treinamento!'>
            {t('Contact me!')}
          </a>
        </Button>
      </div>
    </section>
  );
};

const ContactMemo = memo(Contact);

export { ContactMemo as Contact };
