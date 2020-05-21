import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { PropsType, MapToPropsType, DispatchPropsType } from './Header';

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />
    }
}
const mapStatetoProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<MapToPropsType, DispatchPropsType, {}, AppStateType>(mapStatetoProps, { logout })(HeaderContainer);

