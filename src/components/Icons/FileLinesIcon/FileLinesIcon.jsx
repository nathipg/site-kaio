import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const FileLinesIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faFileLines}
      {...props}
    />
  );
};

const FileLinesIconMemo = memo(FileLinesIcon);

export { FileLinesIconMemo as FileLinesIcon };
