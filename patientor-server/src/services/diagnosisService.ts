import diagnosisData from '../../data/diagnoses.json';

import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosisData as Array<DiagnosisEntry>;

const getEntries = (): Array<DiagnosisEntry> => {
  return diagnoses;
};

const addDiagnosis = (): null => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
}