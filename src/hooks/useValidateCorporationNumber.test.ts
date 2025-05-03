import { renderHook } from "@testing-library/react";
import useValidateCorporationNumber from "./useValidateCorporationNumber";
import axios from "axios";
import copy from "../constants/copy";

const { INVALID_CORPORATION_NUMBER_ERROR, VALIDATION_FAILED } = copy;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNumber = "123456789";

describe("useValidateCorporationNumber", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("skips validation and returns undefined for empty input", async () => {
    const { result } = renderHook(() => useValidateCorporationNumber());
    const output = await result.current("");
    expect(output).toBeUndefined();
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it("skips validation and returns undefined for input shorter than 9 digits", async () => {
    const { result } = renderHook(() => useValidateCorporationNumber());
    const output = await result.current("123");
    expect(output).toBeUndefined();
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it("returns undefined and calls API when corporation number is valid", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { valid: true } });

    const { result } = renderHook(() => useValidateCorporationNumber());
    const output = await result.current(mockNumber);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/123456789")
    );
    expect(output).toBeUndefined();
  });

  it("returns API message when corporation number is invalid and message is provided", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { valid: false, message: "Invalid corporation number" },
    });

    const { result } = renderHook(() => useValidateCorporationNumber());
    const output = await result.current(mockNumber);

    expect(output).toBe(INVALID_CORPORATION_NUMBER_ERROR);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it("returns 'Validation failed' if the API call throws", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useValidateCorporationNumber());
    const output = await result.current(mockNumber);

    expect(output).toBe(VALIDATION_FAILED);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
