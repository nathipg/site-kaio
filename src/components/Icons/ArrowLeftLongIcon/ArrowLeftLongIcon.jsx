import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const ArrowLeftLongIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faArrowLeftLong}
      {...props}
    />
  );
};

const ArrowLeftLongIconMemo = memo(ArrowLeftLongIcon);

export { ArrowLeftLongIconMemo as ArrowLeftLongIcon };
