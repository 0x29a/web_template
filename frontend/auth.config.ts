import type { NextAuthConfig } from 'next-auth';

import { authApi } from '@/lib/authapi';

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
    return Math.floor(new Date().getTime() / 1000);
};

type SignInHandler = (user: any, account: any, profile: any, email: any, credentials: any) => Promise<boolean>;

const SIGN_IN_HANDLERS: { [key: string]: SignInHandler } = {
    google: async (user, account, profile, email, credentials) => {
        try {
            const response = await authApi.authSocialGoogleCreate({
                socialLogin: {
                    accessToken: account.access_token,
                    idToken: account.id_token,
                }
            });
            account["meta"] = response;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
};

const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account) {
                if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;

                return SIGN_IN_HANDLERS[account.provider](
                    user, account, profile, email, credentials
                );
            }
        },
        async jwt({ token, user, account }) {
            console.log("jwt callback", { token: token, user: user, account: account });

            if (user && account) {
                let backendResponse = account.provider === "credentials" ? user : account.meta;
                token["user"] = backendResponse.user;
                token["access_token"] = backendResponse.access;
                token["refresh_token"] = backendResponse.refresh;
                token["expires"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
            } else if (getCurrentEpochTime() > token["expires"]) {
                const response = await authApi.authTokenRefreshCreate({
                    tokenRefresh: {
                        refresh: token["refresh_token"],
                    }
                });
                token["access_token"] = response.access;
                token["refresh_token"] = response.refresh;
                token["expires"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
            }
            return token;
        },
        async session({ session, user, token }) {
            console.log("session: ", session);
            console.log("--------------------");
            console.log("user: ", user);
            console.log("--------------------");
            console.log("token: ", token);
            console.log("--------------------");
            return session;
        }
        // authorized({ auth, request: { nextUrl } }) {
        //   const isLoggedIn = !!auth?.user;
        //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        //   if (isOnDashboard) {
        //     if (isLoggedIn) return true;
        //     return false; // Redirect unauthenticated users to login page
        //   } else if (isLoggedIn) {
        //     return Response.redirect(new URL('/dashboard', nextUrl));
        //   }
        //   return true;
        // },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
