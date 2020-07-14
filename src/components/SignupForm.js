import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText,} from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const SignUpForm = (props) => {
  const {className, toggleSignUp, signUpModal, switchModal} = props;

  const closeBtn = <button className="close" onClick={toggleSignUp}>&times;</button>;

  const [usernameInput, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(false);

  const signUp = (e) =>{
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/users/',
      data: {
        username: usernameInput,
        email: email,
        password: password
      }
    })
    .then(response => {
      console.log(response)
      toast.success('Signup Successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    })
    .catch(error => {
      console.error(error.response) // so that we know what went wrong if the request failed
      toast.success("Signup unsuccessful.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setUsernameInput("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      toggleSignUp()
    })
  }
  
  const checkUsername = usernameInput => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${usernameInput}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };

  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newUsername = e.target.value
    setUsernameInput(newUsername)
    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {      
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };


  let usernameInputField
  if (usernameInput.length === 0){
    usernameInputField = <Input type="text" name="username" id="username" onChange={handleUsernameInput} value={usernameInput} placeholder="" autoFocus/>
  } else if(usernameInput.length< 6){
    usernameInputField = <><Input type="text" name="username" id="username" onChange={handleUsernameInput} value={usernameInput} placeholder="" invalid autoFocus/><FormText color="danger">Must be minimum 6 characters!</FormText></>
  } else if (usernameValid && usernameInput.length >= 6) {
    usernameInputField = <><Input type="text" name="username" id="username" onChange={handleUsernameInput} value={usernameInput} placeholder="" valid autoFocus/><FormText color="success">Username is available!</FormText></>
  } else if (!usernameValid && usernameInput.length >= 6){
    usernameInputField = <><Input type="text" name="username" id="username" onChange={handleUsernameInput} value={usernameInput} placeholder="" invalid autoFocus/><FormText color="danger">Username is taken!</FormText></>
  }
  
  let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const handleEmailInput = e => {
    const newEmail = e.target.value
    setEmail(newEmail)    
  };
  let emailField
  if (email.length === 0){
    emailField = <Input type="email" name="email" id="email" onChange={handleEmailInput} value={email} placeholder="" autofocus />
  } else if(email.match(mailformat)){
    emailField = <Input type="email" name="email" id="email" onChange={handleEmailInput} value={email} placeholder="" valid autofocus />
  } else{
    emailField = <Input type="email" name="email" id="email" onChange={handleEmailInput} value={email} placeholder="" invalid autofocus />
  }

  const handlePasswordInput = e => {
    const newPassword = e.target.value
    setPassword(newPassword)    
  };
  // To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
  let pwformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  let passwordField
  if (password.length === 0){
    passwordField = <Input type="password" name="password" id="userPassword" onChange={handlePasswordInput} value={password} placeholder="" autoFocus/>
  } else if (password.match(pwformat)){
    passwordField = <Input type="password" name="password" id="userPassword" onChange={handlePasswordInput} value={password} placeholder="" valid autoFocus />
  } else{
    passwordField = <>
    <Input type="password" name="password" id="userPassword" onChange={handlePasswordInput} value={password} placeholder="" invalid autoFocus/>
    <FormText color="danger">
      <ul>
        <li>6-20 characters</li>
        <li>contain 0-9</li>
        <li>contain uppercase</li>
        <li>contain lowercase</li>
      </ul>
    </FormText>
    </>
  }

  let confirmPasswordField
  if (confirmPassword.length === 0){
      confirmPasswordField = <Input type="password" name="confirmPassword" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="" autoFocus />
    } else if (confirmPassword !== password){
    confirmPasswordField = <><Input type="password" name="confirmPassword" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="" invalid autoFocus /><FormText color="danger">Does not match your password.</FormText></>
  } else if (confirmPassword === password){
    confirmPasswordField = <Input type="password" name="confirmPassword" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="" valid autoFocus />
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}
      newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      {/* Same as */}
      <ToastContainer />
      <Modal isOpen={signUpModal} toggle={toggleSignUp} className={className}>
        <ModalHeader toggle={toggleSignUp} close={closeBtn}>Signup Form</ModalHeader>
        <ModalBody>
          <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                {usernameInputField}
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                {emailField}
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                {passwordField}
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                {confirmPasswordField}
              </FormGroup>
            </Form>              
          </ModalBody>
        <ModalFooter>
          <Button disabled={!usernameValid || !email.match(mailformat) || confirmPassword !== password || !password.match(pwformat)} color="primary" onClick={signUp}>Sign Up</Button>{' '}
          <Button color="secondary" onClick={switchModal}>Login</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignUpForm;