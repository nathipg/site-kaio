import { memo } from 'react';

import { CaretDownIcon, CaretUpIcon } from '@/components';

import styles from './FAQItem.module.scss';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`${styles.FAQItem} ${styles.item}`}>
      <div className={styles.question} onClick={onClick}>
        <div>{question}</div>
        {isOpen ? <CaretUpIcon /> : <CaretDownIcon /> }
      </div>
      {isOpen && <div className={styles.answer}>{answer}</div>}
    </div>
  );
};

const FAQItemMemo = memo(FAQItem);

export { FAQItemMemo as FAQItem };