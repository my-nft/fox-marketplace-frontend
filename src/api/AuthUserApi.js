import apiUrl from "../config/api";
import methods from "../config/axiosConfig";


//TODO Add URL to the env file
const signinEndpoint = apiUrl + "signin/";
const signupEndpoint = apiUrl + "signup/";


export function signinUser(body) {
    return methods.post(signinEndpoint, body);
}

export function signupUser(body) {
    return methods.post(signupEndpoint, body);
}
