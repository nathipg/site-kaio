import { memo, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, ConfirmationDialog } from '@/components';

const RemoveWorkoutConfirmDialog = (props) => {
  const { dialogFnsRef, onConfirm } = props;

  const { t } = useTranslation();

  const [ show, setShow ] = useState(false);

  useImperativeHandle(dialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  if(!show) {
    return <></>;
  }

  return (
    <>
      <ConfirmationDialog
        bodyContent={(
          <>
            <p>{t('Are you sure you want to remove this workout?')}</p>
            <p>{t('This action cannot be undone')}</p>
          </>
        )}
        footerContent={(
          <>
            <Button
              category={ButtonConstants.ButtonCategories.DANGER}
              onClick={onConfirm}
            >
              {t('Remove Workout')}
            </Button>
            <Button
              category={ButtonConstants.ButtonCategories.DEFAULT}
              onClick={() => setShow(false)}
            >
              {t('Cancel')}
            </Button>
          </>
        )}
      />
    </>
  );
};

const RemoveWorkoutConfirmDialogMemo = memo(RemoveWorkoutConfirmDialog);

export { RemoveWorkoutConfirmDialogMemo as RemoveWorkoutConfirmDialog };
