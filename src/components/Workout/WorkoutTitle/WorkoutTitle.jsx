import { memo } from 'react';

import styles from './WorkoutTitle.module.scss';

const WorkoutTitle = (props) => {
  const { title, description } = props;

  return (
    <div className={styles.WorkoutTitle}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

const WorkoutTitleMemo = memo(WorkoutTitle);

export { WorkoutTitleMemo as WorkoutTitle };
