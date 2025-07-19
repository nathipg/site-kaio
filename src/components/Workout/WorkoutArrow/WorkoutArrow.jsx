import { memo, useCallback, useState } from 'react';

import { CaretDownIcon, CaretUpIcon } from '../../Icons';

import styles from './WorkoutArrow.module.scss';

const WorkoutArrow = (props) => {
  const { initialIsExpanded = true } = props;
  const { onChangeExpandedState = () => null } = props;

  const [ isExpanded, setIsExpanded ] = useState(initialIsExpanded);

  const onClickArrow = useCallback((status) => {
    setIsExpanded(status);
    onChangeExpandedState(status);
  }, [ onChangeExpandedState ]);

  return (
    isExpanded ? (
      <CaretUpIcon
        className={styles.WorkoutArrow}
        onClick={() => onClickArrow(false)}
      />
    ) : (
      <CaretDownIcon
        className={styles.WorkoutArrow}
        onClick={() => onClickArrow(true)}
      />
    )
  );
};

const WorkoutArrowMemo = memo(WorkoutArrow);

export { WorkoutArrowMemo as WorkoutArrow };
