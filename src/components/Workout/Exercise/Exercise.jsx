import { memo } from 'react';

import styles from './Exercise.module.scss';

const Exercise = () => {
  return (
    <div className={styles.Exercise}>

    </div>
  );
};

const ExerciseMemo = memo(Exercise);

export { ExerciseMemo as Exercise };
