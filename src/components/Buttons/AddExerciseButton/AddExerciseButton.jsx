import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, PlusIcon } from '@/components';

const AddExerciseButton = (props) => {
  const { onClick } = props;

  const { t } = useTranslation();

  return (
    <Button
      category={ButtonConstants.ButtonCategories.SUCCESS}
      icon={<PlusIcon />}
      onClick={onClick}
    >
      {t('Add Exercise')}
    </Button>
  );
};

const AddExerciseButtonMemo = memo(AddExerciseButton);

export { AddExerciseButtonMemo as AddExerciseButton };
