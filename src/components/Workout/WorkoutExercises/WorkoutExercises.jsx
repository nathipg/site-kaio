import { memo } from 'react';

import { Exercise } from './Exercise';

import styles from './WorkoutExercises.module.scss';

const WorkoutExercises = (props) => {
  const { exercises } = props;
  const { onChangeExerciseStatus } = props;

  return (
    <div className={styles.WorkoutExercises}>
      {exercises.map(exercise => (
        <Exercise
          key={exercise.id}
          exercise={exercise}
          onChangeExerciseStatus={onChangeExerciseStatus}
        />
      ))}
    </div>
  );
};

const WorkoutExercisesMemo = memo(WorkoutExercises);

export { WorkoutExercisesMemo as WorkoutExercises };
