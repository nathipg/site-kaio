import { onAuthStateChanged } from 'firebase/auth';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GrowlFns } from './components';
import { Router } from './Router';
import { firebaseService } from './services';
import { ExerciseSlice, UserSlice, WorkoutSlice } from './store/slices';

import '@/styles/global.scss';


const App = () => {
  const dispatch = useDispatch();

  const loadExercisesError = useSelector(ExerciseSlice.selectors.selectLoadExercisesError);
  const loadWorkoutsError = useSelector(WorkoutSlice.selectors.selectLoadWorkoutsError);
  const loadUsersError = useSelector(UserSlice.selectors.selectLoadUsersError);

  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);
  
  useEffect(() => {
    if(loggedUser && loggedUser.isAdmin) {
      dispatch(UserSlice.actions.loadUsers());
      dispatch(WorkoutSlice.actions.loadWorkouts());
    }
  }, [ dispatch, loggedUser ]);

  useEffect(() => {
    dispatch(ExerciseSlice.actions.loadExercises());
    
    onAuthStateChanged(firebaseService.auth.auth, (user) => {
      if (user) {
        dispatch(UserSlice.actions.loadUser(user));
      }

      dispatch(UserSlice.actions.completeFirebaseOnAuthStateChangedStatus());
    });
  }, [ dispatch ]);

  const onCloseLoadWorkoutsErrorGrowl = useCallback(() => {
    dispatch(WorkoutSlice.actions.clearLoadWorkoutsError());
  }, [ dispatch ]);

  const onCloseLoadUsersErrorGrowl = useCallback(() => {
    dispatch(UserSlice.actions.clearLoadUsersError());
  }, [ dispatch ]);

  const onCloseLoadExercisesErrorGrowl = useCallback(() => {
    dispatch(ExerciseSlice.actions.clearLoadExercisesError());
  }, [ dispatch ]);

  return (
    <>
      <Router />

      {GrowlFns.renderErrorGrowl({
        message: loadWorkoutsError,
        onCloseGrowl: onCloseLoadWorkoutsErrorGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: loadUsersError,
        onCloseGrowl: onCloseLoadUsersErrorGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: loadExercisesError,
        onCloseGrowl: onCloseLoadExercisesErrorGrowl,
      })}
    </>
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
