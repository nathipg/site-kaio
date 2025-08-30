import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, GrowlFns, PaperPlaneIcon, TextArea } from '@/components';
import { UserSlice, CheckInSlice } from '@/store/slices';
import { utils } from '@/utils';

const SendWorkout = (props) => {
  const { workout, completedExercises } = props;
  const { onCompleteWorkout = () => null } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const saveCheckInError = useSelector(CheckInSlice.selectors.selectSaveCheckInError);
  const saveCheckInMessage = useSelector(CheckInSlice.selectors.selectSaveCheckInMessage);
  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const [ comment, setComment ] = useState('');

  const onClickSendWorkout = useCallback(() => {
    const now = utils.getDateIsoFormat(new Date());

    const { id: _, ...otherWorkoutData } = workout;

    const workoutData = {
      ...otherWorkoutData,
      createdAt: now,
      userUid: loggedUser.uid,
      comment,
      completedExercises,
    };

    dispatch(CheckInSlice.actions.saveCheckIn(workoutData));
    dispatch(UserSlice.actions.saveUser({
      lastCheckInDate: now,
      uid: loggedUser.uid,
    }));

    setComment('');
  }, [ comment, completedExercises, dispatch, loggedUser.uid, workout ]);

  const onCloseSaveCheckInErrorGrowl = useCallback(() => {
    dispatch(CheckInSlice.actions.clearSaveCheckInError());
  }, [ dispatch ]);

  useEffect(() => {
    if(saveCheckInMessage != null) {
      onCompleteWorkout();
    }
  }, [ onCompleteWorkout, saveCheckInMessage ]);
  
  return (
    <>
      <TextArea
        value={comment}
        onChange={event => setComment(event.target.value)}
      />
    
      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PaperPlaneIcon />}
        onClick={onClickSendWorkout}
      >
        {t('Send')}
      </Button>

      {GrowlFns.renderErrorGrowl({
        message: saveCheckInError,
        onCloseGrowl: onCloseSaveCheckInErrorGrowl,
      })}
    </>
  );
};

const SendWorkoutMemo = memo(SendWorkout);

export { SendWorkoutMemo as SendWorkout };
