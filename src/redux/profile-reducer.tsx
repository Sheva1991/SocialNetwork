import { profileAPI } from "../api/profile-api";
import { profileType, photosType, PostType } from '../types/type';
import { InferActionsType, BaseThunkType } from './redux-store';
import { FormAction, stopSubmit } from 'redux-form';

let initialState = {
    // myposts 
    postData: [
        { id: 1, count: 4, message: 'My first post' },
        { id: 2, count: 7, message: 'My name is Vlad' },
        { id: 3, count: 9, message: 'My name is Vlad' },
        { id: 4, count: 1, message: 'My name is Vlad' },
    ] as Array<PostType>,
    profile: null as profileType | null,
    status: '',
};

const ProfileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                postData: [...state.postData, { id: state.postData.length + 1, message: action.newPostText, count: 0 }]
            }
        case 'SET_USER_PROFILE': {
            return { ...state, profile: action.profile }
        }
        case 'SET_STATUS': {
            return { ...state, status: action.status }
        }
        case 'DELET_POST': {
            return { ...state, postData: state.postData.filter(p => p.id !== action.postDataId) }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return { ...state, profile: { ...state.profile, photos: action.photos } as profileType }
        }
        default:
            return state;

    }
}

export let actions = {
    addPostActionCreator: (newPostText: string) => { return { type: 'ADD_POST', newPostText } as const },
    setUserProfile: (profile: profileType) => { return { type: 'SET_USER_PROFILE', profile } as const },
    setStatus: (status: string) => { return { type: 'SET_STATUS', status } as const },
    deletPost: (postDataId: number) => { return { type: 'DELET_POST', postDataId } as const },
    savePhotoSuccess: (photos: photosType) => { return { type: 'SAVE_PHOTO_SUCCESS', photos } as const }
}

export const getProfileThunkCreator = (userId: number): ThunkType => async (dispatch) => {

    try {
        let data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    } catch (error) {

    }
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {

    try {
        let data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data))
    } catch (error) {

    }
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {

    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {

    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {

    try {
        let data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos))
        }
    } catch (error) {

    }
}

export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getProfileThunkCreator(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export default ProfileReducer;


export type initialStateType = typeof initialState;

type ActionsTypes = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes | FormAction>