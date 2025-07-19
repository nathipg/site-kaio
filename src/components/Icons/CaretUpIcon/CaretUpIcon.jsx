import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const CaretUpIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faCaretUp}
      {...props}
    />
  );
};

const CaretUpIconMemo = memo(CaretUpIcon);

export { CaretUpIconMemo as CaretUpIcon };
