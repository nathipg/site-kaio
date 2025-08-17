import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, RemoveWorkoutConfirmDialog, XIcon } from '@/components';

import styles from './WorkoutFooter.module.scss';

const WorkoutFooter = (props) => {
  const { workout } = props;
  const { onRemoveWorkout = () => null } = props;

  const removeWorkoutDialogFnsRef = useRef(null);

  const { t } = useTranslation();

  const onClickRemoveButton = useCallback(() => {
    const removeFn = !workout?.exercises?.length ? onRemoveWorkout : removeWorkoutDialogFnsRef.current?.show;

    removeFn(workout.id);
  }, [ onRemoveWorkout, workout?.exercises?.length, workout.id ]);
  
  return (
    <div className={styles.WorkoutFooter}>
      <Button
        category={ButtonConstants.ButtonCategories.DANGER}
        icon={<XIcon />}
        onClick={onClickRemoveButton}
      >
        {t('Remove Workout')}
      </Button>

      {
        <RemoveWorkoutConfirmDialog
          onConfirm={() => onRemoveWorkout(workout.id)}
          dialogFnsRef={removeWorkoutDialogFnsRef}
        />
      }
    </div>
  );
};

const WorkoutFooterMemo = memo(WorkoutFooter);

export { WorkoutFooterMemo as WorkoutFooter };
