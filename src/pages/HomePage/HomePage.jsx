import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <h1>{t('HomePage')}</h1>
  );
};

const HomePageMemo = memo(HomePage);

export { HomePageMemo as HomePage };
