import { AuthApi } from "./client";
import { Configuration } from "./client";

const apiConfig = new Configuration({
  basePath: "http://backend:5000",
});

export const authApi = new AuthApi(apiConfig);
