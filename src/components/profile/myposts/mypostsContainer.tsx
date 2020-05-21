// import React from 'react';
import { actions } from '../../../redux/profile-reducer';
import MyPosts from './myposts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { MapPropsType, DispatchPropsType } from './myposts';


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.ProfilePage.postData
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost: actions.addPostActionCreator })(MyPosts);

export default MyPostsContainer;

//Важно! для двух классов кавычки наклонные `${mps.item} ${mps.first}` 
