import { memo, useCallback, useEffect, useState } from 'react';

import { CheckIcon, XIcon } from '@/components';

import styles from './ExerciseStatus.module.scss';

const ExerciseStatus = (props) => {
  const { exerciseId } = props;
  const { onChangeExerciseStatus } = props;

  const [ isCompleted, setCompleted ] = useState(false);

  const onChangeCompleteStatus = useCallback(() => {
    setCompleted((currentStatus) => !currentStatus);
  }, []);

  useEffect(() => {
    onChangeExerciseStatus({
      exerciseId,
      isCompleted,
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
