import { memo, useCallback, useState } from 'react';

import { ExerciseBody } from './ExerciseBody';
import { ExerciseHeader } from './ExerciseHeader';

const Exercise = (props) => {
  const { onChangeExerciseStatus, setExerciseProperty, onRemoveExercise } = props;
  const { exercise, editMode } = props;

  const [ isExpanded, setIsExpanded ] = useState(false);

  const onChangeExpandedState = useCallback(() => {
    setIsExpanded(currentStatus => !currentStatus);
  }, []);

  const renderExerciseBody = useCallback(() => {
    if(!exercise?.exerciseId) {
      return <></>;
    }

    return (
      <ExerciseBody
        exercise={exercise}
        isExpanded={isExpanded}
        onChangeExerciseStatus={onChangeExerciseStatus}
        editMode={editMode}
        setExerciseProperty={setExerciseProperty}
      />
    );
  }, [ editMode, exercise, isExpanded, onChangeExerciseStatus, setExerciseProperty ]);

  return (
    <div>
      <ExerciseHeader
        exercise={exercise}
        isExpanded={isExpanded}
        onChangeExpandedState={onChangeExpandedState}
        editMode={editMode}
        setExerciseProperty={setExerciseProperty}
        onRemoveExercise={onRemoveExercise}
      />

      {renderExerciseBody()}
    </div>
  );
};

const ExerciseMemo = memo(Exercise);

export { ExerciseMemo as Exercise };
