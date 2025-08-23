import { memo } from 'react';

import styles from './ContentContainer.module.scss';

const ContentContainer = (props) => {
  const { children } = props;

  return (
    <div className={styles.ContentContainer}>
      {children}
    </div>
  );
};

const ContentContainerMemo = memo(ContentContainer);

export { ContentContainerMemo as ContentContainer };
