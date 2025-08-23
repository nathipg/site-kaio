import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { UserSlice, WorkoutSlice } from '@/store/slices';
import { utils } from '@/utils';

const CheckInList = () => {
  const { t } = useTranslation();

  const checkIns = useSelector(WorkoutSlice.selectors.selectAllWorkouts);
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
      {checkIns.map(userWorkout => {
        const user = usersMap.get(userWorkout.userUid);
        const normalizedUser = user || {
          fullName: t('<user not found>'),
        };

        const description = userWorkout.description ? `(${userWorkout.description})` : '';
        const comment = userWorkout.comment || t('<empty>');

        return (
          <div key={userWorkout.id}>
            <h2>{normalizedUser.fullName} ({utils.getDateFormatted(new Date(userWorkout.createdAt), { weekday: 'long' })})</h2>
            <p>{userWorkout.title} {description}</p>
            <p>{t('Comment')}: {comment}</p>
          </div>
        );
      })}
    </>
  );
};

const CheckInListMemo = memo(CheckInList);

export { CheckInListMemo as CheckInList };
