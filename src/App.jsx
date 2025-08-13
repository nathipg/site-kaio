import { onAuthStateChanged } from 'firebase/auth';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Router } from './Router';
import { firebaseService } from './services';
import { ExerciseSlice, UserSlice } from './store/slices';

import '@/styles/global.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ExerciseSlice.actions.loadExercises());
    
    onAuthStateChanged(firebaseService.auth.auth, (user) => {
      if (user) {
        dispatch(UserSlice.actions.loadUser(user));
      }

      dispatch(UserSlice.actions.completeFirebaseOnAuthStateChangedStatus());
    });
  }, [ dispatch ]);

  return (
    <Router />
  );
};

const AppMemo = memo(App);

export { AppMemo as App };
