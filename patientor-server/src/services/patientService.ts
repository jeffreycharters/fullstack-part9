/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import patients from '../../data/patients';
import { Patient, NewPatientEntry } from '../types';

const getEntries = (): Array<Patient> => {
  console.log(patients[0]);
  return patients;
};

const getNonSensitiveEntries = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
    ssn
  }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addPatient = (object: any): NewPatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatientEntry = {
    ...object,
    id: String(Date.now())
  };
  patients.push(newPatientEntry);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
};