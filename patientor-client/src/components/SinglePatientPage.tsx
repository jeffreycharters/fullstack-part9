import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useStateValue } from '../state'

import 'semantic-ui-css/semantic.min.css'

import { Patient, Gender } from '../types'
import { apiBaseUrl } from '../constants'

const SinglePatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
      } catch (e) {
        console.error(e);
      }
    }
    fetchPatient();
  }, [id])

  let patient = undefined
  if (Object.values(patients).map(p => p.id).includes(id)) {
    patient = patients[id]
  }

  console.log(patient)

  if (patient !== undefined) {
    return <div>
      <h2>{patient.name} - <i className={patient.gender === Gender.Male ? 'mars icon' : patient.gender === Gender.Female ? 'venus icon' : ''}></i></h2>

      <strong>Date of Birth: {patient.dateOfBirth}<br />
      occupation: {patient.occupation}</strong>
    </div>
  }
  else {
    return <h2>No such patient..</h2>
  }
}

export default SinglePatientPage;