import { memo } from 'react';

import { WorkoutArrow } from '../WorkoutArrow';
import { WorkoutProgress } from '../WorkoutProgress';
import { WorkoutTitle } from '../WorkoutTitle';

import styles from './WorkoutHeader.module.scss';

const WorkoutHeader = (props) => {
  const { title, description, totalExercises } = props;
  const { onChangeExpandedState } = props;
  const { workoutProgressFnsRef } = props;

  return (
    <div className={styles.WorkoutHeader}>
      <WorkoutTitle
        title={title}
        description={description}
      />

      <WorkoutProgress
        totalExercises={totalExercises}
        workoutProgressFnsRef={workoutProgressFnsRef}
      />

      <WorkoutArrow
        onChangeExpandedState={onChangeExpandedState}
      />
    </div>
  );
};

const WorkoutHeaderMemo = memo(WorkoutHeader);

export { WorkoutHeaderMemo as WorkoutHeader };
