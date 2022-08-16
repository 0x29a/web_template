# Frontend notes

## How it has been initialized

### create-next-app

1. `sudo chown 101:101 frontend`
2. `docker-compose run frontend bash`
3. `npx create-next-app@latest --ts` (type `web_template`)
4. `cp -r web_template/* .`
5. `rm -r web_template/`

### Linting and formatting

1. `yarn lint` -> `Strict`
2. `yarn add --dev eslint-config-prettier prettier`
3. Added `prettier` to `.eslintrc.json`
4. Added the following to `package.json`:

        "format": "prettier --write pages/ components/ lib/",
        "format-check": "prettier --check pages/ components/ lib/"

### Tailwind

1. `yarn add --dev tailwindcss postcss autoprefixer`
2. `npx tailwindcss init -p`
3. Added the following to `tailwind.config.js`:

        content: [
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}",
        ],

4. Added the following to `globals.css`:

        @tailwind base;
        @tailwind components;
        @tailwind utilities;

### Redux, RTK Query, and API client generation

1. Generated `backend_api_schema.yml` file, using the helper command from Makefile.
2. Ran `yarn add @reduxjs/toolkit react-redux next-redux-wrapper` and `yarn add -D @rtk-query/codegen-openapi` from within the frontend container.
3. Removed `pages/api` directory.
4. Created the folder with the following structure:

        ├── lib
        │   ├── api.ts
        │   ├── backendApi.ts
        │   ├── store.ts
        │   └── typeHelpers.ts

5. Put the following into the `lib/api.ts`, according to [this RTK Query codegen documentation page](https://redux-toolkit.js.org/rtk-query/usage/code-generation):

        // Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
        import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

        // initialize an empty api service that we'll inject endpoints into later as needed
        export const api = createApi({
          baseQuery: fetchBaseQuery({ baseUrl: '/' }),
          endpoints: () => ({}),
        })

6. Put the following in the `openapi-config.json` file:

        {
          "schemaFile": "backend_api_schema.yml",
          "apiFile": "./lib/api.ts",
          "apiImport": "api",
          "outputFile": "./lib/backendApi.ts",
          "exportName": "backendApi",
          "hooks": true
        }

7. Ran `make frontend-client` to generate the RTK query client. Under the hood, it calls `npx @rtk-query/codegen-openapi openapi-config.json`, which results in `lib/backendApi.ts` file being created. This file has all API endpoints, as well as model types.
8. Put the following in the `lib/store.ts` (TODO: explain each line):

        import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
        import { createWrapper } from 'next-redux-wrapper';
        import { api } from './api';

        const makeStore = () => {
        const store = configureStore({
                // Add the generated reducer as a specific top-level slice
                reducer: {
                [api.reducerPath]: api.reducer,
                },
                devTools: process.env.NODE_ENV !== "production",
                // Adding the api middleware enables caching, invalidation, polling,
                // and other useful features of `rtk-query`.
                middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
        });
        return store;
        };

        // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
        // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
        // setupListeners(store.dispatch)

        // Infer the `RootState` and `AppDispatch` types from the store itself
        export type AppStore = ReturnType<typeof makeStore>;
        export type RootState = ReturnType<AppStore['getState']>;
        export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

        // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
        export type AppDispatch = AppStore['dispatch'];

        export const wrapper = createWrapper<AppStore>(makeStore);

9. Using the wrapper from `next-redux-wrapper`, connected the main component to the store, so `pages/_app.tsx` looks like:

        import "../styles/globals.css";
        import type { AppProps } from "next/app";
        import { wrapper } from '../lib/store';

        function MyApp({ Component, pageProps }: AppProps) {
        return <Component {...pageProps} />;
        }

        const wrappedApp = wrapper.withRedux(MyApp);

        export default wrappedApp;
