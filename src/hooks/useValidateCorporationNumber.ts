import axios from "axios";
import copy from "../constants/copy";

const { INVALID_CORPORATION_NUMBER_ERROR, VALIDATION_FAILED } = copy;

const useValidateCorporationNumber = () => {
  return async (value: string): Promise<string | void> => {
    if (!value || value.length !== 9) return;
    try {
      const res = await axios.get(
        `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${value}`
      );
      if (!res.data.valid) {
        return res.data.message || INVALID_CORPORATION_NUMBER_ERROR;
      }
    } catch (error: any) {
      const message = error.response?.data?.message;
      return message || VALIDATION_FAILED;
    }
  };
};

export default useValidateCorporationNumber;
