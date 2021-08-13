import React, { useState, useEffect } from 'react'
import { Icon, InlineIcon } from '@iconify/react';
import likeIcon from '@iconify/icons-flat-color-icons/like';
import noLikeIcon from '@iconify/icons-wpf/like';
import axios from 'axios'
import { Link } from 'react-router-dom';

const CommentingUser = ({userId, allComment}) =>{

  const[commenter, setCommenter] = useState([])
  useEffect(()=>{
    axios.get(`https://insta.nextacademy.com/api/v1/users/${userId}`)
  .then(response => {

    setCommenter(response.data)  
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
  }, [userId, allComment])

  return(
    <>

    <img style={{height: "1rem", width: "1rem"}} src={commenter.profileImage} alt=""></img>
    <Link>{commenter.username}</Link>
    </> 

    
  )
}

export default CommentingUser