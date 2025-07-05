import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AthleteArea = () => {
  const { t } = useTranslation();

  return (
    <h1>{t('Athlete')}</h1>
  );
};

const AthleteAreaMemo = memo(AthleteArea);

export { AthleteAreaMemo as AthleteArea };
