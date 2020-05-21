import React from 'react';
import { connect } from 'react-redux';
import { followThunkCreator, unfollowThunkCreator, getUsersThunkCreator, onPageChangedThunkCreator } from '../../redux/user-reducer';
import FindUsersFunc from './FindUsersFunc'
import Preloader from '../common/loader/preloader';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getPortionSize } from '../../redux/user-selectors';
import { usersType } from '../../types/type';
import { AppStateType } from '../../redux/redux-store';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    users: Array<usersType>,
    followingInProgress: Array<number>,
    portionSize: number
}
type MapDispatchPropsType = {
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void,
    onPageChangedThunkCreator: (pageNumber: number, pageSize: number) => void,
    followThunkCreator: (userId: number) => void,
    unfollowThunkCreator: (userId: number) => void,
}
type OwnPropsType = {
    //
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class FindUsersContainer extends React.Component<PropsType> {

    componentDidMount() {

        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);

    }

    onPageChanged = (pageNumber: number) => {

        this.props.onPageChangedThunkCreator(pageNumber, this.props.pageSize);

    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <FindUsersFunc totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollowThunkCreator={this.props.unfollowThunkCreator}
                followThunkCreator={this.props.followThunkCreator}
                followingInProgress={this.props.followingInProgress}
                portionSize={this.props.portionSize}
            />
        </>

    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}



export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {
            followThunkCreator, unfollowThunkCreator,
            getUsersThunkCreator,
            onPageChangedThunkCreator
        }),
    withAuthRedirect
)(FindUsersContainer)
