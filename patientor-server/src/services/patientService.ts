/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import patients from '../../data/patients';
import { Patient, NewPatientEntry, Entry } from '../types';

const getEntries = (): Array<Patient> => {
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

const addEntry = (id: string, entry: NewPatientEntry) => {
  const newEntry = {
    ...entry,
    id: String(Date.now())
  };
  const patient = patients.find(p => p.id === id);
  console.log(patient);
  patient?.entries.push(newEntry as unknown as Entry);
  return { newEntry };
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};