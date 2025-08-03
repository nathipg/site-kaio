import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ManageExercises = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Manage Exercises')}</h1>
    </>
  );
};

const ManageExercisesMemo = memo(ManageExercises);

export { ManageExercisesMemo as ManageExercises };
