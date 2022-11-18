import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { UseFormSetError, Path } from "react-hook-form";

type DjangoFieldsErrorData = {
  [key: string]: string[];
};

type MutationResult<ValidResult> =
  | { data: ValidResult }
  | { error?: FetchBaseQueryError | SerializedError | undefined };

// Processes errors in Django's format and sets errors for the respective fields.
export function setFieldErrors<FormInputs, ValidResult>(
  setError: UseFormSetError<FormInputs>,
  result: MutationResult<ValidResult>
) {
  if ("error" in result && result.error !== undefined && "data" in result.error) {
    const data = result.error.data as DjangoFieldsErrorData;
    for (const fieldName in data) {
      const errors = data[fieldName];
      if (Array.isArray(errors)) {
        if (errors.length) {
          setError(fieldName as Path<FormInputs>, { type: "custom", message: errors.join("|") });
        }
      } else if (fieldName === "detail") {
        // This can happen in case of the CSRF error, for example.
        setError("non_field_errors" as Path<FormInputs>, { type: "custom", message: errors });
      }
    }
  }
}

export const setFieldErrorsCallback = <FormInputs, ValidResult>(setError: UseFormSetError<FormInputs>) => {
  return (result: MutationResult<ValidResult>) => {
    setFieldErrors<FormInputs, ValidResult>(setError, result);
  };
};

// Tailwind classes for an invalid input.
export const invalid = "!border-red-300 focus:!border-red-500";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
