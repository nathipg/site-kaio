import { memo, useCallback } from 'react';

import { ExpandCollapseArrow } from '@/components';

import { WORKOUT_MODES } from '../constants';

import { WorkoutProgress } from './WorkoutProgress';
import { WorkoutTitle } from './WorkoutTitle';

import styles from './WorkoutHeader.module.scss';

const WorkoutHeader = (props) => {
  const { workout, completedExercisesQty, totalExercises, isExpanded, mode } = props;
  const { onChangeExpandedState, setWorkoutProperty = () => null } = props;

  const renderWorkoutProgress = useCallback(() => {
    if(mode == WORKOUT_MODES.EDIT) {
      return <></>;
    }

    return (
      <WorkoutProgress
        totalExercises={totalExercises}
        completedExercisesQty={completedExercisesQty}
        onChangeExpandedState={onChangeExpandedState}
      />
    );
  }, [ completedExercisesQty, mode, onChangeExpandedState, totalExercises ]);

  return (
    <div className={styles.WorkoutHeader}>
      <WorkoutTitle
        workout={workout}
        mode={mode}
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
