import { useState } from "react";
import axios from "axios";
import { FormikHelpers } from "formik";
import useValidateCorporationNumber from "./useValidateCorporationNumber";
import copy from "../constants/copy";
import { OnboardingFormValues } from "../types/types";

const { SUBMIT_SUCCESS_MESSAGE, SUBMIT_FAILURE_MESSAGE } = copy;

const useSubmitOnboardingForm = () => {
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );
  const validateCorporationNumber = useValidateCorporationNumber();

  const handleSubmit = async (
    values: OnboardingFormValues,
    { setSubmitting, setErrors }: FormikHelpers<OnboardingFormValues>
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
      setSubmissionMessage(SUBMIT_SUCCESS_MESSAGE);
    } catch (err: any) {
      setSubmissionMessage(
        err?.response?.data?.message || SUBMIT_FAILURE_MESSAGE
      );
    } finally {
      setSubmitting(false);
    }
  };

  return { handleSubmit, submissionMessage };
};

export default useSubmitOnboardingForm;
