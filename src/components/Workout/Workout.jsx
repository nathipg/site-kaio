import { memo, useRef, useState } from 'react';

import { WorkoutHeader } from './WorkoutHeader';

import styles from './Workout.module.scss';

const mockedExercises = [
  {}, {}, {},
];

const Workout = (props) => {
  const { title, description } = props;

  const [ exercises, setExercises ] = useState(mockedExercises);

  const workoutProgressFnsRef = useRef(null);

  return (
    <div className={styles.Workout}>
      <WorkoutHeader
        title={title}
        description={description}
        totalExercises={exercises.length}
        workoutProgressFnsRef={workoutProgressFnsRef}
      />

      <button onClick={() => workoutProgressFnsRef.current?.onMarkExerciseAsComplete()}>Mark as Complete</button>
      <button onClick={() => workoutProgressFnsRef.current?.onMarkExerciseAsIncomplete()}>Mark as Incomplete</button>
    </div>
  );
};

const WorkoutMemo = memo(Workout);

export { WorkoutMemo as Workout };
