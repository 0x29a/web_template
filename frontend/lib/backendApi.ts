import { api } from "./api";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authLoginCreate: build.mutation<AuthLoginCreateApiResponse, AuthLoginCreateApiArg>({
      query: (queryArg) => ({ url: "/backend/auth/login/", method: "POST", body: queryArg.login }),
    }),
    authLogoutCreate: build.mutation<AuthLogoutCreateApiResponse, AuthLogoutCreateApiArg>({
      query: () => ({ url: "/backend/auth/logout/", method: "POST" }),
    }),
    authPasswordChangeCreate: build.mutation<AuthPasswordChangeCreateApiResponse, AuthPasswordChangeCreateApiArg>({
      query: (queryArg) => ({ url: "/backend/auth/password/change/", method: "POST", body: queryArg.passwordChange }),
    }),
    authPasswordResetCreate: build.mutation<AuthPasswordResetCreateApiResponse, AuthPasswordResetCreateApiArg>({
      query: (queryArg) => ({ url: "/backend/auth/password/reset/", method: "POST", body: queryArg.passwordReset }),
    }),
    authPasswordResetConfirmCreate: build.mutation<
      AuthPasswordResetConfirmCreateApiResponse,
      AuthPasswordResetConfirmCreateApiArg
    >({
      query: (queryArg) => ({
        url: "/backend/auth/password/reset/confirm/",
        method: "POST",
        body: queryArg.passwordResetConfirm,
      }),
    }),
    authRegistrationCreate: build.mutation<AuthRegistrationCreateApiResponse, AuthRegistrationCreateApiArg>({
      query: (queryArg) => ({ url: "/backend/auth/registration/", method: "POST", body: queryArg.register }),
    }),
    authRegistrationResendEmailCreate: build.mutation<
      AuthRegistrationResendEmailCreateApiResponse,
      AuthRegistrationResendEmailCreateApiArg
    >({
      query: (queryArg) => ({
        url: "/backend/auth/registration/resend-email/",
        method: "POST",
        body: queryArg.resendEmailVerification,
      }),
    }),
    authRegistrationVerifyEmailCreate: build.mutation<
      AuthRegistrationVerifyEmailCreateApiResponse,
      AuthRegistrationVerifyEmailCreateApiArg
    >({
      query: (queryArg) => ({
        url: "/backend/auth/registration/verify-email/",
        method: "POST",
        body: queryArg.verifyEmail,
      }),
    }),
    authSocialGoogleCreate: build.mutation<AuthSocialGoogleCreateApiResponse, AuthSocialGoogleCreateApiArg>({
      query: (queryArg) => ({ url: "/backend/auth/social/google/", method: "POST", body: queryArg.socialLogin }),
    }),
    authUserRetrieve: build.query<AuthUserRetrieveApiResponse, AuthUserRetrieveApiArg>({
      query: () => ({ url: "/backend/auth/user/" }),
    }),
    authUserUpdate: build.mutation<AuthUserUpdateApiResponse, AuthUserUpdateApiArg>({
      query: (queryArg) => ({ url: "/backend/auth/user/", method: "PUT", body: queryArg.userDetails }),
    }),
    authUserPartialUpdate: build.mutation<AuthUserPartialUpdateApiResponse, AuthUserPartialUpdateApiArg>({
      query: (queryArg) => ({ url: "/backend/auth/user/", method: "PATCH", body: queryArg.patchedUserDetails }),
    }),
    usersExampleList: build.query<UsersExampleListApiResponse, UsersExampleListApiArg>({
      query: () => ({ url: "/backend/users/example" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as backendApi };
export type AuthLoginCreateApiResponse = /** status 200  */ Token;
export type AuthLoginCreateApiArg = {
  login: Login;
};
export type AuthLogoutCreateApiResponse = /** status 200  */ RestAuthDetail;
export type AuthLogoutCreateApiArg = void;
export type AuthPasswordChangeCreateApiResponse = /** status 200  */ RestAuthDetail;
export type AuthPasswordChangeCreateApiArg = {
  passwordChange: PasswordChange;
};
export type AuthPasswordResetCreateApiResponse = /** status 200  */ RestAuthDetail;
export type AuthPasswordResetCreateApiArg = {
  passwordReset: PasswordReset;
};
export type AuthPasswordResetConfirmCreateApiResponse = /** status 200  */ RestAuthDetail;
export type AuthPasswordResetConfirmCreateApiArg = {
  passwordResetConfirm: PasswordResetConfirm;
};
export type AuthRegistrationCreateApiResponse = /** status 201  */ Token;
export type AuthRegistrationCreateApiArg = {
  register: Register;
};
export type AuthRegistrationResendEmailCreateApiResponse = /** status 201  */ RestAuthDetail;
export type AuthRegistrationResendEmailCreateApiArg = {
  resendEmailVerification: ResendEmailVerification;
};
export type AuthRegistrationVerifyEmailCreateApiResponse = /** status 200  */ RestAuthDetail;
export type AuthRegistrationVerifyEmailCreateApiArg = {
  verifyEmail: VerifyEmail;
};
export type AuthSocialGoogleCreateApiResponse = /** status 200  */ SocialLogin;
export type AuthSocialGoogleCreateApiArg = {
  socialLogin: SocialLogin;
};
export type AuthUserRetrieveApiResponse = /** status 200  */ UserDetails;
export type AuthUserRetrieveApiArg = void;
export type AuthUserUpdateApiResponse = /** status 200  */ UserDetails;
export type AuthUserUpdateApiArg = {
  userDetails: UserDetails;
};
export type AuthUserPartialUpdateApiResponse = /** status 200  */ UserDetails;
export type AuthUserPartialUpdateApiArg = {
  patchedUserDetails: PatchedUserDetails;
};
export type UsersExampleListApiResponse = /** status 200  */ User[];
export type UsersExampleListApiArg = void;
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
  email: string;
  password1: string;
  password2: string;
};
export type ResendEmailVerification = {
  email: string;
};
export type VerifyEmail = {
  key: string;
};
export type SocialLogin = {
  access_token?: string;
  code?: string;
  id_token?: string;
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
export type User = {
  email?: string;
};
export const {
  useAuthLoginCreateMutation,
  useAuthLogoutCreateMutation,
  useAuthPasswordChangeCreateMutation,
  useAuthPasswordResetCreateMutation,
  useAuthPasswordResetConfirmCreateMutation,
  useAuthRegistrationCreateMutation,
  useAuthRegistrationResendEmailCreateMutation,
  useAuthRegistrationVerifyEmailCreateMutation,
  useAuthSocialGoogleCreateMutation,
  useAuthUserRetrieveQuery,
  useLazyAuthUserRetrieveQuery,
  useAuthUserUpdateMutation,
  useAuthUserPartialUpdateMutation,
  useUsersExampleListQuery,
  useLazyUsersExampleListQuery,
} = injectedRtkApi;
