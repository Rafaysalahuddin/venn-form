import { renderHook, act } from "@testing-library/react";
import useSubmitOnboardingForm from "./useSubmitOnboardingForm";
import axios from "axios";
import copy from "../constants/copy";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockValidateCorporationNumber = jest.fn().mockResolvedValue(undefined);

jest.mock(
  "./useValidateCorporationNumber",
  () => () => mockValidateCorporationNumber
);

const { SUBMIT_SUCCESS_MESSAGE, SUBMIT_FAILURE_MESSAGE } = copy;

describe("useSubmitOnboardingForm", () => {
  const values = {
    firstName: "John",
    lastName: "Doe",
    phone: "+14165551234",
    corporationNumber: "123456789",
  };

  const helpers = {
    setSubmitting: jest.fn(),
    setErrors: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits form successfully and sets success message", async () => {
    mockedAxios.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useSubmitOnboardingForm());

    await act(async () => {
      await result.current.handleSubmit(values, helpers as any);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://fe-hometask-api.qa.vault.tryvault.com/profile-details",
      values
    );
    expect(result.current.submissionMessage).toBe(SUBMIT_SUCCESS_MESSAGE);
    expect(helpers.setSubmitting).toHaveBeenCalledWith(false);
  });

  it("sets form error if corporation number is invalid", async () => {
    mockValidateCorporationNumber.mockResolvedValueOnce(
      "Invalid corporation number"
    );

    const { result } = renderHook(() => useSubmitOnboardingForm());

    await act(async () => {
      await result.current.handleSubmit(values, helpers as any);
    });

    expect(helpers.setErrors).toHaveBeenCalledWith({
      corporationNumber: "Invalid corporation number",
    });
    expect(helpers.setSubmitting).toHaveBeenCalledWith(false);
  });

  it("sets failure message on axios error", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: "API error" } },
    });

    const { result } = renderHook(() => useSubmitOnboardingForm());

    await act(async () => {
      await result.current.handleSubmit(values, helpers as any);
    });

    expect(result.current.submissionMessage).toBe("API error");
    expect(helpers.setSubmitting).toHaveBeenCalledWith(false);
  });

  it("sets default failure message if axios error has no message", async () => {
    mockedAxios.post.mockRejectedValueOnce({});

    const { result } = renderHook(() => useSubmitOnboardingForm());

    await act(async () => {
      await result.current.handleSubmit(values, helpers as any);
    });

    expect(result.current.submissionMessage).toBe(SUBMIT_FAILURE_MESSAGE);
    expect(helpers.setSubmitting).toHaveBeenCalledWith(false);
  });
});
