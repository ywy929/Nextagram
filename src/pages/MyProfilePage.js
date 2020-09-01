import React,{useState, useEffect} from "react"
import axios from 'axios'
import '../App.css';
import LoadingIndicator from "../components/LoadingIndicator"
import { Link } from 'react-router-dom';
import LikeButton from "../components/LikeButton";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";

const MyProfilePage = ({jwt, loggedIn}) =>{

  const [userPic, setUserPic] = useState([]) 
  const [userProfile, setUserProfile] = useState([])
  const [like, setLike] = useState([])
  const [commentLike, setCommentLike] = useState([])
  const [loading, setLoading] = useState(true)

  let errorMsg = "Please login before continue."
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/v1/users/me`,{
    headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
      .then(result => {
        setUserProfile(result.data)
        document.title = userProfile.username
        setLoading(false)
      
    axios.get(`http://127.0.0.1:5000/api/v1/images/${userProfile.id}`)
      .then(response => {
        setUserPic(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
    })
    .catch(error => {
      console.log('ERROR: ', error)
      setLoading(false)
    })

  }, [jwt, userProfile.username, userProfile.id])

  const toggleLike = (picId) =>{
    axios({
      method: 'POST',
      url: `https://insta.nextacademy.com/api/v1/images/${picId}/toggle_like`,
      headers:{'Authorization': `Bearer ${jwt}`}
      })
      .then(result => {
        setLike(result.data)
        
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })

  }

  const toggleCommentLike = (commentId) =>{
    axios({
      method: 'POST',
      url: `https://insta.nextacademy.com/api/v1/comments/${commentId}/toggle_like`,
      headers:{'Authorization': `Bearer ${jwt}`}
      })
      .then(result => {
        setCommentLike(result.data)
        console.log(like)
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })

  }
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
          <Link to="/upload">Upload a picture!</Link>
        </div>        
      </div>
      <div className="profileCarousel">
        <h1 style={{display: loggedIn ? "none": "inline"}}>{errorMsg}</h1>
        {userPic.map((pic)=>{
          return (   
            <div className="d-flex flex-column">
              <img id={pic.id} className="profileUserImg" src={pic.url} alt=""/>
              <LikeButton picId={pic.id} toggleLike={toggleLike} like={like}/>
              <CommentInput picId={pic.id}/>
              <CommentList picId={pic.id} toggleCommentLike={toggleCommentLike} commentLike={commentLike}/>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MyProfilePage