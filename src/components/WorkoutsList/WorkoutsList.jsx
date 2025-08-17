import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Workout } from '@/components';

import styles from './WorkoutsList.module.scss';

const WorkoutsList = (props) => {
  const { workouts = [], editMode = false } = props;
  const { onUpdateWorkoutData = () => null, onRemoveWorkout = () => null } = props;

  const { t } = useTranslation();

  const renderWorkouts = useCallback(() => {
    if(!workouts?.length) {
      return <span>{t('No workout registered')}</span>;
    }

    return workouts.map(workout => {
      const setWorkoutProperty = (property, value) => {
        onUpdateWorkoutData(workout.id, property, value);
      };
    
      return (
        <Workout
          key={workout.id}
          workout={workout}
          editMode={editMode}
          setWorkoutProperty={setWorkoutProperty}
          onRemoveWorkout={onRemoveWorkout}
        />
      );
    });
  }, [ editMode, onRemoveWorkout, onUpdateWorkoutData, t, workouts ]);

  return (
    <div className={styles.WorkoutsList}>
      {renderWorkouts()}
    </div>
  );
};

const WorkoutsListMemo = memo(WorkoutsList);

export { WorkoutsListMemo as WorkoutsList };
