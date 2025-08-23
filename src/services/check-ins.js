import { firebaseService } from './firebase';

export const loadCheckIns = async (date) => {
  return await firebaseService.checkIn.loadCheckIns(date);
};

export const saveCheckIn = async (data) => {
  return await firebaseService.checkIn.saveCheckIn(data);
};
