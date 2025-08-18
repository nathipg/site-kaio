import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const PaperPlaneIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faPaperPlane}
      {...props}
    />
  );
};

const PaperPlaneIconMemo = memo(PaperPlaneIcon);

export { PaperPlaneIconMemo as PaperPlaneIcon };
