import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import InputWrapper from '../../../common/components/forms/InputWrapper';

const validationSchema = Yup.object().shape({
  company_name: Yup.string()
    .trim()
    .max(255)
    .required('Please the company name'),
  street: Yup.string()
    .trim()
    .max(64),
  street2: Yup.string()
    .trim()
    .max(64),
  city: Yup.string()
    .trim()
    .max(64),
  state: Yup.string()
    .trim()
    .max(2),
  cross_streets: Yup.string()
    .trim()
    .max(255),
  website: Yup.string()
    .url()
    .max(64),
  linkedin: Yup.string()
    .trim()
    .max(64),
  twitter: Yup.string()
    .trim()
    .max(64),
  facebook: Yup.string()
    .trim()
    .max(64),
  description: Yup.string().trim(),
  notes: Yup.string().trim(),
});

class AddCompany extends Component {
  static propTypes = {};

  renderForm = ({ touched, errors, isSubmitting }) => (
    <Form>
      <div>
        <InputWrapper label="Company Name" required validation={touched.email && errors.email}>
          <Field name="company_name" maxLength="255" />
        </InputWrapper>
      </div>
      <div>
        <div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Login
          </button>
        </div>
      </div>
    </Form>
  );

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          this.props.onSubmit(values).then(action => {
            actions.setSubmitting(false);
          });
        }}
        render={this.renderForm}
      />
    );
  }
}

export default AddCompany;
