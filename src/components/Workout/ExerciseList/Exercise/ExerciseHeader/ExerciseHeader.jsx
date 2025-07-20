import { memo } from 'react';

import { ExpandCollapseArrow } from '@/components';

import styles from './ExerciseHeader.module.scss';

const ExerciseHeader = (props) => {
  const { isExpanded, name } = props;
  const { onChangeExpandedState } = props;

  return (
    <div
      className={styles.ExerciseHeader}
      onClick={onChangeExpandedState}
    >
      <ExpandCollapseArrow
        isExpanded={isExpanded}
      />

      <span className={styles.ExerciseHeaderText}>
        {name}
      </span>
    </div>
  );
};

const ExerciseHeaderMemo = memo(ExerciseHeader);

export { ExerciseHeaderMemo as ExerciseHeader };
