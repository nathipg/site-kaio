import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { FieldWithLabel, GrowlFns, Input } from '@/components';
import { CheckInSlice } from '@/store/slices';
import { utils } from '@/utils';

import { CheckInList } from './CheckInList';

const ManageCheckInsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const loadCheckInsError = useSelector(CheckInSlice.selectors.selectLoadCheckInsError);

  const [ selectedDate, setSelectedDate ] = useState(utils.getDateFormattedForInput(new Date()));

  const onCloseLoadCheckInsErrorGrowl = useCallback(() => {
    dispatch(CheckInSlice.actions.clearLoadCheckInsError());
  }, [ dispatch ]);

  useEffect(() => {
    if(selectedDate) {
      const date = new Date(`${selectedDate} 00:00:00`);
      dispatch(CheckInSlice.actions.loadCheckIns(utils.getDateIsoFormat(date)));
    }
  }, [ dispatch, selectedDate ]);

  return (
    <>
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

      <CheckInList />

      {GrowlFns.renderErrorGrowl({
        message: loadCheckInsError,
        onCloseGrowl: onCloseLoadCheckInsErrorGrowl,
      })}
    </>
  );
};

const ManageCheckInsPageMemo = memo(ManageCheckInsPage);

export { ManageCheckInsPageMemo as ManageCheckInsPage };
