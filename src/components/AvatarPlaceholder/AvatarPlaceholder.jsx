import { memo } from 'react';

import { utils } from '@/utils';

import styles from './AvatarPlaceholder.module.scss';

const AvatarPlaceholder = (props) => {
  const { userName } = props;

  return (
    <div className={styles.AvatarPlaceholder}>
      {utils.getInitialsName(userName)}
    </div>
  );
};

const AvatarPlaceholderMemo = memo(AvatarPlaceholder);

export { AvatarPlaceholderMemo as AvatarPlaceholder };
