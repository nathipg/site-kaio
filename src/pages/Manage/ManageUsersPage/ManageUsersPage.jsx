import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { UsersList } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './ManageUsersPage.module.scss';

const ManageUsersPage = () => {
  const { t } = useTranslation();

  const users = useSelector(UserSlice.selectors.selectUsers);

  return (
    <div className={styles.ManageUsersPage}>
      <h1>{t('Manage Users')}</h1>

      {users?.length ? (
        <UsersList
          items={users}
        />
      ) : <></>}
    </div>
  );
};

const ManageUsersPageMemo = memo(ManageUsersPage);

export { ManageUsersPageMemo as ManageUsersPage };
