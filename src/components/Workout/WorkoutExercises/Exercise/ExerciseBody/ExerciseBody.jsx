import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Video, WorkoutConstants } from '@/components';
import { ExerciseSlice } from '@/store/slices';

import { ExerciseDetail } from './ExerciseDetail';
import { ExerciseStatus } from './ExerciseStatus';

import styles from './ExerciseBody.module.scss';

const ExerciseBody = (props) => {
  const { onChangeExerciseStatus, setExerciseProperty } = props;
  const { exercise, completedExercises, isExpanded, mode } = props;
  const { id, sets, reps, weight, rest } = exercise;

  const { t } = useTranslation();

  const dbExercise = useSelector(ExerciseSlice.selectors.selectExerciseById(exercise.exerciseId));

  const detailItems = useMemo(() => {
    return [
      { key: 'sets', text: t('Sets'), value: sets },
      { key: 'reps', text: t('Reps'), value: reps },
      { key: 'weight', text: t('Weight'), value: weight },
      { key: 'rest', text: t('Rest'), value: rest },
    ];
  }, [ reps, rest, sets, t, weight ]);

  const renderStatus = useCallback(() => {
    if(mode == WorkoutConstants.WORKOUT_MODES.EDIT) {
      return <></>;
    }

    return (
      <div className={styles.StatusArea}>
        <ExerciseStatus
          completedExercises={completedExercises}
          exerciseId={id}
          onChangeExerciseStatus={onChangeExerciseStatus}
          mode={mode}
        />
      </div>
    );
  }, [ completedExercises, id, mode, onChangeExerciseStatus ]);

  const renderVideo = useCallback(() => {
    return isExpanded ? (
      <Video
        url={dbExercise?.videoUrl}
      />
    ) : <></>;
  }, [ dbExercise?.videoUrl, isExpanded ]);

  return (
    <div className={styles.ExerciseBody} data-mode={mode}>
      {detailItems.map(item => (
        <ExerciseDetail
          key={item.key}
          property={item.key}
          text={item.text}
          value={item.value}
          mode={mode}
          setExerciseProperty={setExerciseProperty}
        />
      ))}

      {renderStatus()}

      <div className={styles.VideoArea}>
        {renderVideo()}
      </div>
    </div>
  );
};

const ExerciseBodyMemo = memo(ExerciseBody);

export { ExerciseBodyMemo as ExerciseBody };
