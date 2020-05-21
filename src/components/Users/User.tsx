import React from 'react';
import fu from './FindUsers.module.css'
import { NavLink } from 'react-router-dom';
import { usersType } from '../../types/type';

const userPthoto = require('../../assets/img/usersAva.jfif')


type PropsType = {
    user: usersType
    followingInProgress: Array<number>
    followThunkCreator: (userId: number) => void
    unfollowThunkCreator: (userId: number) => void
}

let User: React.FC<PropsType> = (props) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/Profile/' + props.user.id}>
                        <img src={props.user.photos.small != null ? props.user.photos.small : userPthoto} alt='' className={fu.usersPhoto} />
                    </NavLink>
                </div>
                <div>
                    {props.user.followed
                        ? (<button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {

                            props.unfollowThunkCreator(props.user.id);

                        }}>Unfollow</button>)
                        : (<button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {

                            props.followThunkCreator(props.user.id);

                        }}>Follow</button>)
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>)
}

export default User;