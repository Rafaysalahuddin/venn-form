import React from "react";
import { Formik, Form } from "formik";
import "./OnboardingForm.css";
import FormField from "../../components/FormField";
import validationSchema from "./validationSchema";
import useSubmitOnboardingForm from "../../hooks/useSubmitOnboardingForm";
import useValidateCorporationNumber from "../../hooks/useValidateCorporationNumber";
import copy from "../../constants/copy";
import OnboardingFormSubmit from "../OnboardingFormSubmit/OnboardingFormSubmit";
import { OnboardingFormValues } from "../../types/types";

const initialValues: OnboardingFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  corporationNumber: "",
};

const {
  STEP_NUMBER_TEXT,
  ONBOARDING_FORM,
  FIRST_NAME,
  LAST_NAME,
  PHONE_NUMBER,
  CORPORATION_NUMBER,
} = copy;

const OnboardingForm: React.FC = () => {
  const { handleSubmit, submissionMessage } = useSubmitOnboardingForm();
  const validateCorporationNumber = useValidateCorporationNumber();

  return (
    <div className="formContainer">
      <h2>{STEP_NUMBER_TEXT}</h2>
      <Formik<OnboardingFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
      >
        {({ isSubmitting, isValid }) => (
          <Form className="border">
            <h1>{ONBOARDING_FORM}</h1>
            <div className="nameFields">
              <FormField
                name="firstName"
                label={FIRST_NAME}
                testId="first-name"
              />
              <FormField name="lastName" label={LAST_NAME} testId="last-name" />
            </div>
            <FormField
              name="phone"
              label={PHONE_NUMBER}
              testId="phone-number"
            />
            <FormField
              name="corporationNumber"
              label={CORPORATION_NUMBER}
              validate={validateCorporationNumber}
              testId="corporation-number"
            />
            <OnboardingFormSubmit
              isSubmitting={isSubmitting}
              isValid={isValid}
              submissionMessage={submissionMessage}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OnboardingForm;
