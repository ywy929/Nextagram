import React from 'react';
import {
  Navbar,
  Nav,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Navibar = ({toggleLogin, toggleSignUp, loggedIn, logout}) => {
  return (
    <div>
      <Navbar color="white" light expand="md" className="d-flex justify-content-between align-items-center">
        <div>
          <Link className="homeLink" to="/">Nextagram</Link>
          {
            loggedIn
            ? <Link className="profileLink" to="/profile">My Profile</Link>:
            null
          }
          
        </div>      
        
        <Nav>    
          {/* <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="password" id="searchInput" placeholder="Type Username" />
            </FormGroup>
            <Button>Search</Button>
          </Form> */}
          {/* <NavLink href="#">Users</NavLink>  */}
            {loggedIn
              ? <NavLink onClick={logout} href="#">Logout</NavLink>
              : <><NavLink onClick={toggleLogin} href="#">Log In</NavLink> 
                <NavLink onClick={toggleSignUp} href="#">Sign Up</NavLink></>
            }          
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navibar;