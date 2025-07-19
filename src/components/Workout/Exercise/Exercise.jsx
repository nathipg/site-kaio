import { memo, useState } from 'react';

import { ExerciseStatus } from '../ExerciseStatus/ExerciseStatus';
import { WorkoutArrow } from '../WorkoutArrow';

import styles from './Exercise.module.scss';

const Exercise = (props) => {
  const { workoutProgressFnsRef } = props;
  const { exercise } = props;
  const { name, sets, reps, rest, videoURL } = exercise;

  const initialIsExpanded = false;

  const [ isExpanded, setIsExpanded ] = useState(initialIsExpanded);

  return (
    <tr className={styles.Exercise}>
      <td>
        <WorkoutArrow
          initialIsExpanded={initialIsExpanded}
          onChangeExpandedState={(status) => setIsExpanded(status)}
        />
      </td>

      <td>
        {name}

        <div style={{ display: isExpanded ? 'block' : 'none' }}>
          <iframe
            src={videoURL}
            width="560"
            height="315"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </td>

      <td>
        {sets}
      </td>

      <td>
        {reps}
      </td>

      <td>
        {rest}
      </td>

      <td>
        <ExerciseStatus
          workoutProgressFnsRef={workoutProgressFnsRef}
        />
      </td>

    </tr>
  );
};

const ExerciseMemo = memo(Exercise);

export { ExerciseMemo as Exercise };
