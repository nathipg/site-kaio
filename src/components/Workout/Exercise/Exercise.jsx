import { memo, useCallback, useState } from 'react';

import { ExpandCollapseArrow } from '../../ExpandCollapseArrow';
import { ExerciseStatus } from '../ExerciseStatus';

import styles from './Exercise.module.scss';

const Exercise = (props) => {
  const { workoutProgressFnsRef } = props;
  const { exercise } = props;
  const { name, sets, reps, weight, rest, videoURL } = exercise;

  const [ isExpanded, setIsExpanded ] = useState(true);

  const onChangeExpandedState = useCallback((status) => {
    setIsExpanded(status);
  }, []);

  return (
    <>
      <tr className={styles.Exercise}>
        <td>
          <ExpandCollapseArrow
            isExpanded={isExpanded}
            onChangeExpandedState={onChangeExpandedState}
          />

          {name}
        </td>

        <td>
          {sets}
        </td>

        <td>
          {reps}
        </td>

        <td>
          {weight}
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

      <tr>
        <td colSpan={6}>
          <div className={styles.VideoContainer} data-is-expanded={isExpanded}>
            <iframe
              src={videoURL}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </td>
      </tr>
    </>
  );
};

const ExerciseMemo = memo(Exercise);

export { ExerciseMemo as Exercise };
