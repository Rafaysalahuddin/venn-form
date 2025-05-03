export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

export interface FormFieldProps {
  name: string;
  label: string;
  testId: string;
  validate?: (value: string) => Promise<any>;
}
