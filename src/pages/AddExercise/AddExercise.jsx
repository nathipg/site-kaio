import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AddExercise = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Add Exercise')}</h1>
    </>
  );
};

const AddExerciseMemo = memo(AddExercise);

export { AddExerciseMemo as AddExercise };
