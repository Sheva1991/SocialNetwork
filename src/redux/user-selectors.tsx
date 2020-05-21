// import { createSelector } from "reselect"

import { AppStateType } from "./redux-store"

export const getUsers = (state: AppStateType) => {
    return state.FindUsersPage.users
}
export const getPageSize = (state: AppStateType) => {
    return state.FindUsersPage.pageSize
}
export const getPortionSize = (state: AppStateType) => {
    return state.FindUsersPage.portionSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.FindUsersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.FindUsersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.FindUsersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.FindUsersPage.followingInProgress
}


// example hard selector(т.е внутри какие-то сложные функции
// или вычисления, которые приводят к постоянному изменению нашего объекта)
// например тут перебор всех элементов юзеров
// export const getUsers = (state) => {
//     return state.FindUsersPage.users.filter(u=>true)
// }
// простой селектор
// export const getUserSelector = (state) => {
//     return state.FindUsersPage.users
// }
// Пример использования Reselect, и потом getUserSuper вызываем в нашей компоненте
// export const getUserSuper = createSelector(getUserSelector, (users) => {
//     return users.filter(u => true)
// })