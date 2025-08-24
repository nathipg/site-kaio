import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Workout, WorkoutConstants } from '@/components';
import { utils } from '@/utils';

const CheckInList = (props) => {
  const { checkIns } = props;

  const { t } = useTranslation();

  if(utils.isArrayEmpty(checkIns)) {
    return <span>{t('No check-in found')}</span>;
  }

  return (
    <>
      {checkIns.map(checkIn => {
        return (
          <Workout
            key={checkIn.id}
            workout={checkIn}
            mode={WorkoutConstants.WORKOUT_MODES.HISTORY}
            isExpanded={false}
          />
        );
      })}
    </>
  );
};

const CheckInListMemo = memo(CheckInList);

export { CheckInListMemo as CheckInList };
