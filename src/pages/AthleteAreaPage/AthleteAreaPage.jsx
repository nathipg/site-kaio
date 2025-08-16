import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AthleteAreaPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Athlete')}</h1>
    </>
  );
};

const AthleteAreaPageMemo = memo(AthleteAreaPage);

export { AthleteAreaPageMemo as AthleteAreaPage };
