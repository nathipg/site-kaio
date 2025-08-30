import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { FieldWithLabel, GrowlFns, Input } from '@/components';
import { CheckInList } from '@/components/CheckInList';
import { CheckInSlice, UserSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './ManageCheckInsPage.module.scss';

const ManageCheckInsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const loadCheckInsError = useSelector(CheckInSlice.selectors.selectLoadCheckInsError);
  const checkIns = useSelector(CheckInSlice.selectors.selectAllCheckIns);
  const users = useSelector(UserSlice.selectors.selectUsers);

  const [ viewLastCheckIns, setViewLastCheckIns ] = useState(true);
  const [ selectedDate, setSelectedDate ] = useState(utils.getDateFormattedForInput(new Date()));

  const usersMap = useMemo(() => {
    if(utils.isArrayEmpty(users)) {
      return new Map();
    }

    const map = new Map();

    users.forEach(user => {
      map.set(user.uid, user);
    });

    return map;
  }, [ users ]);

  const normalizedCheckIns = useMemo(() => {
    return checkIns.map((checkIn) => {
      const user = usersMap.get(checkIn.userUid);

      const normalizedUser = user || {
        fullName: t('<user not found>'),
      };

      const normalizedDescription = checkIn.description ? `(${checkIn.description})` : '';

      const workoutData = {
        ...checkIn,
        title: `${normalizedUser.fullName} (${utils.getDateFormatted(new Date(checkIn.createdAt), { weekday: 'long' })})`,
        description: `${checkIn.title} ${normalizedDescription}`,
      };

      return workoutData;
    });
  }, [ checkIns, t, usersMap ]);

  const onCloseLoadCheckInsErrorGrowl = useCallback(() => {
    dispatch(CheckInSlice.actions.clearLoadCheckInsError());
  }, [ dispatch ]);

  useEffect(() => {
    if(viewLastCheckIns) {
      dispatch(CheckInSlice.actions.loadCheckIns());
      return;
    }

    if(selectedDate) {
      const date = new Date(`${selectedDate} 00:00:00`);
      dispatch(CheckInSlice.actions.loadCheckInsByDate(utils.getDateIsoFormat(date)));
    }
  }, [ dispatch, selectedDate, viewLastCheckIns ]);

  return (
    <div className={styles.ManageCheckInsPage}>
      <h1>{t('Manage Check-ins')}</h1>

      <FieldWithLabel
        label={t('View last 100 check-ins')}
        field={(
          <Input
            type="checkbox"
            name="view-last-100-check-ins"
            checked={viewLastCheckIns}
            onChange={() => setViewLastCheckIns(currentViewLastCheckIns => !currentViewLastCheckIns)}
          />
        )}
      />

      {
        !viewLastCheckIns ? (
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
        ) : <></>
      }

      <CheckInList
        checkIns={normalizedCheckIns}
      />

      {GrowlFns.renderErrorGrowl({
        message: loadCheckInsError,
        onCloseGrowl: onCloseLoadCheckInsErrorGrowl,
      })}
    </div>
  );
};

const ManageCheckInsPageMemo = memo(ManageCheckInsPage);

export { ManageCheckInsPageMemo as ManageCheckInsPage };
