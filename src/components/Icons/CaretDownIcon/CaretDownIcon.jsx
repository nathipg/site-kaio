import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const CaretDownIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faCaretDown}
      {...props}
    />
  );
};

const CaretDownIconMemo = memo(CaretDownIcon);

export { CaretDownIconMemo as CaretDownIcon };
