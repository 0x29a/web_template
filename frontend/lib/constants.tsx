export const PROTECTED_PAGES: { [key: string]: { access: "public" | "private"; redirect: string } } = {
  "/sign-in": { access: "public", redirect: "/" },
  "/register": { access: "public", redirect: "/" },
};
