import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { FieldWithLabel, Input } from '@/components/Forms';

import styles from './WorkoutTitle.module.scss';

const WorkoutTitle = (props) => {
  const { workout, editMode } = props;
  const { title, description } = workout;
  const { setWorkoutProperty = () => null } = props;

  const { t } = useTranslation();

  const renderTitle = useCallback(() => {
    if(!editMode) {
      return <h2>title</h2>;
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
  }, [ editMode, setWorkoutProperty, t, title ]);

  const renderDescription = useCallback(() => {
    if(!editMode) {
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
  }, [ description, editMode, setWorkoutProperty, t ]);

  return (
    <div className={styles.WorkoutTitle}>
      {renderTitle()}
      {renderDescription()}
    </div>
  );
};

const WorkoutTitleMemo = memo(WorkoutTitle);

export { WorkoutTitleMemo as WorkoutTitle };
