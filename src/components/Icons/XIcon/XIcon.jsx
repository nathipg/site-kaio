import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const XIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faX}
      {...props}
    />
  );
};

const XIconMemo = memo(XIcon);

export { XIconMemo as XIcon };
