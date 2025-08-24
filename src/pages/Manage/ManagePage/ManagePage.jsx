import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ClipboardCheckIcon, ClipboardListIcon, DumbbellIcon, LinkCard } from '@/components';

import styles from './ManagePage.module.scss';

const ManagePage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.ManagePage}>
      <LinkCard
        text={t('Manage Exercises')}
        to={{ pathname: '/manage/exercises' }}
        renderIcon={(props) => <DumbbellIcon {...props} />}
      />

      <LinkCard
        text={t('Manage Workouts')}
        to={{ pathname: '/manage/workouts' }}
        renderIcon={(props) => <ClipboardListIcon {...props} />}
      />

      <LinkCard
        text={t('Manage Check-ins')}
        to={{ pathname: '/manage/check-ins' }}
        renderIcon={(props) => <ClipboardCheckIcon {...props} />}
      />
    </div>
  );
};

const ManagePageMemo = memo(ManagePage);

export { ManagePageMemo as ManagePage };
