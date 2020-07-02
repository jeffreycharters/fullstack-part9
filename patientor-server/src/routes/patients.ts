/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toHospitalEntry, toOccupationalEntry, toHealthCheckEntry } from '../utils';

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
  if (!patient) {
    res.sendStatus(404);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entry = req.body;
  try {
    switch (entry.type) {
      case 'Hospital':
        const hospitalEntry = toHospitalEntry(entry);
        if (patient) { res.json(patientService.addEntry(patient.id, hospitalEntry)); }
        break;
      case 'OccupationalHealthcare':
        const occupationalEntry = toOccupationalEntry(entry);
        if (patient) {
          res.json(patientService.addEntry(patient.id, occupationalEntry));
        }
        break;
      case 'HealthCheck':
        const healthCheckEntry = toHealthCheckEntry(entry);
        if (patient) {
          res.json(patientService.addEntry(patient.id, healthCheckEntry));
        }
        break;
      default:
        throw new Error(`Invalid type`);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;