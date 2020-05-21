import React from 'react';
// import fu from './FindUsers.module.css'
// import userPthoto from '../../assets/img/usersAva.jfif'
// import { NavLink } from 'react-router-dom';
import Paginator from '../common/paginator/Paginator';
import User from './User';
import { usersType } from '../../types/type';
// import { followThunkCreator, unfollowThunkCreator } from '../../redux/user-reducer';

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    portionSize: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<usersType>,
    followThunkCreator: (userId: number) => void,
    unfollowThunkCreator: (userId: number) => void,
    followingInProgress: Array<number>
}

let FindUsersFunc: React.FC<PropsType> = (props) => {

    return (
        <div>
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} portionSize={props.portionSize} />
            {
                props.users.map(u =>
                    <User user={u} key={u.id} unfollowThunkCreator={props.unfollowThunkCreator}
                        followThunkCreator={props.followThunkCreator} followingInProgress={props.followingInProgress} />
                )
            }
        </div >
    )
}

export default FindUsersFunc;