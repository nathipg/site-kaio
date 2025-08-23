import { memo, useCallback, useMemo } from 'react';

import { CheckIcon, XIcon } from '@/components';

import styles from './ExerciseStatus.module.scss';

const ExerciseStatus = (props) => {
  const { completedExercises, exerciseId } = props;
  const { onChangeExerciseStatus } = props;

  const isCompleted = useMemo(() => {
    return completedExercises.includes(exerciseId);
  }, [ completedExercises, exerciseId ]);

  const onChangeCompleteStatus = useCallback(() => {
    onChangeExerciseStatus({
      exerciseId,
      isCompleted: !isCompleted,
    });
  }, [ exerciseId, isCompleted, onChangeExerciseStatus ]);

  return (
    <div
      className={`${styles.ExerciseStatus} ${isCompleted ? styles.ExerciseCompleted : ''}`}
      onClick={onChangeCompleteStatus}
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
