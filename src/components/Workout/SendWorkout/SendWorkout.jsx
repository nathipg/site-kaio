import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, GrowlFns, PaperPlaneIcon, TextArea } from '@/components';
import { ExerciseSlice, UserSlice, CheckInSlice } from '@/store/slices';
import { utils } from '@/utils';

const SendWorkout = (props) => {
  const { workout, completedExercises } = props;
  const { onCompleteWorkout = () => null } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const dbExercises = useSelector(ExerciseSlice.selectors.selectAllExercises);
  const saveCheckInError = useSelector(CheckInSlice.selectors.selectSaveCheckInError);
  const saveCheckInMessage = useSelector(CheckInSlice.selectors.selectSaveCheckInMessage);
  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const [ comment, setComment ] = useState('');

  const onClickSendWorkout = useCallback(() => {
    const now = utils.getDateIsoFormat(new Date());

    const exercisesByStatus = workout.exercises.reduce((acc, exercise) => {
      const { id, exerciseId, ...otherExerciseData } = exercise;
      const isCompleted = completedExercises.includes(id);
      const dbExercise = dbExercises.find(de => de.id == exerciseId);

      const exerciseToSave = {
        ...otherExerciseData,
        ...dbExercise,
      };

      const completed = isCompleted ?
        [ ...acc.completed, exerciseToSave ]
        : acc.completed;

      const missing = !isCompleted ?
        [ ...acc.missing, exerciseToSave ]
        : acc.missing;

      return {
        completed,
        missing,
      };
    }, {
      completed: [],
      missing: [],
    });


    const workoutData = {
      createdAt: now,
      userUid: loggedUser.uid,
      title: workout.title,
      description: workout.description,
      comment,
      exercises: {
        ...exercisesByStatus,
      },
    };

    dispatch(CheckInSlice.actions.saveCheckIn(workoutData));

    setComment('');
  }, [ comment, completedExercises, dbExercises, dispatch, loggedUser.uid, workout.description, workout.exercises, workout.title ]);

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
