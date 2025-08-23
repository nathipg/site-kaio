import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { GrowlFns } from '@/components';
import { WorkoutSlice } from '@/store/slices';

const AthleteAreaPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const saveWorkoutMessage = useSelector(WorkoutSlice.selectors.selectSaveWorkoutMessage);

  const onCloseSaveWorkoutSuccessGrowl = useCallback(() => {
    dispatch(WorkoutSlice.actions.clearSaveWorkoutMessage());
  }, [ dispatch ]);

  return (
    <>
      <h1>{t('Athlete')}</h1>

      {GrowlFns.renderSuccessGrowl({
        message: saveWorkoutMessage,
        onCloseGrowl: onCloseSaveWorkoutSuccessGrowl,
      })}
    </>
  );
};

const AthleteAreaPageMemo = memo(AthleteAreaPage);

export { AthleteAreaPageMemo as AthleteAreaPage };
