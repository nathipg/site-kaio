import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Workout, WorkoutConstants } from '@/components';
import { UserSlice, CheckInSlice } from '@/store/slices';
import { utils } from '@/utils';

const CheckInList = () => {
  const { t } = useTranslation();

  const checkIns = useSelector(CheckInSlice.selectors.selectAllCheckIns);
  const users = useSelector(UserSlice.selectors.selectUsers);

  const usersMap = useMemo(() => {
    if(utils.isArrayEmpty(users)) {
      return new Map();
    }

    const map = new Map();

    users.forEach(user => {
      map.set(user.uid, user);
    });

    return map;
  }, [ users ]);

  if(utils.isArrayEmpty(users) || utils.isArrayEmpty(checkIns)) {
    return <span>{t('No check-in found')}</span>;
  }

  return (
    <>
      {checkIns.map(checkIn => {
        const user = usersMap.get(checkIn.userUid);

        const normalizedUser = user || {
          fullName: t('<user not found>'),
        };

        const normalizedDescription = checkIn.description ? `(${checkIn.description})` : '';

        const workoutData = {
          ...checkIn,
          title: `${normalizedUser.fullName} (${utils.getDateFormatted(new Date(checkIn.createdAt), { weekday: 'long' })})`,
          description: `${checkIn.title} ${normalizedDescription}`,
        };

        return (
          <Workout
            key={checkIn.id}
            workout={workoutData}
            user={user}
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
