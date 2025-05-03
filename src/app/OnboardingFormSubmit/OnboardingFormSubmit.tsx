import React from "react";
import "./OnboardingFormSubmit.css";
import copy from "../../constants/copy";
import { ClipLoader } from "react-spinners";

interface OnboardingFormSubmitProps {
  isSubmitting: boolean;
  isValid: boolean;
  submissionMessage: string | null;
}

const { SUBMIT_BUTTON_TEXT } = copy;

const OnboardingFormSubmit: React.FC<OnboardingFormSubmitProps> = ({
  isSubmitting,
  isValid,
  submissionMessage,
}) => {
  const className = `${"submitButton"} ${"border"} ${
    isValid ? "" : "disabled"
  }`;

  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        data-testid="submit-button"
        className={className}
      >
        {isSubmitting ? (
          <ClipLoader
            loading={true}
            size={20}
            color="#ffffff"
            data-testid="loading-circle"
          />
        ) : (
          SUBMIT_BUTTON_TEXT
        )}
      </button>
      {submissionMessage && <p>{submissionMessage}</p>}
    </>
  );
};

export default OnboardingFormSubmit;
