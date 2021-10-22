import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  renderError = ({error, touched}) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  // callback - render input on field
  renderInput = ({
    input,
    label,
    type,
    meta
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} />
        {this.renderError(meta)}
      </div>
    )
  }

  // argument formValues here is passed via redux-form library
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field
          type="text"
          label="Enter Title"
          component={this.renderInput} name="title"
        />
        <Field
          type="text"
          label="Enter Description"
          component={this.renderInput} name="description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

// form validation
const validate = (formProps) => {
  const errors = {};

  if (!formProps.title) {
    errors.title = 'You must enter a title';
  }

  if (!formProps.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
}

// wireup our usual connect function and redux-form
export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
