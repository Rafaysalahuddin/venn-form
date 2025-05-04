import * as Yup from "yup";
import { phoneRegex } from "../../helpers/phoneNumberValidationRegex";
import copy from "../../constants/copy";

const {
  INVALID_PHONE_NUMBER_ERROR,
  INVALID_CORPORATION_NUMBER_LENGTH_ERROR,
  INVALID_CORPORATION_NUMBER_ERROR,
  REQUIRED,
  NAME_LENGTH_ERROR,
} = copy;

export default Yup.object().shape({
  firstName: Yup.string().required(REQUIRED).max(50, NAME_LENGTH_ERROR),
  lastName: Yup.string().required(REQUIRED).max(50, NAME_LENGTH_ERROR),
  phone: Yup.string()
    .matches(phoneRegex, INVALID_PHONE_NUMBER_ERROR)
    .required(REQUIRED),
  corporationNumber: Yup.string()
    .length(9, INVALID_CORPORATION_NUMBER_LENGTH_ERROR)
    .required(INVALID_CORPORATION_NUMBER_ERROR),
});
