import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ClipboardCheckIcon, ClipboardListIcon, GrowlFns, LinkCard } from '@/components';
import { CheckInSlice } from '@/store/slices';

import styles from './AthleteAreaPage.module.scss';

const AthleteAreaPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const saveWorkoutMessage = useSelector(CheckInSlice.selectors.selectSaveCheckInMessage);

  const onCloseSaveWorkoutSuccessGrowl = useCallback(() => {
    dispatch(CheckInSlice.actions.clearSaveCheckInMessage());
  }, [ dispatch ]);

  return (
    <div className={styles.AthleteAreaPage}>
      <h1>{t('Athlete')}</h1>

      <LinkCard
        text={t('Workout')}
        to={{ pathname: '/workout' }}
        renderIcon={(props) => <ClipboardListIcon {...props} />}
      />

      <LinkCard
        text={t('Check-ins')}
        to={{ pathname: '/check-ins' }}
        renderIcon={(props) => <ClipboardCheckIcon {...props} />}
      />

      {GrowlFns.renderSuccessGrowl({
        message: saveWorkoutMessage,
        onCloseGrowl: onCloseSaveWorkoutSuccessGrowl,
      })}
    </div>
  );
};

const AthleteAreaPageMemo = memo(AthleteAreaPage);

export { AthleteAreaPageMemo as AthleteAreaPage };
