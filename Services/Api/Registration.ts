import { backendBaseApi } from "./BaseApi"

export const sendEmailOtp=`${backendBaseApi}/registration/request-email-otp`;

export const verifyEmailOtp= `${backendBaseApi}/registration/validate-email-otp`;

export const saveUser=`${backendBaseApi}/registration/saveUser`;

export const sendPhoneOtp=`${backendBaseApi}/registration/request-phone-otp`

export const verifyPhoneOtp=`${backendBaseApi}/registration/validate-phone-otp`;

