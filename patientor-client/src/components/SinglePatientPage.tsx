import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useStateValue, setPatientList } from '../state'

import { Card, Icon } from 'semantic-ui-react'

import { Patient, Gender, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types'
import { apiBaseUrl } from '../constants'

const SinglePatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

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


  let patient = undefined
  if (Object.values(patients).map(p => p.id).includes(id)) {
    patient = patients[id]
  }

  if (patient !== undefined) {
    return <div>
      <h2>{patient.name} <i className={patient.gender === Gender.Male ? 'mars icon' : patient.gender === Gender.Female ? 'venus icon' : ''}></i></h2>

      <strong>Date of Birth: {patient.dateOfBirth}<br />
      occupation: {patient.occupation}</strong>

      <h3>Entries</h3>

      { /*
        patient.entries.map(e => {
          return <div key={`${e.date}`}>
            <div>{e.date}: <em>{e.description}</em></div>
            <ul>
              <div>{e.diagnosisCodes && e.diagnosisCodes.map(c => {
                return <li key={`${c}${e.date}`}>{c} {diagnoses[c] ? diagnoses[c].name : null}</li>
              }
              )}
              </div>
            </ul>
          </div>
        })
      */ }

      {
        patient.entries.map(e => <EntryDetails entry={e} key={e.date} />)
      }

    </div>
  }
  else {
    return <h2>No such patient..</h2>
  }
}

export default SinglePatientPage;