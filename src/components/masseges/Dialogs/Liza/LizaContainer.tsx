// import React from 'react';
import { actions } from '../../../../redux/message-reducer';
import Liza from './Liza';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';
import { MapPropsType, DispatchPropsType } from './Liza';


let mapStateToProps = (state: AppStateType) => {
    return {
        postLiza: state.MessagePage.dialogDataLiza,
    } as MapPropsType
}


const LizaContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { addPostDialog: actions.addPostLizaActionCreator })(Liza);

export default LizaContainer;
