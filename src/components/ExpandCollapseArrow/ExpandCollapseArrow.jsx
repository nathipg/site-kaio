import { memo } from 'react';

import { CaretDownIcon, CaretUpIcon } from '../Icons';

import styles from './ExpandCollapseArrow.module.scss';

const ExpandCollapseArrow = (props) => {
  const { isExpanded } = props;
  const { onChangeExpandedState = () => null } = props;

  return (
    isExpanded ? (
      <CaretUpIcon
        className={styles.ExpandCollapseArrow}
        onClick={() => onChangeExpandedState(false)}
      />
    ) : (
      <CaretDownIcon
        className={styles.ExpandCollapseArrow}
        onClick={() => onChangeExpandedState(true)}
      />
    )
  );
};

const ExpandCollapseArrowMemo = memo(ExpandCollapseArrow);

export { ExpandCollapseArrowMemo as ExpandCollapseArrow };
