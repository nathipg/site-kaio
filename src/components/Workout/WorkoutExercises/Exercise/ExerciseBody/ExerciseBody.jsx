import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Input, Video } from '@/components';
import { WORKOUT_MODES } from '@/components/Workout/constants';
import { ExerciseSlice } from '@/store/slices';

import { ExerciseStatus } from './ExerciseStatus';

import styles from './ExerciseBody.module.scss';

const ExerciseBody = (props) => {
  const { onChangeExerciseStatus, setExerciseProperty } = props;
  const { exercise, isExpanded, mode } = props;
  const { id, sets, reps, weight, rest } = exercise;

  const { t } = useTranslation();

  const dbExercise = useSelector(ExerciseSlice.selectors.selectExerciseById(exercise.exerciseId));

  const columnsQty = useMemo(() => {
    return mode == WORKOUT_MODES.EDIT ? 4 : 5;
  }, [ mode ]);

  const renderStatusColumn = useCallback(() => {
    if(mode == WORKOUT_MODES.EDIT) {
      return <></>;
    }

    return (
      <td>
        <ExerciseStatus
          exerciseId={id}
          onChangeExerciseStatus={onChangeExerciseStatus}
        />
      </td>
    );
  }, [ id, mode, onChangeExerciseStatus ]);

  const renderSets = useCallback(() => {
    if(mode != WORKOUT_MODES.EDIT) {
      return sets;
    }

    return (
      <Input
        type="text"
        name="sets"
        value={sets}
        onChange={(event) => setExerciseProperty('sets', event.target.value)}
      />
    );
  }, [ mode, setExerciseProperty, sets ]);

  const renderReps = useCallback(() => {
    if(!mode != WORKOUT_MODES.EDIT) {
      return reps;
    }

    return (
      <Input
        type="text"
        name="reps"
        value={reps}
        onChange={(event) => setExerciseProperty('reps', event.target.value)}
      />
    );
  }, [ mode, reps, setExerciseProperty ]);

  const renderWeight = useCallback(() => {
    if(mode != WORKOUT_MODES.EDIT) {
      return weight;
    }

    return (
      <Input
        type="text"
        name="weight"
        value={weight}
        onChange={(event) => setExerciseProperty('weight', event.target.value)}
      />
    );
  }, [ mode, setExerciseProperty, weight ]);

  const renderRest = useCallback(() => {
    if(mode != WORKOUT_MODES.EDIT) {
      return rest;
    }

    return (
      <Input
        type="text"
        name="rest"
        value={rest}
        onChange={(event) => setExerciseProperty('rest', event.target.value)}
      />
    );
  }, [ mode, setExerciseProperty, rest ]);

  return (
    <div className={styles.ExerciseBody}>
      <table>
        <thead>
          <tr>
            <th>{t('Sets')}</th>
            <th>{t('Reps')}</th>
            <th>{t('Weight')}</th>
            <th>{t('Rest')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {renderSets()}
            </td>

            <td>
              {renderReps()}
            </td>

            <td>
              {renderWeight()}
            </td>

            <td>
              {renderRest()}
            </td>

            {renderStatusColumn()}
          </tr>
          <tr data-is-expanded={isExpanded}>
            <td colSpan={columnsQty}>
              <Video
                url={dbExercise?.videoUrl}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ExerciseBodyMemo = memo(ExerciseBody);

export { ExerciseBodyMemo as ExerciseBody };
