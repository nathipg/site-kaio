import { memo, useCallback } from 'react';

import { CaretDownIcon, CaretUpIcon } from '@/components';

import styles from './ExpandCollapseArrow.module.scss';

const ExpandCollapseArrow = (props) => {
  const { isExpanded } = props;
  const { onChangeExpandedState = () => null, onClick = () => null } = props;

  const onClickArrow = useCallback(() => {
    onChangeExpandedState();
    onClick();
  }, [ onChangeExpandedState, onClick ]);

  return (
    <div className={styles.ExpandCollapseArrow} onClick={onClickArrow}>
      {isExpanded ? <CaretUpIcon /> : <CaretDownIcon />}
    </div>
  );
};

const ExpandCollapseArrowMemo = memo(ExpandCollapseArrow);

export { ExpandCollapseArrowMemo as ExpandCollapseArrow };
