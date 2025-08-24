import { memo } from 'react';
import { Link } from 'react-router';

import styles from './ManagePageItem.module.scss';

const ManagePageItem = (props) => {
  const { text, to } = props;
  const { renderIcon = () => null } = props;

  return (
    <Link
      className={styles.ManagePageItem}
      to={to}
    >
      {renderIcon({ size: '5x', width: '6rem' })}

      <span className={styles.ManagePageItemText}>
        {text}
      </span>
    </Link>
  );
};

const ManagePageItemMemo = memo(ManagePageItem);

export { ManagePageItemMemo as ManagePageItem };
