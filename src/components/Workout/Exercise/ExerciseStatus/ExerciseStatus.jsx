import { memo, useCallback, useState } from 'react';

import { CheckIcon, XIcon } from '@/components';

import styles from './ExerciseStatus.module.scss';

const ExerciseStatus = (props) => {
  const { workoutProgressFnsRef } = props;

  const [ isCompleted, setCompleted ] = useState(false);

  const onChangeCompleteStatus = useCallback((status) => {
    if(status) {
      workoutProgressFnsRef.current?.onMarkExerciseAsComplete();
    } else {
      workoutProgressFnsRef.current?.onMarkExerciseAsIncomplete();
    }

    setCompleted(status);
  }, [ workoutProgressFnsRef ]);

  return (
    isCompleted ? (
      <CheckIcon
        className={styles.ExerciseStatus}
        onClick={() => onChangeCompleteStatus(false)}
      />
    ) : (
      <XIcon
        className={styles.ExerciseStatus}
        onClick={() => onChangeCompleteStatus(true)}
      />
    )
  );
};

const ExerciseStatusMemo = memo(ExerciseStatus);

export { ExerciseStatusMemo as ExerciseStatus };
