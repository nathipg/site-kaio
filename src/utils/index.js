import { v7 as uuid } from 'uuid';

// TODO Move functions to its own files
const deepClone = (obj) => {
  if(obj === undefined) {
    return null;
  }

  return JSON.parse(JSON.stringify(obj));
};

const getUniqueId = () => {
  return uuid();
};

const getNowUTCIsoFormat = () => {
  return (new Date()).toISOString();
};

const getFullDateString = (utcIsoFormat) => {
  const date = new Date(utcIsoFormat);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const utils = {
  deepClone,
  getUniqueId,
  getNowUTCIsoFormat,
  getFullDateString,
};
