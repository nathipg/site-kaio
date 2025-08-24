import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { FieldWithLabel, Input, WorkoutConstants } from '@/components';

import styles from './WorkoutTitle.module.scss';

const WorkoutTitle = (props) => {
  const { workout, mode } = props;
  const { title, description } = workout;
  const { setWorkoutProperty = () => null } = props;

  const { t } = useTranslation();

  const renderTitle = useCallback(() => {
    if(mode != WorkoutConstants.WORKOUT_MODES.EDIT) {
      return <h2>{title}</h2>;
    }

    return (
      <FieldWithLabel
        label={t('Title')}
        field={(
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setWorkoutProperty('title', event.target.value)}
          />
        )}
      />
    );
  }, [ mode, setWorkoutProperty, t, title ]);

  const renderDescription = useCallback(() => {
    if(mode != WorkoutConstants.WORKOUT_MODES.EDIT) {
      return <p>{description}</p>;
    }

    return (
      <FieldWithLabel
        label={t('Description')}
        field={(
          <Input
            type="text"
            name="description"
            value={description}
            onChange={(event) => setWorkoutProperty('description', event.target.value)}
          />
        )}
      />
    );
  }, [ description, mode, setWorkoutProperty, t ]);

  return (
    <div className={styles.WorkoutTitle}>
      {renderTitle()}
      {renderDescription()}
    </div>
  );
};

const WorkoutTitleMemo = memo(WorkoutTitle);

export { WorkoutTitleMemo as WorkoutTitle };
