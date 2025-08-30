import { firebaseService } from './firebase';

export const loadCheckIns = async () => {
  return await firebaseService.checkIn.loadCheckIns();
};

export const loadCheckInsByDate = async (date) => {
  return await firebaseService.checkIn.loadCheckInsByDate(date);
};

export const loadUserCheckIns = async (userUid) => {
  return await firebaseService.checkIn.loadUserCheckIns(userUid);
};

export const loadUserCheckInsByDate = async (date, userUid) => {
  return await firebaseService.checkIn.loadUserCheckInsByDate(date, userUid);
};

export const saveCheckIn = async (data) => {
  return await firebaseService.checkIn.saveCheckIn(data);
};
