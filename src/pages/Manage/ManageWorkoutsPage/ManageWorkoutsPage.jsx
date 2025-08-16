import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ManageWorkoutsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Manage Workouts')}</h1>
    </>
  );
};

const ManageWorkoutsPageMemo = memo(ManageWorkoutsPage);

export { ManageWorkoutsPageMemo as ManageWorkoutsPage };
