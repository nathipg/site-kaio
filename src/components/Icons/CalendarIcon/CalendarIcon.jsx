import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const CalendarIcon = () => {
  return (
    <FontAwesomeIcon icon={faCalendar} />
  );
};

const CalendarIconMemo = memo(CalendarIcon);

export { CalendarIconMemo as CalendarIcon };
