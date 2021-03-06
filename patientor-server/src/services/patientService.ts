/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import patients from '../../data/patients';
import { Patient, NewPatientEntry, Entry, NewEntry } from '../types';

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

const addEntry = (id: string, entry: Omit<NewEntry, 'date'>) => {
  let stringdd = '';
  let stringmm = '';
  const today = new Date();
  const dd = today.getDate();
  if (dd < 10) {
    stringdd = `0${dd}`;
  } else {
    stringdd = String(dd);
  }
  const mm = today.getMonth() + 1;
  if (mm < 10) {
    stringmm = `0${mm}`;
  } else {
    stringmm = String(mm);
  }
  const yyyy = today.getFullYear();
  const newEntry = {
    ...entry,
    id: String(Date.now()),
    date: `${yyyy}-${stringmm}-${stringdd}`
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