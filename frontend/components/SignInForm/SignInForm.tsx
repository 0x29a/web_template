import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Token, useAuthLoginCreateMutation } from "../../lib/backendApi";
import { signIn } from "../../lib/slices/authSlice";
import { invalid, setFieldErrors } from "../../lib/utils";
import ButtonWithSpinner from "../ButtonWithSpinner/ButtonWithSpinner";

type FormInputs = {
  email: string;
  password: string;
  non_field_errors: string;
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    reValidateMode: "onSubmit",
    shouldUseNativeValidation: true,
  });

  const dispatch = useDispatch();
  const [login, loginResult] = useAuthLoginCreateMutation();
  const onSubmit = (data: FieldValues) =>
    login({
      login: {
        email: data.email,
        password: data.password,
      },
    }).then((result) => {
      setFieldErrors<FormInputs, Token>(setError, result);
      if ("data" in result) {
        dispatch(signIn());
      }
    });

  const emailField = register("email", { required: true });
  const passwordField = register("password", { required: true });
  register("non_field_errors");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`form-input w-full text-gray-800 outline-none ${errors.email && invalid}`}
            placeholder="Enter your email address"
            {...emailField}
          />
          {errors.email && <p className="mt-2 text-center text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
              Having trouble signing in?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            className={`form-input w-full text-gray-800 outline-none ${errors.password && invalid}`}
            placeholder="Enter your password"
            {...passwordField}
          />
          {errors.password && <p className="mt-2 text-center text-red-500">{errors.password.message}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <ButtonWithSpinner loading={loginResult.isLoading}>Sign In</ButtonWithSpinner>
        </div>
      </div>
      {errors.non_field_errors && <p className="mt-6 text-center text-red-500">{errors.non_field_errors.message}</p>}
    </form>
  );
}
