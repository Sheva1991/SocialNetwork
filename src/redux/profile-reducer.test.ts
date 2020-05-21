// import React from 'react'
// import ReactDOM from 'react-dom'
import ProfileReducer, { actions } from "./profile-reducer";

let state = {
    // myposts 
    postData: [
        { id: 1, count: 4, message: 'My first post' },
        { id: 2, count: 7, message: 'My name is Vlad' },
        { id: 3, count: 9, message: 'My name is Vlad' },
        { id: 4, count: 1, message: 'My name is Vlad' },
    ],
    profile: null,
    status: '',
};


it('length of post should be incremented', () => {
    // 1 test data
    let action = actions.addPostActionCreator('hi all')
    // 2 action
    let newState = ProfileReducer(state, action)
    //3 expectation
    expect(newState.postData.length).toBe(5);
});

it('message of new post should be "hi all"', () => {
    // 1 test data
    let action = actions.addPostActionCreator('hi all')
    // 2 action
    let newState = ProfileReducer(state, action)
    //3 expectation
    expect(newState.postData[4].message).toBe('hi all');
});


it('after deleting length of massages should be decrement ', () => {
    // 1 test data
    let action = actions.deletPost(1)
    // 2 action
    let newState = ProfileReducer(state, action)
    //3 expectation
    expect(newState.postData.length).toBe(3);
});
