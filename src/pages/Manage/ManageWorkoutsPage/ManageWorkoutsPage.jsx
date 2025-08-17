import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button, ButtonConstants, PlusIcon, SaveButton, Select, WorkoutsList } from '@/components';
import { UserSlice } from '@/store/slices';
import { utils } from '@/utils';

const ManageWorkoutsPage = () => {
  const { t } = useTranslation();

  const users = useSelector(UserSlice.selectors.selectUsers);

  const [ selectedUser, setSelectedUser ] = useState(null);

  const updateSelectedUserWorkout = useCallback((workoutId, property, value) => {
    const currentWorkouts = utils.deepClone(selectedUser?.workouts) || [];

    const workoutIndex = currentWorkouts.findIndex(cw => cw.id == workoutId);
    const currentWorkout = currentWorkouts[workoutIndex];

    const updatedWorkout = {
      ...currentWorkout,
      [property]: value,
    };

    const updatedWorkoutList = [
      ...currentWorkouts.slice(0, workoutIndex),
      updatedWorkout,
      ...currentWorkouts.slice(workoutIndex + 1),
    ];

    setSelectedUser((currentSelectedUser) => {
      return {
        ...currentSelectedUser,
        workouts: updatedWorkoutList,
      };
    });
  }, [ selectedUser?.workouts ]);

  const onAddWorkout = useCallback(() => {
    if(!selectedUser) {
      return;
    }

    if(!selectedUser.workouts) {
      selectedUser.workouts = [];
    }

    const currentWorkoutNumber = selectedUser.workouts.length + 1;

    const newWorkout = {
      id: utils.getUniqueId(),
      title: `Treino ${currentWorkoutNumber}`,
      description: '',
      exercises: [],
    };

    setSelectedUser((currentSelectedUser) => {
      return {
        ...currentSelectedUser,
        workouts: [
          ...selectedUser.workouts,
          newWorkout,
        ],
      };
    });
  }, [ selectedUser ]);

  const onSaveWorkouts = useCallback(() => {
    console.log('TODO onSaveWorkouts');
  }, []);

  const getUserByUid = useCallback((uid) => {
    return utils.deepClone(users.find(user => user.uid === uid));
  }, [ users ]);

  const renderSaveButton = useCallback(() => {
    if(!selectedUser) {
      return <></>;
    }

    return (
      <SaveButton onClick={onSaveWorkouts} />
    );
  }, [ onSaveWorkouts, selectedUser ]);

  const renderUsers = useCallback(() => {
    if(!users?.length) {
      return <span>{t('You don\'t have users :C')}</span>;
    }

    const renderUsers = () => {
      return users.map(user => {
        return <option key={user.uid} value={user.uid}>{user.fullName} ({user.email})</option>;
      });
    };

    return (
      <Select
        name="users"
        emptyItemText="Select an user"
        value={selectedUser?.uid}
        onChange={(event) => setSelectedUser(getUserByUid(event.target.value))}
        renderItems={renderUsers}
      />
    );
  }, [ getUserByUid, selectedUser?.uid, t, users ]);

  const renderAddWorkoutButton = useCallback(() => {
    if(!selectedUser) {
      return <></>;
    }

    return (
      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PlusIcon />}
        onClick={onAddWorkout}
      >
        {t('Add Workout')}
      </Button>
    );
  }, [ onAddWorkout, selectedUser, t ]);

  const renderSelectedUserWorkouts = useCallback(() => {
    if(!selectedUser) {
      return <></>;
    }

    return (
      <WorkoutsList
        workouts={selectedUser?.workouts}
        editMode={true}
        updateWorkoutData={updateSelectedUserWorkout}
      />
    );
  }, [ selectedUser, updateSelectedUserWorkout ]);

  return (
    <>
      <h1>{t('Manage Workouts')}</h1>

      {renderUsers()}
      {renderSaveButton()}
      {renderAddWorkoutButton()}
      {renderSelectedUserWorkouts()}
    </>
  );
};

const ManageWorkoutsPageMemo = memo(ManageWorkoutsPage);

export { ManageWorkoutsPageMemo as ManageWorkoutsPage };
