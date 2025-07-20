import { memo, useCallback, useMemo, useState } from 'react';

import { ExerciseList } from './ExerciseList';
import { WorkoutHeader } from './WorkoutHeader';

import styles from './Workout.module.scss';

const mockedExercises = [
  { id: 1, name: 'Exercício 1', sets: 1, reps: 10, weight: '10 Kg', rest: '1m', videoURL: 'https://www.youtube.com/embed/st1rQHX4llM?si=lmVCAcFvhzX2RIM9' },
  { id: 2, name: 'Exercício 2', sets: 2, reps: 20, weight: '20 Kg', rest: '2m', videoURL: 'https://www.youtube.com/embed/st1rQHX4llM?si=lmVCAcFvhzX2RIM9' },
  { id: 3, name: 'Exercício 3', sets: 3, reps: 30, weight: '30 Kg', rest: '3m', videoURL: 'https://www.youtube.com/embed/st1rQHX4llM?si=lmVCAcFvhzX2RIM9' },
];

const Workout = (props) => {
  const { title, description } = props;

  const exercises = mockedExercises;

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
        title={title}
        description={description}
        totalExercises={exercises.length}
        isExpanded={isExpanded}
        onChangeExpandedState={onChangeExpandedState}
        completedExercisesQty={completedExercisesQty}
      />

      <div style={{ display: isExpanded ? 'block' : 'none' }}>
        <ExerciseList
          exercises={exercises}
          onChangeExerciseStatus={onChangeExerciseStatus}
        />
      </div>
    </div>
  );
};

const WorkoutMemo = memo(Workout);

export { WorkoutMemo as Workout };
