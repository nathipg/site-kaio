import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { UserSlice, WorkoutSlice } from '@/store/slices';
import { utils } from '@/utils';

const ManageCheckInsPage = () => {
  const { t } = useTranslation();

  const usersWorkouts = useSelector(WorkoutSlice.selectors.selectAllWorkouts);
  const users = useSelector(UserSlice.selectors.selectUsers);

  return (
    <>
      <h1>{t('Manage Check-ins')}</h1>

      {usersWorkouts.map(userWorkout => {
        const user = users.find(u => u.uid == userWorkout.userUid);

        const description = userWorkout.description ? `(${userWorkout.description})` : '';
        const comment = userWorkout.comment || t('<empty>');

        return (
          <div key={userWorkout.id}>
            <h2>{user.fullName} ({utils.getFullDateString(userWorkout.createdAt)})</h2>
            <p>{userWorkout.title} ({description})</p>
            <p>{t('Comment')}: {comment}</p>
          </div>
        );
      })}
    </>
  );
};

const ManageCheckInsPageMemo = memo(ManageCheckInsPage);

export { ManageCheckInsPageMemo as ManageCheckInsPage };
