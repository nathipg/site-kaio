import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const ClipboardListIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faClipboardList}
      {...props}
    />
  );
};

const ClipboardListIconMemo = memo(ClipboardListIcon);

export { ClipboardListIconMemo as ClipboardListIcon };
