import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, ExerciseList, GrowlFns, PlusIcon } from '@/components';
import { ExerciseSlice } from '@/store/slices';

const ManageExercises = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const exercises = useSelector(ExerciseSlice.selectors.selectAllExercises);
  const loadExercisesError = useSelector(ExerciseSlice.selectors.selectLoadExercisesError);
  const addExerciseError = useSelector(ExerciseSlice.selectors.selectAddExerciseError);

  const onAddItem = useCallback(() => {
    dispatch(ExerciseSlice.actions.addExercise({ title: 'Temp', videoUrl: 'https://www.youtube.com/watch?v=st1rQHX4llM' }));
  }, [ dispatch ]);

  const onCloseLoadExercisesErrorGrowl = useCallback(() => {
    dispatch(ExerciseSlice.actions.clearLoadExercisesError());
  }, [ dispatch ]);

  const onCloseAddExerciseErrorGrowl = useCallback(() => {
    dispatch(ExerciseSlice.actions.clearAddExerciseError());
  }, [ dispatch ]);

  return (
    <>
      <h1>{t('Manage Exercises')}</h1>

      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PlusIcon />}
        onClick={onAddItem}
      >
        {t('Add Exercise')}
      </Button>

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
    </>
  );
};

const ManageExercisesMemo = memo(ManageExercises);

export { ManageExercisesMemo as ManageExercises };
