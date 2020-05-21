import './App.css';
import React, { Component, Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './components/common/loader/preloader';
import HeaderContainer from './components/header/HeaderContainer';
import LoginPage from './components/Login/login';
import Music from './components/music/Music';
import Nav from './components/nav/Nav';
import News from './components/news/News';
import Settings from './components/settings/Settings';
import FindUsersContainer from './components/Users/FindUsersContainer';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from './redux/redux-store';
const MessagesContainer = React.lazy(() => import('./components/masseges/MessagesContainer'));
const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhendledErrors = (e: PromiseRejectionEvent) => {
    console.log('Some error occured', e)
  }
  componentDidMount() {
    this.props.initializeApp()

    window.addEventListener("unhandledrejection", this.catchAllUnhendledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhendledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />
        <div className="content">
          <Route path='/' render={() => <Redirect to={'/Profile'} />} />
          <Route path='/Profile/:userId?' render={() => {
            return <Suspense fallback={<div>Загрузка...</div>}>
              <ProfileContainer />
            </Suspense>
          }} />
          <Route path='/Messages' render={() => {
            return <Suspense fallback={<div>Загрузка...</div>}>
              <MessagesContainer />
            </Suspense>
          }} />
          <Route path='/News' component={News} />
          <Route path='/Music' component={Music} />
          <Route path='/Friends' component={FindUsersContainer} />
          <Route path='/Settings' component={Settings} />
          <Route path='/Login' component={LoginPage} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SocialJSApp: React.FC = () => {
  // для gh-pages используем hashrouter
  return <BrowserRouter basename={process.env.PUBLIC_URL + '/'}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter >
}

export default SocialJSApp