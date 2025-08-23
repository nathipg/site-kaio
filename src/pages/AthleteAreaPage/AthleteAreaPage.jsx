import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { GrowlFns } from '@/components';
import { CheckInSlice } from '@/store/slices';

const AthleteAreaPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const saveWorkoutMessage = useSelector(CheckInSlice.selectors.selectSaveCheckInMessage);

  const onCloseSaveWorkoutSuccessGrowl = useCallback(() => {
    dispatch(CheckInSlice.actions.clearSaveCheckInMessage());
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
