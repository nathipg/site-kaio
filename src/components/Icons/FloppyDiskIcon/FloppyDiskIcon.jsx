import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const FloppyDiskIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faFloppyDisk}
      {...props}
    />
  );
};

const FloppyDiskIconMemo = memo(FloppyDiskIcon);

export { FloppyDiskIconMemo as FloppyDiskIcon };
