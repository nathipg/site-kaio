import { memo, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, RemoveWorkoutConfirmDialog, WorkoutConstants, XIcon } from '@/components';

import { SendWorkout } from '../SendWorkout';

import styles from './WorkoutFooter.module.scss';

const WorkoutFooter = (props) => {
  const { workout, mode, completedExercises } = props;
  const { onRemoveWorkout = () => null, onCompleteWorkout = () => null } = props;

  const removeWorkoutDialogFnsRef = useRef(null);

  const { t } = useTranslation();

  const onClickRemoveButton = useCallback(() => {
    const removeFn = !workout?.exercises?.length ? onRemoveWorkout : removeWorkoutDialogFnsRef.current?.show;

    removeFn(workout.id);
  }, [ onRemoveWorkout, workout?.exercises?.length, workout.id ]);

  const renderRemoveElements = useCallback(() => {
    return (
      <>
        <Button
          category={ButtonConstants.ButtonCategories.DANGER}
          icon={<XIcon />}
          onClick={onClickRemoveButton}
        >
          {t('Remove Workout')}
        </Button>

        <RemoveWorkoutConfirmDialog
          onConfirm={() => onRemoveWorkout(workout.id)}
          dialogFnsRef={removeWorkoutDialogFnsRef}
        />
      </>
    );
  }, [ onClickRemoveButton, onRemoveWorkout, t, workout.id ]);

  const renderRegisterElements = useCallback(() => {
    return (
      <SendWorkout
        workout={workout}
        completedExercises={completedExercises}
        onCompleteWorkout={onCompleteWorkout}
      />
    );
  }, [ completedExercises, onCompleteWorkout, workout ]);

  const renderHistoryElements = useCallback(() => {
    const normalizedComment = workout.comment || t('<empty>');

    return (
      <p><span className={styles.WorkoutComment}>{t('Comment')}:</span> {normalizedComment}</p>
    );
  }, [ t, workout.comment ]);

  const RENDER_MODE_MAPPER = useMemo(() => {
    return {
      [WorkoutConstants.WORKOUT_MODES.EDIT]: renderRemoveElements,
      [WorkoutConstants.WORKOUT_MODES.REGISTER]: renderRegisterElements,
      [WorkoutConstants.WORKOUT_MODES.HISTORY]: renderHistoryElements,
    };
  }, [ renderHistoryElements, renderRegisterElements, renderRemoveElements ]);

  const render = RENDER_MODE_MAPPER[mode] || (() => <></>);
  
  return (
    <div className={styles.WorkoutFooter}>
      {render()}
    </div>
  );
};

const WorkoutFooterMemo = memo(WorkoutFooter);

export { WorkoutFooterMemo as WorkoutFooter };
