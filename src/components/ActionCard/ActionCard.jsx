import { memo } from 'react';
import { Link } from 'react-router';

import styles from './ActionCard.module.scss';

const ActionCard = (props) => {
  const { title, description, children, to } = props;
  const { renderIcon = () => null } = props;

  return (
    <Link
      className={`${styles.ActionCard} ${styles.hoverable}`}
      to={to}
    >
      <div className={`${styles.content} ${styles.contentCompact}`}>
        <div className={styles.actionCardHeader}>
          <div className={styles.icon}>
            {renderIcon()}
          </div>
          <div className={styles.actionCardInfo}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        {children}
      </div>
    </Link>
  );
};

const ActionCardMemo = memo(ActionCard);

export { ActionCardMemo as ActionCard };
