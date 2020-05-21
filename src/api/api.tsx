import axios from "axios";
import { usersType } from '../types/type';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "fb07031b-9606-436f-b074-526b8fd58939"
    }
});

export type GetItemsType = {
    items: Array<usersType>,
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Succsess = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    captchaIsRequared = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}




