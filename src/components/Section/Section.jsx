import { memo } from 'react';

import styles from './Section.module.scss';

const Section = ({ title, children }) => {
  return (
    <section className={styles.Section}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

const SectionMemo = memo(Section);

export { SectionMemo as Section };
