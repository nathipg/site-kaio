import { memo } from 'react';

import { Exercise } from '../Exercise';

const ExerciseList = (props) => {
  const { exercises } = props;
  const { workoutProgressFnsRef } = props;

  return (
    <div>
      {exercises.map(exercise => (
        <Exercise
          key={exercise.id}
          exercise={exercise}
          workoutProgressFnsRef={workoutProgressFnsRef}
        />
      ))}
    </div>
  );
};

const ExerciseListMemo = memo(ExerciseList);

export { ExerciseListMemo as ExerciseList };
