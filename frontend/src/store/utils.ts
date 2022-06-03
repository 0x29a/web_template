import request from "axios";
import { AxiosError } from "axios";

const defaultErrorCallback = (response: AxiosError["response"]) => {
    if (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
    }
};

export const handleError = (
    error: any,
    callback: (error: AxiosError["response"]) => void = defaultErrorCallback
) => {
    if (!request.isAxiosError(error)) {
        console.error(error);
    } else {
        if (error.response) {
            callback(error.response);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error", error.message);
        }
        console.log(error.config);
    }
};
