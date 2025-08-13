import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const PenToSquareIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faPenToSquare}
      {...props}
    />
  );
};

const PenToSquareIconMemo = memo(PenToSquareIcon);

export { PenToSquareIconMemo as PenToSquareIcon };
