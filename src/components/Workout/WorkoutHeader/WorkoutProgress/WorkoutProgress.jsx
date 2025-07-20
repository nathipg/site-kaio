import { memo, useMemo } from 'react';

import styles from './WorkoutProgress.module.scss';

const WorkoutProgress = (props) => {
  const { completedExercisesQty, totalExercises } = props;

  const progressBarFillerPercentage = useMemo(() => {
    if(totalExercises == 0) {
      return 0;
    }

    return completedExercisesQty / totalExercises * 100;
  }, [ completedExercisesQty, totalExercises ]);

  return (
    <div className={styles.WorkoutProgress}>
      <span>
        {completedExercisesQty} / {totalExercises}
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
