# Venn Onboarding Form

This project implements a user onboarding form with validation, submission logic, and custom hook testing. It uses React, Formik, Yup, and Jest with React Testing Library.

## 🛠 Tech Stack

- **React + TypeScript**
- **Formik** for form state management
- **Yup** for schema-based validation
- **Axios** for HTTP requests
- **Jest + React Testing Library** for testing
- **identity-obj-proxy** for CSS module mocking in tests

## ✅ Features

- Field-level validation with meaningful error messages
- Corporation number async validation via API
- Custom `useSubmitOnboardingForm` and `useValidateCorporationNumber` hooks
- Reusable `FormField` abstraction
- Test coverage for edge cases and network errors

## 🚀 Getting Started

Install dependencies and start the app:

```bash
npm install
npm run dev
```
