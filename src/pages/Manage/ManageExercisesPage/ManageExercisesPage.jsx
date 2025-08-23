import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AddExerciseButton, ExerciseList, GrowlFns } from '@/components';
import { ExerciseSlice } from '@/store/slices';

import styles from './ManageExercisesPage.module.scss';

const ManageExercisesPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const exercises = useSelector(ExerciseSlice.selectors.selectAllExercises);
  const loadExercisesError = useSelector(ExerciseSlice.selectors.selectLoadExercisesError);
  const addExerciseError = useSelector(ExerciseSlice.selectors.selectAddExerciseError);
  const saveExerciseError = useSelector(ExerciseSlice.selectors.selectSaveExerciseError);

  const onAddItem = useCallback(() => {
    dispatch(ExerciseSlice.actions.addExercise({ title: 'TEMP', videoUrl: '' }));
  }, [ dispatch ]);

  const onCloseLoadExercisesErrorGrowl = useCallback(() => {
    dispatch(ExerciseSlice.actions.clearLoadExercisesError());
  }, [ dispatch ]);

  const onCloseAddExerciseErrorGrowl = useCallback(() => {
    dispatch(ExerciseSlice.actions.clearAddExerciseError());
  }, [ dispatch ]);

  const onCloseSaveExerciseErrorGrowl = useCallback(() => {
    dispatch(ExerciseSlice.actions.clearSaveExerciseError());
  }, [ dispatch ]);

  return (
    <div className={styles.ManageExercisesPage}>
      <h1>{t('Manage Exercises')}</h1>

      <AddExerciseButton onClick={onAddItem} />

      {exercises?.length ? (
        <ExerciseList
          items={exercises}
        />
      ) : <></>}

      {GrowlFns.renderErrorGrowl({
        message: loadExercisesError,
        onCloseGrowl: onCloseLoadExercisesErrorGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: addExerciseError,
        onCloseGrowl: onCloseAddExerciseErrorGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: saveExerciseError,
        onCloseGrowl: onCloseSaveExerciseErrorGrowl,
      })}
    </div>
  );
};

const ManageExercisesPageMemo = memo(ManageExercisesPage);

export { ManageExercisesPageMemo as ManageExercisesPage };
