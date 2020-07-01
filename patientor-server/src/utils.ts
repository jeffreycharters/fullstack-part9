/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry, NewEntry } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    occupation: parseString(object.occupation),
    ssn: parseString(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    entries: []
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toHospitalEntry = (object: any): NewEntry => {
  const newEntry: NewEntry = {
    description: parseString(object.description),
    date: parseString(object.date),
    specialist: parseString(object.specialist),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    diagnosisCodes: object.diagnosisCodes,
    type: "Hospital"
  };
  return newEntry;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (words: any): string => {
  if (!words || !isString(words)) {
    throw new Error(`Incorrect or missing field: ${words}`);
  }
  return words;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};
