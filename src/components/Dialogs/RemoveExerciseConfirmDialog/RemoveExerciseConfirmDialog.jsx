import { memo, useCallback, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, ConfirmationDialog, GrowlFns } from '@/components';
import { ExerciseSlice } from '@/store/slices';

const RemoveExerciseConfirmDialog = (props) => {
  const { dialogFnsRef, exercise } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const removeExerciseError = useSelector(ExerciseSlice.selectors.selectRemoveExerciseError);

  const [ show, setShow ] = useState(false);

  useImperativeHandle(dialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  const onConfirm = useCallback(() => {
    dispatch(ExerciseSlice.actions.removeExercise(exercise.id));
  }, [ dispatch, exercise.id ]);

  const onCloseRemoveExerciseErrorGrowl = useCallback(() => {
    dispatch(ExerciseSlice.actions.clearRemoveExerciseError());
  }, [ dispatch ]);

  if(!show) {
    return <></>;
  }

  return (
    <>
      <ConfirmationDialog
        bodyContent={(
          <>
            <p>{t('Are you sure you want to remove this exercise?')}</p>
            <p>{t('This action cannot be undone')}</p>
          </>
        )}
        footerContent={(
          <>
            <Button
              category={ButtonConstants.ButtonCategories.DANGER}
              onClick={onConfirm}
            >
              {t('Remove Exercise')}
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
      
      {GrowlFns.renderErrorGrowl({
        message: removeExerciseError,
        onCloseGrowl: onCloseRemoveExerciseErrorGrowl,
      })}
    </>
  );
};

const RemoveExerciseConfirmDialogMemo = memo(RemoveExerciseConfirmDialog);

export { RemoveExerciseConfirmDialogMemo as RemoveExerciseConfirmDialog };
