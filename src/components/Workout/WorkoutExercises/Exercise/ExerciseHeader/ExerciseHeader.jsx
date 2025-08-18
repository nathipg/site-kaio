import { memo, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ExpandCollapseArrow, RemoveIconButton, RemoveWorkoutExerciseConfirmDialog, Select, WorkoutConstants } from '@/components';
import { ExerciseSlice } from '@/store/slices';

import styles from './ExerciseHeader.module.scss';

const ExerciseHeader = (props) => {
  const { isExpanded, exercise, mode } = props;
  const { onChangeExpandedState, setExerciseProperty, onRemoveExercise } = props;

  const removeWorkoutExerciseDialogFnsRef = useRef(null);

  const dbExercises = useSelector(ExerciseSlice.selectors.selectAllExercises);
  const dbExercise = useSelector(ExerciseSlice.selectors.selectExerciseById(exercise?.exerciseId));

  const onClickHeader = useMemo(() => {
    return exercise?.exerciseId ? onChangeExpandedState : () => null;
  }, [ exercise?.exerciseId, onChangeExpandedState ]);

  const onClickRemoveExerciseButton = useCallback(() => {
    const removeFn = !exercise.exerciseId ? onRemoveExercise : removeWorkoutExerciseDialogFnsRef.current?.show;
    removeFn();
  }, [ exercise.exerciseId, onRemoveExercise ]);

  const onChangeSelectedExercise = useCallback((event) => {
    setExerciseProperty('exerciseId', event.target.value);
  }, [ setExerciseProperty ]);

  const renderExerciseEditMode = useCallback(() => {
    const renderExercises = () => {
      return dbExercises.map(dbExercise => {
        return <option key={dbExercise.id} value={dbExercise.id}>{dbExercise.title}</option>;
      });
    };

    return (
      <>
        <Select
          name="exercises"
          emptyItemText="Select an exercise"
          value={exercise.exerciseId}
          onChange={onChangeSelectedExercise}
          renderItems={renderExercises}
        />

        <RemoveIconButton
          onClick={onClickRemoveExerciseButton}
        />
      </>
    );
  }, [ dbExercises, exercise.exerciseId, onChangeSelectedExercise, onClickRemoveExerciseButton ]);

  const renderExercise = useCallback(() => {
    if(mode != WorkoutConstants.WORKOUT_MODES.EDIT) {
      return (
        <span onClick={onClickHeader}>
          {dbExercise?.title}
        </span>
      );
    }
    
    return renderExerciseEditMode();
  }, [ dbExercise?.title, mode, onClickHeader, renderExerciseEditMode ]);

  const renderArrow = useCallback(() => {
    if(!exercise?.exerciseId) {
      return <></>;
    }

    return (
      <ExpandCollapseArrow
        isExpanded={isExpanded}
        onClick={onClickHeader}
      />
    );
  }, [ exercise?.exerciseId, isExpanded, onClickHeader ]);

  return (
    <div
      className={styles.ExerciseHeader}
    >
      <span className={styles.ExerciseHeaderText}>
        {renderExercise()}
      </span>

      {renderArrow()}

      {
        <RemoveWorkoutExerciseConfirmDialog
          onRemoveExercise={onRemoveExercise}
          dialogFnsRef={removeWorkoutExerciseDialogFnsRef}
        />
      }
    </div>
  );
};

const ExerciseHeaderMemo = memo(ExerciseHeader);

export { ExerciseHeaderMemo as ExerciseHeader };
