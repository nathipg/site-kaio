import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ClipboardCheckIcon, ClipboardListIcon, DumbbellIcon } from '@/components';

import { ManagePageItem } from './ManagePageItem';

import styles from './ManagePage.module.scss';

const ManagePage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.ManagePage}>
      <ManagePageItem
        text={t('Manage Exercises')}
        to={{ pathname: '/manage/exercises' }}
        renderIcon={(props) => <DumbbellIcon {...props} />}
      />

      <ManagePageItem
        text={t('Manage Workouts')}
        to={{ pathname: '/manage/workouts' }}
        renderIcon={(props) => <ClipboardListIcon {...props} />}
      />

      <ManagePageItem
        text={t('Manage Check-ins')}
        to={{ pathname: '/manage/check-ins' }}
        renderIcon={(props) => <ClipboardCheckIcon {...props} />}
      />
    </div>
  );
};

const ManagePageMemo = memo(ManagePage);

export { ManagePageMemo as ManagePage };
