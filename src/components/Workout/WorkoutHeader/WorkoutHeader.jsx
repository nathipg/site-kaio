import { memo } from 'react';

import { ExpandCollapseArrow } from '@/components';

import { WorkoutProgress } from './WorkoutProgress';
import { WorkoutTitle } from './WorkoutTitle';

import styles from './WorkoutHeader.module.scss';

const WorkoutHeader = (props) => {
  const { title, description, completedExercisesQty, totalExercises } = props;
  const { isExpanded, onChangeExpandedState } = props;

  return (
    <div className={styles.WorkoutHeader}>
      <WorkoutTitle
        title={title}
        description={description}
      />

      <div className={styles.WorkoutHeaderGroup}>
        <WorkoutProgress
          totalExercises={totalExercises}
          completedExercisesQty={completedExercisesQty}
          onChangeExpandedState={onChangeExpandedState}
        />

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
