import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { FieldWithLabel, Input } from '@/components';
import { WorkoutSlice } from '@/store/slices';
import { utils } from '@/utils';

import { CheckInList } from './CheckInList';

const ManageCheckInsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [ selectedDate, setSelectedDate ] = useState(utils.getDateFormattedForInput(new Date()));

  useEffect(() => {
    if(selectedDate) {
      const date = new Date(`${selectedDate} 00:00:00`);
      dispatch(WorkoutSlice.actions.loadWorkouts(utils.getDateIsoFormat(date)));
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
    </>
  );
};

const ManageCheckInsPageMemo = memo(ManageCheckInsPage);

export { ManageCheckInsPageMemo as ManageCheckInsPage };
