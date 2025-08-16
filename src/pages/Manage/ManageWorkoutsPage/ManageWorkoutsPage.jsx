import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { UserSlice } from '@/store/slices';

const ManageWorkoutsPage = () => {
  const { t } = useTranslation();

  const users = useSelector(UserSlice.selectors.selectUsers);

  const [ selectedUser, setSelectedUser ] = useState('');

  const renderUsers = useCallback(() => {
    if(!users?.length) {
      return <span>{t('You don\'t have users :C')}</span>;
    }

    return (
      <select value={selectedUser} onChange={(event) => setSelectedUser(event.target.value)}>
        <option value="">{t('Select an user')}</option>
        {users.map(user => {
          return <option key={user.uid} value={user.uid}>{user.fullName} ({user.email})</option>;
        })}
      </select>
    );
  }, [ selectedUser, t, users ]);

  return (
    <>
      <h1>{t('Manage Workouts')}</h1>

      {renderUsers()}
    </>
  );
};

const ManageWorkoutsPageMemo = memo(ManageWorkoutsPage);

export { ManageWorkoutsPageMemo as ManageWorkoutsPage };
