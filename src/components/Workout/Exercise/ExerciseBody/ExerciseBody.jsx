import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Video } from '@/components';

import { ExerciseStatus } from '../ExerciseStatus';

import styles from './ExerciseBody.module.scss';

const ExerciseBody = (props) => {
  const { workoutProgressFnsRef } = props;
  const { exercise, isExpanded } = props;
  const { sets, reps, weight, rest, videoURL } = exercise;

  const { t } = useTranslation();

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
          <tr data-is-expanded={isExpanded}>
            <td colSpan={5}>
              <Video
                url={videoURL}
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
