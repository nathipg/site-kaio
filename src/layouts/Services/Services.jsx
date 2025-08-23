import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Services.module.scss';

const Services = () => {
  const { t } = useTranslation();

  // TO ADD NEW ITEMS, CHANGE THIS items OBJECT. REMEMBER TO UPDATE THE TEXTS IN translation.json
  const items = [
    { title: t('Train'), desc: t('I will teach you how to train safely and efficiently to achieve the best results.') },
    { title: t('Create consistency'), desc: t('No magic formulas! Results come from consistency and well-done training — I will show you how.') },
    { title: t('Respect your limits'), desc: t('Train smart: discover what works for you and progress safely.') },
  ];

  return (
    <section className={styles.Services}>
      <div className={styles.container}>
        <h2>{t('With me, you will learn...')}</h2>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <article key={i} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesMemo = memo(Services);

export { ServicesMemo as Services };