import { memo } from 'react';

import { PublicationItem } from './PublicationItem';

import styles from './PublicationList.module.scss';

const PublicationList = (props) => {
  const { items } = props;

  return (
    <div className={styles.PublicationList}>
      {items.map((item) => (
        <PublicationItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

const PublicationListMemo = memo(PublicationList);

export { PublicationListMemo as PublicationList };
