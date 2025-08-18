import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { WorkoutConstants, WorkoutsList } from '@/components';
import { UserSlice } from '@/store/slices';

const TrainingPage = () => {
  const { t } = useTranslation();

  const workouts = useSelector(UserSlice.selectors.selectLoggedUserWorkouts);

  return (
    <>
      <h1>{t('Training')}</h1>

      <WorkoutsList
        workouts={workouts}
        mode={WorkoutConstants.WORKOUT_MODES.REGISTER}
      />
    </>
  );
};

const TrainingPageMemo = memo(TrainingPage);

export { TrainingPageMemo as TrainingPage };
