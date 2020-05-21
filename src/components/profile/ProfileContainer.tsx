import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfileThunkCreator, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { profileType } from '../../types/type';



class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.loggedUserId;
            if (!userId) {
                this.props.history.push('/Login')
            }
        }

        if (!userId) {
            console.log("ID should exist in ULR or in state")
        } else {
            this.props.getProfileThunkCreator(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount(): void {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <Profile {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhoto} />
        )
    }
}
let mapStateToProps = (state: AppStateType) => ({
    profile: state.ProfilePage.profile,
    status: state.ProfilePage.status,
    loggedUserId: state.auth.userId,
    isAuth: state.auth.isAuth

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getProfileThunkCreator, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer)

type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getProfileThunkCreator: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: () => void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = mapStateToPropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;



