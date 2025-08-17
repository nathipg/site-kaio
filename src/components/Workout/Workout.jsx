import { memo, useCallback, useMemo, useState } from 'react';

import { WorkoutExercises } from './WorkoutExercises';
import { WorkoutFooter } from './WorkoutFooter';
import { WorkoutHeader } from './WorkoutHeader';

import styles from './Workout.module.scss';

const Workout = (props) => {
  const { workout, editMode } = props;
  const { setWorkoutProperty = () => null, onRemoveWorkout = () => null } = props;

  const [ completedExercises, setCompletedExercises ] = useState([]);
  const [ isExpanded, setIsExpanded ] = useState(true);

  const completedExercisesQty = useMemo(() => {
    return completedExercises.length;
  }, [ completedExercises.length ]);

  const onChangeExpandedState = useCallback(() => {
    setIsExpanded(currentStatus => !currentStatus);
  }, []);

  const onChangeExerciseStatus = useCallback((data) => {
    const { exerciseId, isCompleted } = data;

    setCompletedExercises(currentCompletedExercises => {
      if(isCompleted) {
        return [
          ...new Set([
            ...currentCompletedExercises,
            exerciseId,
          ]),
        ];
      }

      const arrayWithoutItem = currentCompletedExercises.filter(item => item != exerciseId);

      return [
        ...arrayWithoutItem,
      ];
    });
  }, []);

  return (
    <div className={styles.Workout}>
      <WorkoutHeader
        workout={workout}
        totalExercises={workout.exercises.length}
        isExpanded={isExpanded}
        onChangeExpandedState={onChangeExpandedState}
        completedExercisesQty={completedExercisesQty}
        editMode={editMode}
        setWorkoutProperty={setWorkoutProperty}
      />

      <div style={{ display: isExpanded ? 'block' : 'none' }}>
        <WorkoutExercises
          exercises={workout.exercises}
          onChangeExerciseStatus={onChangeExerciseStatus}
          editMode={editMode}
          setWorkoutProperty={setWorkoutProperty}
        />
      </div>

      <WorkoutFooter
        workout={workout}
        onRemoveWorkout={onRemoveWorkout}
      />
    </div>
  );
};

const WorkoutMemo = memo(Workout);

export { WorkoutMemo as Workout };
