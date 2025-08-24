import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { CheckInList, FieldWithLabel, GrowlFns, Input } from '@/components';
import { CheckInSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './CheckInsPage.module.scss';

const CheckInsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const checkIns = useSelector(CheckInSlice.selectors.selectUserCheckIns);
  const loadCheckInsError = useSelector(CheckInSlice.selectors.selectLoadCheckInsError);

  const [ selectedDate, setSelectedDate ] = useState(utils.getDateFormattedForInput(new Date()));

  const onCloseLoadCheckInsErrorGrowl = useCallback(() => {
    dispatch(CheckInSlice.actions.clearLoadCheckInsError());
  }, [ dispatch ]);

  useEffect(() => {
    if(selectedDate) {
      const date = new Date(`${selectedDate} 00:00:00`);
      dispatch(CheckInSlice.actions.loadUserCheckIns(utils.getDateIsoFormat(date)));
    }
  }, [ dispatch, selectedDate ]);

  return (
    <div className={styles.CheckInsPage}>
      <h1>{t('Manage Check-ins')}</h1>

      <FieldWithLabel
        label={t('Date')}
        field={(
          <Input
            type="date"
            name="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        )}
      />

      <CheckInList
        checkIns={checkIns}
      />

      {GrowlFns.renderErrorGrowl({
        message: loadCheckInsError,
        onCloseGrowl: onCloseLoadCheckInsErrorGrowl,
      })}
    </div>
  );
};

const CheckInsPageMemo = memo(CheckInsPage);

export { CheckInsPageMemo as CheckInsPage };
