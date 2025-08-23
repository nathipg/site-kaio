import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FAQItem } from './FAQItem';

import styles from './FAQ.module.scss';

const FAQ = () => {
  const { t } = useTranslation();
  const [ openIndex, setOpenIndex ] = useState(-1);

  const onClickItem = (index) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  // TO ADD OR CHANGE QUESTIONS, CHANGE THIS faqs OBJECT. REMEMBER TO UPDATE THE TEXTS IN translation.json
  const faqs = [
    { question: t('What are the training plans?'), answer: t('In person and consulting. However, due to my PhD studies in Turkey, I will only be available for remote consulting.') },
    { question: t('What are your specialties?'), answer: t('Rehabilitation, weight loss, health, strength gain, and hypertrophy.') },
    { question: t('Do you coach basketball?'), answer: t('One of the specialties is basketball. Develop your game with me.') },
    { question: t('Do I need equipment?'), answer: t('Not necessarily. The training is tailored to your reality, with or without a gym.') },
    { question: t('What are the prices?'), answer: t('Each plan has its own characteristics. Let is think about which one is the best for you.') },
  ];

  return (
    <section className={styles.FAQ}>
      <div className={styles.container}>
        <h2>{t('Dúvidas frequentes')}</h2>
        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={i === openIndex}
              onClick={() => onClickItem(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQMemo = memo(FAQ);

export { FAQMemo as FAQ };
