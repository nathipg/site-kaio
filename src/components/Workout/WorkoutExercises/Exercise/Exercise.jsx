import { memo, useCallback, useState } from 'react';

import { ExerciseBody } from './ExerciseBody';
import { ExerciseHeader } from './ExerciseHeader';

const Exercise = (props) => {
  const { onChangeExerciseStatus } = props;
  const { exercise } = props;
  const { name } = exercise;

  const [ isExpanded, setIsExpanded ] = useState(false);

  const onChangeExpandedState = useCallback(() => {
    setIsExpanded(currentStatus => !currentStatus);
  }, []);

  return (
    <div>
      <ExerciseHeader
        name={name}
        isExpanded={isExpanded}
        onChangeExpandedState={onChangeExpandedState}
      />

      <ExerciseBody
        exercise={exercise}
        isExpanded={isExpanded}
        onChangeExerciseStatus={onChangeExerciseStatus}
      />
    </div>
  );
};

const ExerciseMemo = memo(Exercise);

export { ExerciseMemo as Exercise };
