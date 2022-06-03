import { loginSuccess } from "./slice";
import { loginApi } from "../api";
import { AppThunk } from "../store";
import { handleError } from "../utils";

export function login(): AppThunk {
    return async (dispatch) => {
        try {
            const response = await loginApi.loginCreate({
                username: "example",
                email: "test@example.com",
                password: "example",
            });
            dispatch(loginSuccess(response.data));
        } catch (error) {
            handleError(error);
        }
    };
}
