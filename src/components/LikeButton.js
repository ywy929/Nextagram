import React, { useState, useEffect } from 'react'
import { Icon, InlineIcon } from '@iconify/react';
import likeIcon from '@iconify/icons-flat-color-icons/like';
import noLikeIcon from '@iconify/icons-wpf/like';
import axios from'axios'

const LikeButton = ({like, toggleLike, picId}) =>{

  const [likeUser, setLikeUser] = useState([])
  const [likeState, setLikeState] = useState(false)

  useEffect(()=>{
    axios.get(`https://insta.nextacademy.com/api/v2/images/${picId}`,{
    headers: {
      'Authorization': `Bearer ${localStorage.jwt}`
    }
  })
  .then(response => {
    console.log(response)
    setLikeUser(response.data.likes)
    setLikeState(response.data.liked)
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
  }, [like,picId])

  console.log(likeState)
  return(
    <>
    {
      likeState
      ? <Icon onClick={()=>toggleLike(picId)} style={{fontSize: "4em"}} icon={likeIcon}/>
      : <Icon onClick={()=>toggleLike(picId)} style={{fontSize: "4em"}} icon={noLikeIcon} />
    }
    {
      likeUser.length === 0 ? null : <p>{likeUser.length}{" likes"}</p>  
    }
    
    </>
  )
}

export default LikeButton