import { memo } from 'react';

import styles from './WorkoutTitle.module.scss';

const WorkoutTitle = (props) => {
  const { title, description } = props;

  return (
    <div className={styles.WorkoutTitle}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

const WorkoutTitleMemo = memo(WorkoutTitle);

export { WorkoutTitleMemo as WorkoutTitle };
