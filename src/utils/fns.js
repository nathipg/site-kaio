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

export const getInitialsName = (name) => {
  if (!name || typeof name !== 'string') return '';

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    // No last name → take first two letters
    return parts[0].substring(0, 2).toUpperCase();
  } else {
    // First letter of first name + first letter of last name
    const first = parts[0][0];
    const last = parts[parts.length - 1][0];
    return (first + last).toUpperCase();
  }
};

export const getMainUserLanguage = () => {
  const language = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
  
  if(language.includes('-')) {
    return language.split('-')[0];
  }

  return language;
};

export const getPublicationContentByUserLanguages = (publication) => {
  const userLanguagesList = getUserMainLanguagesList();

  const contentsByUserLanguage = userLanguagesList.map((language) => {
    return publication.content[language] || null;
  }).filter(Boolean);

  const contentsByUserLanguageWithDefaultValues = [
    ...contentsByUserLanguage,
    publication.content.en || publication.content.pt,
  ];

  return contentsByUserLanguageWithDefaultValues[0];
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

export const getUserMainLanguagesList = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages.map(language => language.includes('-') ? language.split('-')[0] : language);
  }

  const language = navigator.language.includes('-') ? navigator.language.split('-')[0] : navigator.language;
  
  return [ language ];
};

export const isArrayEmpty = (array) => {
  if(!array) {
    return true;
  }

  return array.length == 0;
};
