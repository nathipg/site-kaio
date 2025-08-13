import { memo } from 'react';

import { ExerciseItem } from './ExerciseItem';

import styles from './ExerciseList.module.scss';

const ExerciseList = (props) => {
  const { items } = props;

  return (
    <div className={styles.ExerciseList}>
      {items.map((item) => (
        <ExerciseItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

const ExerciseListMemo = memo(ExerciseList);

export { ExerciseListMemo as ExerciseList };
