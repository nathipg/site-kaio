import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const UserIcon = () => {
  return (
    <FontAwesomeIcon icon={faUser} />
  );
};

const UserIconMemo = memo(UserIcon);

export { UserIconMemo as UserIcon };
