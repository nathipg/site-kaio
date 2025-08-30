import { memo } from 'react';
import { Link } from 'react-router';

import styles from './UsersList.module.scss';

const UsersList = (props) => {
  const { items } = props;

  return (
    <div className={styles.UsersList}>
      <ul>
        {items.map((user) => (
          <Link key={user.uid} to={{ pathname: '/athlete', search: `?uid=${user.uid}` }}>
            <li>{user.fullName}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const UsersListMemo = memo(UsersList);

export { UsersListMemo as UsersList };
