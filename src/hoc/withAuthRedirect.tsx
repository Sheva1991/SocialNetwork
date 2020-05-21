import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/redux-store'

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {}

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapDispatchToPropsType & MapStateToPropsType> = (props) => {

        let { isAuth, ...restProps } = props


        if (!isAuth) return <Redirect to={"/Login"} />


        return <Component {...restProps as unknown as WCP} />
    }



    let ConnectedAuthRedirectComponent = connect<MapStateToPropsType, MapDispatchToPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}