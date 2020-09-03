import React, {useState} from 'react'
import './App.css';
import HomePage from './pages/HomePage';
import { Switch, Route, useHistory } from 'react-router-dom';
import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './pages/MyProfilePage';
import Navibar from './components/Navibar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignupForm';
import UploadPage from './pages/UploadPage';

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const toggleLogin = () => setLoginModal(!loginModal);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )

  const loggedInProcess = () =>{
    const cloneloggedIn = localStorage.getItem('jwt') !== null
    setLoggedIn(cloneloggedIn)
  }
  let redirect = useHistory()
  const logout = () =>{
    localStorage.removeItem('jwt')
    const cloneloggedIn = localStorage.getItem('jwt') !== null
    setLoggedIn(cloneloggedIn)
    redirect.push("/")
  }

  const [signUpModal, setSignUpModal] = useState(false);
  const toggleSignUp = () => setSignUpModal(!signUpModal);

  const switchModal = () => {
    toggleSignUp()
    toggleLogin()
  }

  const jwt = localStorage.jwt
  return (
    <>
    <LoginForm loginModal={loginModal} toggleLogin={toggleLogin} switchModal={switchModal} loggedInProcess={loggedInProcess}/>
    <SignUpForm signUpModal={signUpModal} toggleSignUp={toggleSignUp} switchModal={switchModal}/>
    <Navibar toggleLogin={toggleLogin} toggleSignUp={toggleSignUp} loggedIn={loggedIn} logout={logout}/>
      <Switch>
        <Route exact path="/">
          <HomePage></HomePage>
        </Route>
        <Route path="/users/:id">
          <UserProfilePage></UserProfilePage>
        </Route>
        <Route path="/profile">
          <MyProfilePage jwt={jwt} loggedIn={loggedIn}></MyProfilePage>
        </Route>
        <Route path="/upload">
          <UploadPage jwt={jwt}></UploadPage>
        </Route>
      </Switch>
    </>
  );
}

export default App;
