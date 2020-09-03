import React, { useState, useEffect } from 'react'
import { Icon, InlineIcon } from '@iconify/react';
import likeIcon from '@iconify/icons-flat-color-icons/like';
import noLikeIcon from '@iconify/icons-wpf/like';
import axios from 'axios'
import CommentingUser from './CommentingUser';

const CommentList = ({picId, toggleCommentLike, commentLike}) =>{

  const [allComment, setAllComment] = useState([])

  useEffect(()=>{
    axios.get(`https://insta.nextacademy.com/api/v1/images/${picId}/comments`,{
    headers: {
      'Authorization': `Bearer ${localStorage.jwt}`
    }
  })
  .then(response => {
    setAllComment(response.data)  
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
  })

  return(
    <>
    <ul style={{listStyleType:"none"}}>
    {allComment.map((comment)=>{
          return (

            <li >
              {
                commentLike.liked && picId === comment.id
                ? <Icon onClick={()=>toggleCommentLike(comment.id)} icon={likeIcon}/>
                : <Icon onClick={()=>toggleCommentLike(comment.id)} icon={noLikeIcon} />
              }
              <CommentingUser allComment={allComment} userId={comment.posted_by.id}/><span className="ml-3">{comment.content}</span></li>

          )
        })}
    </ul>
    </>
    
  )
}

export default CommentList