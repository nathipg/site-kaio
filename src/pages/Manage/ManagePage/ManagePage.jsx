import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import styles from './ManagePage.module.scss';

const ManagePage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.ManagePage}>
      <Link to={{ pathname: '/manage/exercises' }}>{t('Manage Exercises')}</Link>
      <Link to={{ pathname: '/manage/workouts' }}>{t('Manage Workouts')}</Link>
      <Link to={{ pathname: '/manage/check-ins' }}>{t('Manage Check-ins')}</Link>
    </div>
  );
};

const ManagePageMemo = memo(ManagePage);

export { ManagePageMemo as ManagePage };
