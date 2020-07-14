import axios from 'axios'
import React, {useState, useEffect} from 'react'
import '../App.css';
import UserImage from '../containers/UserImage';
import { Button } from 'reactstrap';
import LoadingIndicator from "../components/LoadingIndicator"
import {useHistory} from 'react-router-dom';

const HomePage =({props}) => {
  let redirect = useHistory()
  const redirectUser = (e) =>{
    redirect.push(`users/${e.target.id}`)
  }

  const [users, setUsers] = useState([]) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      setUsers(result.data)
      setLoading(false)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [])

  if (loading) {
    return (
    <LoadingIndicator width="100px" height="100px" color="	#89CFF0" />
    )
  }

  return (
    <>
    
    <div className="outerContainer">
      {users.map((item) => {
        return (        
          <>
          <div className="profileCarouselWrap">
            <div className="profile">
              <p>{item.username}</p>
              <img src={item.profileImage} alt=""/> 
              <Button id={item.id} color="primary" onClick={redirectUser} className="mt-4">See More</Button>{' '}             
            </div>
            <div className="carousel">
              <UserImage data={item.id}/>         
            </div>
          </div>
          
          </>)
          })      
      }
    </div>
    </>
  );
}

export default HomePage;
