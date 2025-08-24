import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { WorkoutConstants, WorkoutsList } from '@/components';
import { UserSlice } from '@/store/slices';

const WorkoutPage = () => {
  const { t } = useTranslation();

  const workouts = useSelector(UserSlice.selectors.selectLoggedUserWorkouts);

  return (
    <>
      <h1>{t('Workout')}</h1>

      <WorkoutsList
        workouts={workouts}
        mode={WorkoutConstants.WORKOUT_MODES.REGISTER}
      />
    </>
  );
};

const WorkoutPageMemo = memo(WorkoutPage);

export { WorkoutPageMemo as WorkoutPage };
