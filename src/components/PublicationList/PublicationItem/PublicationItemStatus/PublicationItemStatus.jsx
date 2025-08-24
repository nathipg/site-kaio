import { memo } from 'react';

import { EyeIcon, EyeSlashIcon } from '@/components/Icons';

const PublicationItemStatus = (props) => {
  const { item } = props;

  return item.isPublished ? <EyeIcon /> : <EyeSlashIcon />;
};

const PublicationItemStatusMemo = memo(PublicationItemStatus);

export { PublicationItemStatusMemo as PublicationItemStatus };
