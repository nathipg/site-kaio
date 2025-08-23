import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, GrowlFns, PaperPlaneIcon, TextArea } from '@/components';
import { ExerciseSlice, UserSlice, WorkoutSlice } from '@/store/slices';
import { utils } from '@/utils';

const SendWorkout = (props) => {
  const { workout, completedExercises } = props;
  const { onCompleteWorkout = () => null } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const dbExercises = useSelector(ExerciseSlice.selectors.selectAllExercises);
  const saveWorkoutError = useSelector(WorkoutSlice.selectors.selectLoadWorkoutsError);
  const saveWorkoutMessage = useSelector(WorkoutSlice.selectors.selectSaveWorkoutMessage);
  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);

  const [ comment, setComment ] = useState('');

  const onClickSendWorkout = useCallback(() => {
    const now = utils.getNowUTCIsoFormat();

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

    dispatch(WorkoutSlice.actions.saveWorkout(workoutData));

    setComment('');
  }, [ comment, completedExercises, dbExercises, dispatch, loggedUser.uid, workout.description, workout.exercises, workout.title ]);

  const onCloseSaveWorkoutErrorGrowl = useCallback(() => {
    dispatch(WorkoutSlice.actions.clearSaveWorkoutError());
  }, [ dispatch ]);

  useEffect(() => {
    if(saveWorkoutMessage != null) {
      onCompleteWorkout();
    }
  }, [ onCompleteWorkout, saveWorkoutMessage ]);
  
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
        message: saveWorkoutError,
        onCloseGrowl: onCloseSaveWorkoutErrorGrowl,
      })}
    </>
  );
};

const SendWorkoutMemo = memo(SendWorkout);

export { SendWorkoutMemo as SendWorkout };
