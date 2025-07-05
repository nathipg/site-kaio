import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <h1>{t('Home')}</h1>
  );
};

const HomeMemo = memo(Home);

export { HomeMemo as Home };
