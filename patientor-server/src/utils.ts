/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry, NewHospitalEntry, NewOccupationalEntry, NewHealthCheckEntry, HealthCheckRating } from './types';

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
export const toHospitalEntry = (object: any): NewHospitalEntry => {
  const newEntry: NewHospitalEntry = {
    description: parseString(object.description),
    specialist: parseString(object.specialist),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    diagnosisCodes: parseList(object.diagnosisCodes),
    type: 'Hospital',
    discharge: {
      date: parseDate(object.discharge.date),
      criteria: parseString(object.discharge.criteria)
    }
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toOccupationalEntry = (object: any): NewOccupationalEntry => {
  const newEntry: NewOccupationalEntry = {
    description: parseString(object.description),
    specialist: parseString(object.specialist),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    diagnosisCodes: parseList(object.diagnosisCodes),
    type: 'OccupationalHealthcare',
    employerName: parseString(object.employerName),
    sickLeave: {
      startDate: parseDate(object.sickLeave.startDate),
      endDate: parseDate(object.sickLeave.endDate),
    }
  };
  console.log('poo');
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toHealthCheckEntry = (object: any): NewHealthCheckEntry => {
  const newEntry: NewHealthCheckEntry = {
    description: parseString(object.description),
    specialist: parseString(object.specialist),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    diagnosisCodes: parseList(object.diagnosisCodes),
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
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

const isList = (list: any): list is Array<string> => {
  return list.constructor === Array;
};

const parseList = (list: any): Array<string> => {
  if (!list || !isList(list)) {
    throw new Error(`Incorrect or missing field: ${list}`);
  }
  return list;
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

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect of missing Health Check Rating: ${rating}`);
  }
  return rating;
};