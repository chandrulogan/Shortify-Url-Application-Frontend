import { getToken } from "./LocalStorage";

export const isAuthenticated = () => {
    return getToken() != null ? true : false;
};
