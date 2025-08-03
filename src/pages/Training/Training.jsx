import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Workout } from '@/components';

const Training = () => {
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

const TrainingMemo = memo(Training);

export { TrainingMemo as Training };
