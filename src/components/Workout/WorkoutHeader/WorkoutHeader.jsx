import { memo, useCallback } from 'react';

import { ExpandCollapseArrow } from '@/components';

import { WorkoutProgress } from './WorkoutProgress';
import { WorkoutTitle } from './WorkoutTitle';

import styles from './WorkoutHeader.module.scss';

const WorkoutHeader = (props) => {
  const { workout, completedExercisesQty, totalExercises, isExpanded, editMode } = props;
  const { onChangeExpandedState, setWorkoutProperty = () => null } = props;

  const renderWorkoutProgress = useCallback(() => {
    if(editMode) {
      return <></>;
    }

    return (
      <WorkoutProgress
        totalExercises={totalExercises}
        completedExercisesQty={completedExercisesQty}
        onChangeExpandedState={onChangeExpandedState}
      />
    );
  }, [ completedExercisesQty, editMode, onChangeExpandedState, totalExercises ]);

  return (
    <div className={styles.WorkoutHeader}>
      <WorkoutTitle
        workout={workout}
        editMode={editMode}
        setWorkoutProperty={setWorkoutProperty}
      />

      <div className={styles.WorkoutHeaderGroup}>
        {renderWorkoutProgress()}

        <ExpandCollapseArrow
          isExpanded={isExpanded}
          onChangeExpandedState={onChangeExpandedState}
        />
      </div>
    </div>
  );
};

const WorkoutHeaderMemo = memo(WorkoutHeader);

export { WorkoutHeaderMemo as WorkoutHeader };
