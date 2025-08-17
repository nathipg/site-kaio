import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WorkoutsList } from '@/components';

const TrainingPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Training')}</h1>

      <WorkoutsList
        workouts={[]}
      />
    </>
  );
};

const TrainingPageMemo = memo(TrainingPage);

export { TrainingPageMemo as TrainingPage };
