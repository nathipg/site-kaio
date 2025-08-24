import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const EyeSlashIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faEyeSlash}
      {...props}
    />
  );
};

const EyeSlashIconMemo = memo(EyeSlashIcon);

export { EyeSlashIconMemo as EyeSlashIcon };
