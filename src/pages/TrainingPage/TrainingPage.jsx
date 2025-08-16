import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Workout } from '@/components';

const TrainingPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Training')}</h1>

      <Workout
        title="Treino A"
        description="Foco em treinar"
      />
    </>
  );
};

const TrainingPageMemo = memo(TrainingPage);

export { TrainingPageMemo as TrainingPage };
