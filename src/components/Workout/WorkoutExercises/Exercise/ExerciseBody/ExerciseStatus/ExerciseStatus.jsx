import { memo, useCallback, useMemo } from 'react';

import { CheckIcon, WorkoutConstants, XIcon } from '@/components';

import styles from './ExerciseStatus.module.scss';

const ExerciseStatus = (props) => {
  const { completedExercises, exerciseId, mode } = props;
  const { onChangeExerciseStatus } = props;

  const isCompleted = useMemo(() => {
    return completedExercises.includes(exerciseId);
  }, [ completedExercises, exerciseId ]);

  const onChangeCompleteStatus = useCallback(() => {
    if(mode === WorkoutConstants.WORKOUT_MODES.HISTORY) {
      return;
    }

    onChangeExerciseStatus({
      exerciseId,
      isCompleted: !isCompleted,
    });
  }, [ exerciseId, isCompleted, mode, onChangeExerciseStatus ]);

  return (
    <div
      className={`${styles.ExerciseStatus} ${isCompleted ? styles.ExerciseCompleted : ''}`}
      onClick={onChangeCompleteStatus}
      data-mode={mode}
    >
      {isCompleted ? (
        <CheckIcon
          className={styles.ExerciseStatusIcon}
          size="xs"
        />
      ) : (
        <XIcon
          className={styles.ExerciseStatusIcon}
          size="xs"
        />
      )}
    </div>
  );
};

const ExerciseStatusMemo = memo(ExerciseStatus);

export { ExerciseStatusMemo as ExerciseStatus };
