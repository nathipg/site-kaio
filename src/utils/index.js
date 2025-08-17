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

export const utils = {
  deepClone,
  getUniqueId,
};
