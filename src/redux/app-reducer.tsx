import { getAuthUserDataThunkCreator } from './auth-reducer';
import { AppStateType, InferActionsType } from './redux-store';
import { Dispatch } from "redux";

export type initialStateType = typeof initialState;

let initialState = {
    initialized: false
};

const AppReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCSESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;

    }
}

export const actions = {
    setInitializedSucsess: () => { return { type: 'SN/APP/INITIALIZED_SUCSESS' } as const }
}
type ActionsTypes = InferActionsType<typeof actions>

type GetStateType = () => AppStateType

type DispatchType = Dispatch<ActionsTypes>

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunkCreator())
    Promise.all([promise]).then(() => {
        dispatch(actions.setInitializedSucsess())
    })
}

export default AppReducer;