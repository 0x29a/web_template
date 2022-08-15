import { api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginCreate: build.mutation<LoginCreateApiResponse, LoginCreateApiArg>({
      query: (queryArg) => ({
        url: `/auth/login/`,
        method: "POST",
        body: queryArg.login,
      }),
    }),
    logoutCreate: build.mutation<LogoutCreateApiResponse, LogoutCreateApiArg>({
      query: () => ({ url: `/auth/logout/`, method: "POST" }),
    }),
    passwordChangeCreate: build.mutation<
      PasswordChangeCreateApiResponse,
      PasswordChangeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/password/change/`,
        method: "POST",
        body: queryArg.passwordChange,
      }),
    }),
    passwordResetCreate: build.mutation<
      PasswordResetCreateApiResponse,
      PasswordResetCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/password/reset/`,
        method: "POST",
        body: queryArg.passwordReset,
      }),
    }),
    passwordResetConfirmCreate: build.mutation<
      PasswordResetConfirmCreateApiResponse,
      PasswordResetConfirmCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/password/reset/confirm/`,
        method: "POST",
        body: queryArg.passwordResetConfirm,
      }),
    }),
    registrationCreate: build.mutation<
      RegistrationCreateApiResponse,
      RegistrationCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/registration/`,
        method: "POST",
        body: queryArg.register,
      }),
    }),
    registrationResendEmailCreate: build.mutation<
      RegistrationResendEmailCreateApiResponse,
      RegistrationResendEmailCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/registration/resend-email/`,
        method: "POST",
        body: queryArg.resendEmailVerification,
      }),
    }),
    registrationVerifyEmailCreate: build.mutation<
      RegistrationVerifyEmailCreateApiResponse,
      RegistrationVerifyEmailCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/registration/verify-email/`,
        method: "POST",
        body: queryArg.verifyEmail,
      }),
    }),
    userRetrieve: build.query<UserRetrieveApiResponse, UserRetrieveApiArg>({
      query: () => ({ url: `/auth/user/` }),
    }),
    userUpdate: build.mutation<UserUpdateApiResponse, UserUpdateApiArg>({
      query: (queryArg) => ({
        url: `/auth/user/`,
        method: "PUT",
        body: queryArg.userDetails,
      }),
    }),
    userPartialUpdate: build.mutation<
      UserPartialUpdateApiResponse,
      UserPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/user/`,
        method: "PATCH",
        body: queryArg.patchedUserDetails,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as backendApi };
export type LoginCreateApiResponse = /** status 200  */ Token;
export type LoginCreateApiArg = {
  login: Login;
};
export type LogoutCreateApiResponse = /** status 200  */ RestAuthDetail;
export type LogoutCreateApiArg = void;
export type PasswordChangeCreateApiResponse = /** status 200  */ RestAuthDetail;
export type PasswordChangeCreateApiArg = {
  passwordChange: PasswordChange;
};
export type PasswordResetCreateApiResponse = /** status 200  */ RestAuthDetail;
export type PasswordResetCreateApiArg = {
  passwordReset: PasswordReset;
};
export type PasswordResetConfirmCreateApiResponse =
  /** status 200  */ RestAuthDetail;
export type PasswordResetConfirmCreateApiArg = {
  passwordResetConfirm: PasswordResetConfirm;
};
export type RegistrationCreateApiResponse = /** status 201  */ Token;
export type RegistrationCreateApiArg = {
  register: Register;
};
export type RegistrationResendEmailCreateApiResponse =
  /** status 201  */ RestAuthDetail;
export type RegistrationResendEmailCreateApiArg = {
  resendEmailVerification: ResendEmailVerification;
};
export type RegistrationVerifyEmailCreateApiResponse =
  /** status 200  */ RestAuthDetail;
export type RegistrationVerifyEmailCreateApiArg = {
  verifyEmail: VerifyEmail;
};
export type UserRetrieveApiResponse = /** status 200  */ UserDetails;
export type UserRetrieveApiArg = void;
export type UserUpdateApiResponse = /** status 200  */ UserDetails;
export type UserUpdateApiArg = {
  userDetails: UserDetails;
};
export type UserPartialUpdateApiResponse = /** status 200  */ UserDetails;
export type UserPartialUpdateApiArg = {
  patchedUserDetails: PatchedUserDetails;
};
export type Token = {
  key: string;
};
export type Login = {
  username?: string;
  email?: string;
  password: string;
};
export type RestAuthDetail = {
  detail: string;
};
export type PasswordChange = {
  new_password1: string;
  new_password2: string;
};
export type PasswordReset = {
  email: string;
};
export type PasswordResetConfirm = {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
};
export type Register = {
  username: string;
  email?: string;
  password1: string;
  password2: string;
};
export type ResendEmailVerification = {
  email?: string;
};
export type VerifyEmail = {
  key: string;
};
export type UserDetails = {
  pk: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
};
export type PatchedUserDetails = {
  pk?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
};
export const {
  useLoginCreateMutation,
  useLogoutCreateMutation,
  usePasswordChangeCreateMutation,
  usePasswordResetCreateMutation,
  usePasswordResetConfirmCreateMutation,
  useRegistrationCreateMutation,
  useRegistrationResendEmailCreateMutation,
  useRegistrationVerifyEmailCreateMutation,
  useUserRetrieveQuery,
  useUserUpdateMutation,
  useUserPartialUpdateMutation,
} = injectedRtkApi;
