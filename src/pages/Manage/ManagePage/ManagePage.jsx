import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ClipboardCheckIcon, ClipboardListIcon, DumbbellIcon, LinkCard, FileLinesIcon, UserIcon } from '@/components';

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

      <LinkCard
        text={t('Manage Publications')}
        to={{ pathname: '/manage/publications' }}
        renderIcon={(props) => <FileLinesIcon {...props} />}
      />

      <LinkCard
        text={t('Manage Users')}
        to={{ pathname: '/manage/users' }}
        renderIcon={(props) => <UserIcon {...props} />}
      />
    </div>
  );
};

const ManagePageMemo = memo(ManagePage);

export { ManagePageMemo as ManagePage };
