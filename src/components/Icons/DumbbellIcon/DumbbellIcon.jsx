import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const DumbbellIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faDumbbell}
      {...props}
    />
  );
};

const DumbbellIconMemo = memo(DumbbellIcon);

export { DumbbellIconMemo as DumbbellIcon };
