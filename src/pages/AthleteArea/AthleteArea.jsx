import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Workout } from '@/components';

const AthleteArea = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Athlete')}</h1>

      <Workout
        title="Treino A"
        description="Foco em treinar"
      />
    </>
  );
};

const AthleteAreaMemo = memo(AthleteArea);

export { AthleteAreaMemo as AthleteArea };
