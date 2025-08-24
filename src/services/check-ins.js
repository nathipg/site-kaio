import { firebaseService } from './firebase';

export const loadCheckIns = async (date) => {
  return await firebaseService.checkIn.loadCheckIns(date);
};

export const loadUserCheckIns = async (date, userUid) => {
  return await firebaseService.checkIn.loadUserCheckIns(date, userUid);
};

export const saveCheckIn = async (data) => {
  return await firebaseService.checkIn.saveCheckIn(data);
};
