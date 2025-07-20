import { memo } from 'react';

import { Exercise } from './Exercise';

import styles from './ExerciseList.module.scss';

const ExerciseList = (props) => {
  const { exercises } = props;
  const { onChangeExerciseStatus } = props;

  return (
    <div className={styles.ExerciseList}>
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

const ExerciseListMemo = memo(ExerciseList);

export { ExerciseListMemo as ExerciseList };
