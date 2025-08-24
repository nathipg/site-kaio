import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const ClipboardCheckIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faClipboardCheck}
      {...props}
    />
  );
};

const ClipboardCheckIconMemo = memo(ClipboardCheckIcon);

export { ClipboardCheckIconMemo as ClipboardCheckIcon };
