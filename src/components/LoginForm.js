import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'

const LoginForm = (props) => {
  const {className, toggleLogin, loginModal, switchModal, loggedInProcess} = props;

  const closeBtn = <button className="close" onClick={toggleLogin}>&times;</button>;
  let redirect = useHistory()
  
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState(""); 
  const [errorMsg, setErrorMsg] = useState(""); 
  const login = (e) =>{
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/login',
      data: {
        username: usernameInput,
        password: password
      }
    })
    .then(response => {
      toast.success('Login Successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      toggleLogin()
      localStorage.setItem('jwt', response.data.auth_token)
      redirect.push(`/users/${response.data.user.id}`)
      setUsernameInput("")
      setPassword("")
      setErrorMsg("")
      loggedInProcess()
    })
    .catch(error => {
      console.error(error.response) // so that we know what went wrong if the request failed
      setErrorMsg(error.response.data.message)
    })
  }
  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}
      newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      {/* Same as */}
      <ToastContainer />
      <Modal isOpen={loginModal} toggle={toggleLogin} className={className}>
        <ModalHeader toggle={toggleLogin} close={closeBtn}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username" onChange={e => setUsernameInput(e.target.value)} value={usernameInput} placeholder="" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="userPassword" onChange={e => setPassword(e.target.value)} value={password} placeholder="" />
            </FormGroup>
            <FormText color="danger">{errorMsg}</FormText>
          </Form>      
        </ModalBody>
        <ModalFooter>
          <Button disabled={usernameInput.length<1 || password.length<1} color="primary" onClick={login}>Login</Button>{' '}
          <Button color="secondary" onClick={switchModal}>Sign Up</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginForm;