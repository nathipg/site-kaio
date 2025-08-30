import { memo } from 'react';
import { Link } from 'react-router';

import styles from './LinkCard.module.scss';

const LinkCard = (props) => {
  const { text, to } = props;
  const { renderIcon = () => null } = props;

  return (
    <Link
      className={styles.LinkCard}
      to={to}
    >
      {renderIcon({ size: '2x', width: '2rem' })}

      <span className={styles.LinkCardText}>
        {text}
      </span>
    </Link>
  );
};

const LinkCardMemo = memo(LinkCard);

export { LinkCardMemo as LinkCard };
