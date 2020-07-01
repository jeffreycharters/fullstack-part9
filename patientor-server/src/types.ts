export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface LeaveDates {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCare extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: LeaveDates;
}

export interface DischargeInfo {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: DischargeInfo;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCare
  | HealthCheckEntry;


export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NewEntry = Omit<Entry, 'id'>;