import React,{useState, useEffect} from "react"
import axios from 'axios'
import '../App.css';
import LoadingIndicator from "../components/LoadingIndicator"

const MyProfilePage = ({jwt, loggedIn}) =>{

  const [userPic, setUserPic] = useState([]) 
  const [userProfile, setUserProfile] = useState([]) 
  const [loading, setLoading] = useState(true)

  let errorMsg = "Please login before continue."
  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/users/me`,{
      headers: {
        'Authorization': `bearer ${jwt}`
      }
    })
    .then(result => {
      setUserProfile(result.data)
      document.title = userProfile.username
      setLoading(false)
    })
    .catch(error => {
      console.log('ERROR: ', error)
      setLoading(false)
    })
  }, [jwt, userProfile.username])

  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/images/me`,{
      headers: {
        'Authorization': `bearer ${jwt}`
      }
    })
    .then(result => {
      setUserPic(result.data)
      setLoading(false)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [jwt])


  if (loading) {
    return (
    <LoadingIndicator width="100px" height="100px" color="	#89CFF0" />
    )
  }
  return (
    <>
      <div style={{display: loggedIn ? "flex": "none"}} className="profileInfo">
        <img className="profileInfoImg" src={userProfile.profile_picture} alt=""/>
        <div className="profileInfoDes">
          <h2>@{userProfile.username}</h2>
          <a href="/upload">Upload a picture!</a>
        </div>        
      </div>
      <div className="profileCarousel">
        <h1 style={{display: loggedIn ? "none": "inline"}}>{errorMsg}</h1>
        {userPic.map((pic)=>{
          return (        
            <img className="profileUserImg" src={pic} alt=""/>        
          )
        })}
      </div>
    </>
  )
}

export default MyProfilePage