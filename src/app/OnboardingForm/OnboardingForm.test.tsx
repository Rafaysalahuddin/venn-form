import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OnboardingForm from "./OnboardingForm";

let mockHandleSubmit = jest.fn();
jest.mock("../../hooks/useSubmitOnboardingForm.ts", () => () => ({
  handleSubmit: mockHandleSubmit,
  submissionMessage: null,
}));

jest.mock("../../hooks/useValidateCorporationNumber.ts", () => () => undefined);

describe("OnboardingForm", () => {
  test("renders all form fields", () => {
    render(<OnboardingForm />);

    expect(screen.getByTestId("first-name")).toBeInTheDocument();
    expect(screen.getByTestId("last-name")).toBeInTheDocument();
    expect(screen.getByTestId("phone-number")).toBeInTheDocument();
    expect(screen.getByTestId("corporation-number")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("submission calls useSubmitOnboardingForm handleSubmit", async () => {
    render(<OnboardingForm />);

    fireEvent.change(screen.getByTestId("first-name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("phone-number"), {
      target: { value: "+14165551234" },
    });
    fireEvent.change(screen.getByTestId("corporation-number"), {
      target: { value: "123456789" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("loading-circle")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
