import { v7 as uuid } from 'uuid';

export const deepClone = (obj) => {
  if(obj === undefined) {
    return null;
  }

  return JSON.parse(JSON.stringify(obj));
};

export const getDateFormatted = (date, extraOptions = {}) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    ...extraOptions,
  };

  return new Intl.DateTimeFormat(getUserLanguage(), options).format(date);
};

export const getDateFormattedForInput = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const getDateIsoFormat = (date) => {
  return date.toISOString();
};

export const getUniqueId = () => {
  return uuid();
};

export const getUserLanguage = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages[0];
  }
  
  return navigator.language;
};

export const isArrayEmpty = (array) => {
  if(!array) {
    return true;
  }

  return array.length == 0;
};
