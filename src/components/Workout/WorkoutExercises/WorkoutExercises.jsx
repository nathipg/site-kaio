import { memo, useCallback } from 'react';

import { AddExerciseButton } from '@/components/Buttons/AddExerciseButton';
import { utils } from '@/utils';

import { Exercise } from './Exercise';

import styles from './WorkoutExercises.module.scss';

const WorkoutExercises = (props) => {
  const { exercises, editMode } = props;
  const { onChangeExerciseStatus, setWorkoutProperty } = props;

  const onAddExercise = useCallback(() => {
    const updatedExercises = [
      ...exercises,
      {
        id: utils.getUniqueId(),
        exerciseId: null,
        sets: '',
        reps: '',
        weight: '',
        rest: '',
      },
    ];

    setWorkoutProperty('exercises', updatedExercises);
  }, [ exercises, setWorkoutProperty ]);

  const renderAddExerciseButton = useCallback(() => {
    if(!editMode) {
      return <></>;
    }

    return (
      <AddExerciseButton onClick={onAddExercise} />
    );
  }, [ editMode, onAddExercise ]);

  return (
    <div className={styles.WorkoutExercises}>
      {renderAddExerciseButton()}

      {exercises.map(exercise => {
        const setExerciseProperty = (property, value) => {
          const exerciseIndex = exercises.findIndex(e => e.id == exercise.id);

          const updatedExercise = {
            ...exercise,
            [property]: value,
          };

          const updatedExercises = [
            ...exercises.slice(0, exerciseIndex),
            updatedExercise,
            ...exercises.slice(exerciseIndex + 1),
          ];

          setWorkoutProperty('exercises', updatedExercises);
        };

        const onRemoveExercise = () => {
          const exerciseIndex = exercises.findIndex(e => e.id == exercise.id);

          const updatedExercises = [
            ...exercises.slice(0, exerciseIndex),
            ...exercises.slice(exerciseIndex + 1),
          ];

          setWorkoutProperty('exercises', updatedExercises);
        };

        return (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            onChangeExerciseStatus={onChangeExerciseStatus}
            editMode={editMode}
            setExerciseProperty={setExerciseProperty}
            onRemoveExercise={onRemoveExercise}
          />
        );
      })}
    </div>
  );
};

const WorkoutExercisesMemo = memo(WorkoutExercises);

export { WorkoutExercisesMemo as WorkoutExercises };
