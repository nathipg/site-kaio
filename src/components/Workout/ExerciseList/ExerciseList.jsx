import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Exercise } from '../Exercise';

import styles from './ExerciseList.module.scss';

const ExerciseList = (props) => {
  const { exercises } = props;
  const { workoutProgressFnsRef } = props;

  const { t } = useTranslation();

  return (
    <div className={styles.ExerciseList}>
      <table>
        <thead>
          <tr>
            <th>{t('Exercise')}</th>
            <th>{t('Sets')}</th>
            <th>{t('Reps')}</th>
            <th>{t('Weight')}</th>
            <th>{t('Rest')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(exercise => (
            <Exercise
              key={exercise.id}
              exercise={exercise}
              workoutProgressFnsRef={workoutProgressFnsRef}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ExerciseListMemo = memo(ExerciseList);

export { ExerciseListMemo as ExerciseList };
