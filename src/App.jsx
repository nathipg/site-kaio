import { onAuthStateChanged } from 'firebase/auth';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GrowlFns } from './components';
import { Router } from './Router';
import { firebaseService } from './services';
import { ExerciseSlice, UserSlice } from './store/slices';

import '@/styles/global.scss';


const App = () => {
  const dispatch = useDispatch();

  const loadUsersError = useSelector(UserSlice.selectors.selectLoadUsersError);
  const loggedUser = useSelector(UserSlice.selectors.selectLoggedUser);
  
  useEffect(() => {
    if(loggedUser && loggedUser.isAdmin) {
      dispatch(UserSlice.actions.loadUsers());
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

  const onCloseLoadUsersErrorGrowl = useCallback(() => {
    dispatch(ExerciseSlice.actions.clearloadUsersError());
  }, [ dispatch ]);

  return (
    <>
      <Router />

      {GrowlFns.renderErrorGrowl({
        message: loadUsersError,
        onCloseGrowl: onCloseLoadUsersErrorGrowl,
      })}
    </>
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
