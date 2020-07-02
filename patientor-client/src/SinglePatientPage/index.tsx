import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useStateValue, setPatientList } from '../state'

import { Card, Icon } from 'semantic-ui-react'

import HospitalEntryForm, { HospitalEntryFormValues } from './HospitalEntryForm'
import OccupationalEntryForm, { OccupationalEntryFormValues } from './OccupationalEntryForm'
import HealthCheckEntryForm, { HealthCheckEntryFormValues } from './HealthCheckEntryForm'

import { Patient, Gender, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types'
import { apiBaseUrl } from '../constants'

const SinglePatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [hospitalFormVisible, setHospitalFormVisible] = useState(false);
  const [occupationalFormVisible, setOccupationalFormVisible] = useState(false);
  const [healthCheckFormVisible, setHealthCheckFormVisible] = useState(false);

  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (patients[id]) {
      return
    }
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientList([patientFromApi]));
      } catch (e) {
        console.error(e);
      }
    }
    fetchPatient();
  }, [patients, dispatch, id])

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  const HospitalDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return <div>
      <Card style={{ minWidth: '700px', margin: '10px' }}>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name='hospital' style={{ fontSize: '35px' }} />
          </Card.Header>
          <Card.Description>
            {entry.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Discharged {entry.discharge.date}: {entry.discharge.criteria}
        </Card.Content>
      </Card>
    </div>
  }

  const OccupationalHealthcareDetail: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return <div>
      <Card style={{ minWidth: '700px', margin: '10px' }}>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name='stethoscope' style={{ fontSize: '35px' }} /> {entry.employerName}
          </Card.Header>
          <Card.Description>
            {entry.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  }

  const HealthCheckDetail: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const heartColour = (healthRating: number) => {
      switch (healthRating) {
        case 0: return 'darkseagreen';
        case 1: return 'khaki';
        case 2: return 'lightsalmon';
        case 3: return 'indianred';
      }
    }
    return <div>
      <Card style={{ minWidth: '700px', margin: '10px' }}>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name='user md' style={{ fontSize: '35px' }} />
          </Card.Header>
          <Card.Description>
            <Icon name='heart' style={{ color: heartColour(entry.healthCheckRating) }} />
            {entry.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  }

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalDetail entry={entry} />
      case "OccupationalHealthcare":
        return <OccupationalHealthcareDetail entry={entry} />
      case "HealthCheck":
        return <HealthCheckDetail entry={entry} />
      default:
        return assertNever(entry);
    }
  };


  let patient: Patient | undefined = undefined
  if (Object.values(patients).map(p => p.id).includes(id)) {
    patient = patients[id]
  }

  const doNothing = (): void => {
    setHospitalFormVisible(false);
    setOccupationalFormVisible(false);
    setHealthCheckFormVisible(false);
  }

  const hospitalButtonHandler = () => {
    setHospitalFormVisible(true);
    setOccupationalFormVisible(false);
    setHealthCheckFormVisible(false);
  }

  const occupationalButtonHandler = () => {
    setHospitalFormVisible(false);
    setOccupationalFormVisible(true);
    setHealthCheckFormVisible(false);
  }
  const healthCheckButtonHandler = () => {
    setHospitalFormVisible(false);
    setOccupationalFormVisible(false);
    setHealthCheckFormVisible(true);
  }

  if (patient !== undefined) {
    const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
      try {
        const patientId = patient ? patient.id : null
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          values
        );
        console.log(newEntry)
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };

    const submitNewOccupationalEntry = async (values: OccupationalEntryFormValues) => {
      try {
        const patientId = patient ? patient.id : null
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          values
        );
        console.log(newEntry)
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    }

    const submitNewHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
      try {
        const patientId = patient ? patient.id : null
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          values
        );
        console.log(newEntry)
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };

    return <div>
      <h2>{patient.name} <i className={patient.gender === Gender.Male ? 'mars icon' : patient.gender === Gender.Female ? 'venus icon' : ''}></i></h2>

      <strong>Date of Birth: {patient.dateOfBirth}<br />
      occupation: {patient.occupation}</strong>

      <h3>Entries</h3>

      {patient.entries.map(e => <EntryDetails entry={e} key={e.id} />)}

      <h3>Add new entry for this patient</h3>
      <div>
        <button onClick={hospitalButtonHandler}>Hospital Stay</button>{' '}
        <button onClick={occupationalButtonHandler}>Occupational Visit</button>{' '}
        <button onClick={healthCheckButtonHandler}>Health Check</button>
      </div>
      <br />
      {hospitalFormVisible && <HospitalEntryForm onSubmit={submitNewHospitalEntry} onCancel={doNothing} />}
      {occupationalFormVisible && <OccupationalEntryForm onSubmit={submitNewOccupationalEntry} onCancel={doNothing} />}
      {healthCheckFormVisible && <HealthCheckEntryForm onSubmit={submitNewHealthCheckEntry} onCancel={doNothing} />}

    </div>
  }

  else {
    return <h2>No such patient..</h2>
  }
}

export default SinglePatientPage;