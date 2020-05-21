import { instance, APIResponseType, ResultCodesEnum, ResultCodeForCaptcha } from './api';

type meResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<meResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`)
    },
}

type getCaptchaUrlType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>(`security/get-captcha-url`).then(res => res.data)
    },
}