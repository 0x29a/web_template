import {
    LoginApi,
    Configuration
} from "../packages/client";

const getApiKey = () => {
    return "";
};

const configuration = new Configuration({
    basePath: "http://localhost:8123",
    apiKey: getApiKey,
});

export const loginApi = new LoginApi(configuration);
