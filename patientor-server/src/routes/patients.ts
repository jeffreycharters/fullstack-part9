import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entry: NewPatientEntry = req.body;
  if (patient) {
    const addEntry = patientService.addEntry(patient.id, entry);
    res.json(addEntry);
  } else {
    res.sendStatus(404);
  }
});

export default router;