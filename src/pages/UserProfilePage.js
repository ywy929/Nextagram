import React,{useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import LoadingIndicator from "../components/LoadingIndicator"

const UserProfilePage = () =>{
  const {id} = useParams()

  const [userPic, setUserPic] = useState([]) 
  const [userProfile, setUserProfile] = useState([]) 
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
    .then(result => {
      setUserPic(result.data)
      setLoading(false)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [id])
  
  
  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
    .then(result => {
      setUserProfile(result.data)
      setLoading(false)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [id])

  if (loading) {
    return (
    <LoadingIndicator width="100px" height="100px" color="	#89CFF0" />
    )
  }
  return (
    <>
      <div className="profileInfo">
        <img className="profileInfoImg" src={userProfile.profileImage} alt=""/>
        <div className="profileInfoDes"><h2>@{userProfile.username}</h2></div>        
      </div>
      <div className="profileCarousel">
      {userPic.map((pic)=>{
        return (        
          <img className="profileUserImg" src={pic} alt=""/>        
        )
      })}
      </div>
    </>
  )
}

export default UserProfilePage