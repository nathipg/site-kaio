import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const EyeIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faEye}
      {...props}
    />
  );
};

const EyeIconMemo = memo(EyeIcon);

export { EyeIconMemo as EyeIcon };
