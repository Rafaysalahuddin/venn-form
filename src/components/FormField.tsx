import React from "react";
import { Field, ErrorMessage } from "formik";
import "./FormField.css";
import { FormFieldProps } from "../types/types";

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  validate,
  testId,
}) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <Field
        name={name}
        validate={validate}
        className="border"
        data-testid={testId}
      />
      <div className="errorWrapper">
        <ErrorMessage name={name} component="div" className="error" />
      </div>
    </div>
  );
};

export default FormField;
