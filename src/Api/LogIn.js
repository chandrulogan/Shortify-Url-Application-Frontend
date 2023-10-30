import API from "./Api"
import {signUpEndpoint, signInEndpoint, forgotPasswordEndpoint, verifyOtpEndpoint, updatePasswordEndpoint } from "./EndPoints"

export const userSignUp = (data) => {
    return API.post(`${signUpEndpoint}`, data)
}

export const userSignIn = (data) => {
    return API.post(`${signInEndpoint}`, data)
}

export const userForgotPassword = (data) => {
    return API.post(`${forgotPasswordEndpoint}`, data)
}

export const userVerifyOtp = (data) => {
    return API.post(`${verifyOtpEndpoint}`, data)
}

export const userUpdatePassword = (data) => {
    return API.post(`${updatePasswordEndpoint}`, data)
}