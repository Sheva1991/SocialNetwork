import { instance, GetItemsType, APIResponseType } from './api';

export const getUsers = (currentPage = 1, pageSize = 10) => {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data)
}

export const followed = {
    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`).then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(res => res.data) as Promise<APIResponseType>
    }
}