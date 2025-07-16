import { memo, useImperativeHandle, useMemo, useState } from 'react';

import styles from './WorkoutProgress.module.scss';

const WorkoutProgress = (props) => {
  const { totalExercises, workoutProgressFnsRef } = props;

  const [ completedExercises, setCompletedExercises ] = useState(0);

  useImperativeHandle(workoutProgressFnsRef, () => {
    return {
      onMarkExerciseAsComplete() {
        setCompletedExercises(currentCompletedExercises => {
          if(currentCompletedExercises >= totalExercises) {
            return totalExercises;
          }

          return currentCompletedExercises + 1;
        });
      },
      onMarkExerciseAsIncomplete() {
        setCompletedExercises(currentCompletedExercises => {
          if(currentCompletedExercises == 0) {
            return 0;
          }

          return currentCompletedExercises - 1;
        });
      },
    };
  }, [ totalExercises ]);

  const progressBarFillerPercentage = useMemo(() => {
    if(totalExercises == 0) {
      return 0;
    }

    return completedExercises / totalExercises * 100;
  }, [ completedExercises, totalExercises ]);

  return (
    <div className={styles.WorkoutProgress}>
      <span>
        {completedExercises} / {totalExercises}
      </span>
      <div className={styles.WorkoutProgressBar}>
        <div
          className={styles.WorkoutProgressBarFiller}
          style={{ width: `${progressBarFillerPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const WorkoutProgressMemo = memo(WorkoutProgress);

export { WorkoutProgressMemo as WorkoutProgress };
