import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import stateOptions from '../../../common/lib/state-options';

import InputWrapper from '../../../common/components/forms/InputWrapper';

const validationSchema = Yup.object().shape({
  company_name: Yup.string()
    .trim()
    .max(255)
    .required('Please the company name'),
  street: Yup.string()
    .trim()
    .max(255),
  street2: Yup.string()
    .trim()
    .max(255),
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
    .max(255),
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
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
  };

  renderForm = ({ touched, errors, isSubmitting }) => (
    <Form className="company-form__form">
      <div>
        <div className="company-form__form-section">
          <h1>New Company</h1>
          <InputWrapper label="Company Name" required validation={touched.company_name && errors.company_name}>
            <Field name="company_name" maxLength="255" />
          </InputWrapper>
          <InputWrapper label="Website" required validation={touched.website && errors.website}>
            <Field name="website" maxLength="255" />
          </InputWrapper>
        </div>
        <div className="company-form__form-section">
          <h3>Location</h3>
          <InputWrapper label="Address" required validation={touched.street && errors.street}>
            <Field name="street" maxLength="255" />
          </InputWrapper>
          <InputWrapper required validation={touched.street2 && errors.street2}>
            <Field name="street2" maxLength="255" />
          </InputWrapper>
          <div className="company-form__form-double">
            <InputWrapper
              label="City"
              required
              validation={touched.city && errors.city}
              className="company-form__form-city"
            >
              <Field name="city" maxLength="64" />
            </InputWrapper>
            <InputWrapper
              label="State"
              required
              validation={touched.state && errors.state}
              className="company-form__form-state"
            >
              <Field name="state" component="select">
                <option value="">State...</option>
                {stateOptions.map(state => (
                  <option value={state.value}>{state.label}</option>
                ))}
              </Field>
            </InputWrapper>
          </div>
          <InputWrapper label="Cross Streets" required validation={touched.cross_streets && errors.cross_streets}>
            <Field name="cross_streets" maxLength="255" />
          </InputWrapper>
        </div>
        <div className="company-form__form-section">
          <h3>Social</h3>
          <InputWrapper label="LinkedIn" required validation={touched.linkedin && errors.linkedin}>
            <Field name="linkedin" maxLength="255" />
          </InputWrapper>
          <InputWrapper label="Twitter" required validation={touched.twitter && errors.twitter}>
            <Field name="twitter" maxLength="255" />
          </InputWrapper>
          <InputWrapper label="Facebook" required validation={touched.facebook && errors.facebook}>
            <Field name="facebook" maxLength="255" />
          </InputWrapper>
        </div>
      </div>
      <div>
        <div className="company-form__form-section__right">
          <InputWrapper label="Overview" required validation={touched.description && errors.description}>
            <Field name="description" component="textarea" />
          </InputWrapper>
          <InputWrapper label="My Notes" required validation={touched.notes && errors.notes}>
            <Field name="notes" component="textarea" />
          </InputWrapper>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </div>
    </Form>
  );

  render() {
    const { onSubmit, onSuccess } = this.props;
    return (
      <Formik
        initialValues={{
          company_name: '',
          street: '',
          street2: '',
          city: '',
          state: '',
          cross_streets: '',
          website: '',
          linkedin: '',
          twitter: '',
          facebook: '',
          description: '',
          notes: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values).then(action => {
            if (action.response.ok) {
              onSuccess();
            }
            actions.setSubmitting(false);
          });
        }}
        render={this.renderForm}
      />
    );
  }
}

export default AddCompany;
