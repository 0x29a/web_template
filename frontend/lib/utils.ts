import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { UseFormSetError, Path } from "react-hook-form";

type DjangoFieldsErrorData = {
  [key: string]: string[];
};

type MutationResult<ValidResult> =
  | { data: ValidResult }
  | { error?: FetchBaseQueryError | SerializedError | undefined };

export const setFieldErrors = <FormInputs, ValidResult>(
  setError: UseFormSetError<FormInputs>,
  result: MutationResult<ValidResult>
) => {
  if ("error" in result && result.error !== undefined && "data" in result.error) {
    const data = result.error.data as DjangoFieldsErrorData;
    for (const fieldName in data) {
      const errors = data[fieldName];
      if (errors.length) {
        setError(fieldName as Path<FormInputs>, { type: "custom", message: errors.join("|") });
      }
    }
  }
};

export const setFieldErrorsCallback = <FormInputs, ValidResult>(setError: UseFormSetError<FormInputs>) => {
  return (result: MutationResult<ValidResult>) => {
    setFieldErrors<FormInputs, ValidResult>(setError, result);
  };
};

// Tailwind classes for an invalid input.
export const invalid = "!border-red-300 focus:!border-red-500";
