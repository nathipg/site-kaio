import { memo } from 'react';

import { WorkoutProgress } from '../WorkoutProgress';

import styles from './WorkoutHeader.module.scss';

const WorkoutHeader = (props) => {
  const { title, description, totalExercises, workoutProgressFnsRef } = props;

  return (
    <div className={styles.WorkoutHeader}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>
        <WorkoutProgress
          totalExercises={totalExercises}
          workoutProgressFnsRef={workoutProgressFnsRef}
        />
      </div>
    </div>
  );
};

const WorkoutHeaderMemo = memo(WorkoutHeader);

export { WorkoutHeaderMemo as WorkoutHeader };
