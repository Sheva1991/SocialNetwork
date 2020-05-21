import { createStore, combineReducers, applyMiddleware, compose, Action } from "redux";
import ProfileReducer from "./profile-reducer";
import MessageReducer from "./message-reducer";
import userReducer from "./user-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import AppReducer from "./app-reducer";


let reducers = combineReducers({
    ProfilePage: ProfileReducer,
    MessagePage: MessageReducer,
    FindUsersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: AppReducer
});

type redusersType = typeof reducers; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<redusersType>

// type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsType<T> = T extends { [key: string]: (...arg: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.__store__ = store;

export default store;