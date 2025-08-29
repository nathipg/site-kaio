import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const LocationPinIcon = () => {
  return (
    <FontAwesomeIcon icon={faLocationPin} />
  );
};

const LocationPinIconMemo = memo(LocationPinIcon);

export { LocationPinIconMemo as LocationPinIcon };
