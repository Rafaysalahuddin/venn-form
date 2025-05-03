import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required").max(50),
  lastName: Yup.string().required("Required").max(50),
  phone: Yup.string()
    .matches(/^\+1\d{10}$/, "Must be Canadian and start with +1")
    .required("Required"),
  corporationNumber: Yup.string()
    .length(9, "Must be exactly 9 digits")
    .required("Required"),
});

const OnboardingForm: React.FC = () => {
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  const validateCorporationNumber = async (value: string) => {
    if (!value || value.length !== 9) return;
    try {
      const res = await axios.get(
        `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${value}`
      );
      if (!res.data.valid) {
        return res.data.message || "Invalid corporation number";
      }
    } catch {
      return "Validation failed";
    }
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    const corpValidationError = await validateCorporationNumber(
      values.corporationNumber
    );
    if (corpValidationError) {
      setErrors({ corporationNumber: corpValidationError });
      setSubmitting(false);
      return;
    }

    try {
      await axios.post(
        "https://fe-hometask-api.qa.vault.tryvault.com/profile-details",
        values
      );
      setSubmissionMessage("✅ Form submitted successfully!");
    } catch (err: any) {
      setSubmissionMessage(
        err?.response?.data?.message || "❌ Submission failed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        firstName: "",
        lastName: "",
        phone: "",
        corporationNumber: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <Field name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>

          <div>
            <label htmlFor="corporationNumber">Corporation Number</label>
            <Field
              name="corporationNumber"
              validate={validateCorporationNumber}
            />
            <ErrorMessage name="corporationNumber" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>

          {submissionMessage && <p>{submissionMessage}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default OnboardingForm;
