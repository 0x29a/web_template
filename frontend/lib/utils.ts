import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

type DjangoFieldsErrorData = {
  [key: string]: string[];
};

type MutationResult<ValidResult> =
  | { data: ValidResult }
  | { error?: FetchBaseQueryError | SerializedError | undefined };

// Processes errors in Django's format and sets errors for the respective fields.
export function setFieldErrors<FormInputs extends FieldValues, ValidResult>(
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

export const setFieldErrorsCallback = <FormInputs extends FieldValues, ValidResult>(
  setError: UseFormSetError<FormInputs>
) => {
  return (result: MutationResult<ValidResult>) => {
    setFieldErrors<FormInputs, ValidResult>(setError, result);
  };
};

// Tailwind classes for an invalid input.
export const invalid = "!border-red-300 focus:!border-red-500";

// https://docs.djangoproject.com/en/4.0/ref/csrf/#ajax
export function getCookie(name: string): string {
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
