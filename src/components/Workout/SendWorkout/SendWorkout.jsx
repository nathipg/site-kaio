import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, GrowlFns, PaperPlaneIcon, TextArea } from '@/components';
import { UserSlice, WorkoutSlice } from '@/store/slices';
import { utils } from '@/utils';

const SendWorkout = (props) => {
  const { workout, completedExercises } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const saveWorkoutError = useSelector(WorkoutSlice.selectors.selectLoadWorkoutsError);
  const saveWorkoutMessage = useSelector(WorkoutSlice.selectors.selectSaveWorkoutMessage);
  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const [ comment, setComment ] = useState('');

  const onClickSendWorkout = useCallback(() => {
    const now = utils.getNowUTCIsoFormat();

    const exercisesByStatus = workout.exercises.reduce((acc, exercise) => {
      const isCompleted = completedExercises.includes(exercise.id);

      const completed = isCompleted ?
        [ ...acc.completed, exercise ]
        : acc.completed;

      const missing = !isCompleted ?
        [ ...acc.missing, exercise ]
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

    dispatch(WorkoutSlice.actions.saveWorkout(workoutData));

    setComment('');
  }, [ comment, completedExercises, dispatch, loggedUser.uid, workout.description, workout.exercises, workout.title ]);

  const onCloseSaveWorkoutErrorGrowl = useCallback(() => {
    dispatch(WorkoutSlice.actions.clearSaveWorkoutError());
  }, [ dispatch ]);

  const onCloseSaveWorkoutSuccessGrowl = useCallback(() => {
    dispatch(WorkoutSlice.actions.clearSaveWorkoutMessage());
  }, [ dispatch ]);
  
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

      {GrowlFns.renderSuccessGrowl({
        message: saveWorkoutMessage,
        onCloseGrowl: onCloseSaveWorkoutSuccessGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: saveWorkoutError,
        onCloseGrowl: onCloseSaveWorkoutErrorGrowl,
      })}
    </>
  );
};

const SendWorkoutMemo = memo(SendWorkout);

export { SendWorkoutMemo as SendWorkout };
