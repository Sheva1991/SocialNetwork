import { authAPI, securityAPI } from '../api/auth-api';
import { stopSubmit, FormAction } from "redux-form";
import { AppStateType, InferActionsType, BaseThunkType } from './redux-store';
import { Dispatch } from "redux";
import { ResultCodesEnum, ResultCodeForCaptcha } from '../api/api';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;

    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => { return { type: 'SN/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const },
    getCaptchaUrlSuccsess: (captchaUrl: string) => { return { type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const }

}

export const getAuthUserDataThunkCreator = (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodesEnum.Succsess) {
        let { id, login, email } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Succsess) {
        dispatch(getAuthUserDataThunkCreator())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.captchaIsRequared) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    let data = await securityAPI.getCaptchaUrl();
    let captchaUrl = data.url;

    dispatch(actions.getCaptchaUrlSuccsess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Succsess) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

export type initialStateType = typeof initialState;

type ActionsTypes = InferActionsType<typeof actions>

type GetStateType = () => AppStateType

type DispatchType = Dispatch<ActionsTypes>

type ThunkType = BaseThunkType<ActionsTypes | FormAction>