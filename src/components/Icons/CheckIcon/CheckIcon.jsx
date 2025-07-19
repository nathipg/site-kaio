import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const CheckIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faCheck}
      {...props}
    />
  );
};

const CheckIconMemo = memo(CheckIcon);

export { CheckIconMemo as CheckIcon };
