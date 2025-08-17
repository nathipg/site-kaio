import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ExpandCollapseArrow, RemoveIconButton, Select } from '@/components';
import { ExerciseSlice } from '@/store/slices';

import styles from './ExerciseHeader.module.scss';

const ExerciseHeader = (props) => {
  const { isExpanded, exercise, editMode } = props;
  const { onChangeExpandedState, setExerciseProperty, onRemoveExercise } = props;

  const dbExercises = useSelector(ExerciseSlice.selectors.selectAllExercises);

  const onClickHeader = useMemo(() => {
    return exercise?.exerciseId ? onChangeExpandedState : () => null;
  }, [ exercise?.exerciseId, onChangeExpandedState ]);

  const onChangeSelectedExercise = useCallback((event) => {
    setExerciseProperty('exerciseId', event.target.value);
  }, [ setExerciseProperty ]);

  const renderExercise = useCallback(() => {
    if(!editMode) {
      return exercise.name;
    }

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
          onClick={onRemoveExercise}
        />
      </>
    );
  }, [ dbExercises, editMode, exercise.exerciseId, exercise.name, onChangeSelectedExercise, onRemoveExercise ]);

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
    </div>
  );
};

const ExerciseHeaderMemo = memo(ExerciseHeader);

export { ExerciseHeaderMemo as ExerciseHeader };
