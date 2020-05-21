import { getUsers, followed } from "../api/user-api";
import { updateObjectArray } from "../utils/validadtor/object-helpers";
import { usersType } from '../types/type';
import { AppStateType, InferActionsType, BaseThunkType } from './redux-store';
import { Dispatch } from 'redux';


let initialState = {
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 19,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
    portionSize: 10,
};

const userReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/USER/FOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.userid, 'id', { followed: true })
            }
        case 'SN/USER/UNFOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.userid, 'id', { followed: false })
            }
        case 'SN/USER/SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'SN/USER/SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SN/USER/SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.count }
        }
        case 'SN/USER/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'SN/USER/TOGGLE_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
}

export const actions = {
    follow: (userid: number) => ({ type: 'SN/USER/FOLLOW', userid } as const),
    unfollow: (userid: number) => ({ type: 'SN/USER/UNFOLLOW', userid } as const),
    setUsers: (users: Array<usersType>) => ({ type: 'SN/USER/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USER/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: 'SN/USER/SET_TOTAL_USERS_COUNT', count: totalCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USER/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USER/TOGGLE_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

// первый способ типизации thunk
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {

    return async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(actions.toggleIsFetching(true))
        let data = await getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

//второй способ типизации Thunk использовать ThunkAction из библиотеки redux-thunk
export const onPageChangedThunkCreator = (pageNumber: number,
    pageSize: number): ThunkType => {

    return async (dispatch) => {
        dispatch(actions.setCurrentPage(pageNumber))
        dispatch(actions.toggleIsFetching(true))
        let data = await getUsers(pageNumber, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
    }
}
export const unfollowThunkCreator = (userrId: number): ThunkType => {

    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userrId))
        let data = await followed.unfollow(userrId)
        if (data.resultCode === 0) {
            dispatch(actions.unfollow(userrId))
        }
        dispatch(actions.toggleFollowingProgress(false, userrId))
    }
}
export const followThunkCreator = (userrId: number): ThunkType => {

    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userrId))
        let data = await followed.follow(userrId)
        if (data.resultCode === 0) {
            dispatch(actions.follow(userrId))
        }
        dispatch(actions.toggleFollowingProgress(false, userrId))
    }
}

export default userReducer;

type initialStateType = typeof initialState

//первый способ типизации thunk
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>

type ActionsTypes = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes>