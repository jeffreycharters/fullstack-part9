import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";

import { useStateValue } from '../state';

export type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalEntryFormValues) => void;
  onCancel: () => void;
}

export const OccupationalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        specialist: "fgjgf",
        description: "",
        date: "",
        type: "OccupationalHealthcare",
        employerName: "",
        diagnosisCodes: [],
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Fix the date, you skid";
        const dateFormat = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!values.sickLeave.startDate) {
          errors.sickLeave = requiredError;
        }
        if (!values.sickLeave.endDate) {
          errors.sickLeave = requiredError;
        }
        if (values.sickLeave.endDate.length > 9 && !values.sickLeave.startDate.match(dateFormat)) {
          errors.sickLeave = `Start date: ${dateError}`;
        }
        if (values.sickLeave.endDate.length > 9 && !values.sickLeave.endDate.match(dateFormat)) {
          errors.sickLeave = `End date: ${dateError}`;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, errors }) => {
        return (
          <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            {errors.sickLeave}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalEntryForm;