import { memo, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, RemoveWorkoutConfirmDialog, XIcon } from '@/components';

import { WORKOUT_MODES } from '../constants';
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

  const RENDER_MODE_MAPPER = useMemo(() => {
    return {
      [WORKOUT_MODES.EDIT]: renderRemoveElements,
      [WORKOUT_MODES.REGISTER]: renderRegisterElements,
    };
  }, [ renderRegisterElements, renderRemoveElements ]);

  const render = RENDER_MODE_MAPPER[mode] || (() => <></>);
  
  return (
    <div className={styles.WorkoutFooter}>
      {render()}
    </div>
  );
};

const WorkoutFooterMemo = memo(WorkoutFooter);

export { WorkoutFooterMemo as WorkoutFooter };
