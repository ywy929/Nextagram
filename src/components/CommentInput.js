import React, { useState } from 'react'
import { Input, Form, FormGroup, Button } from 'reactstrap'
import { Icon, InlineIcon } from '@iconify/react';
import likeIcon from '@iconify/icons-flat-color-icons/like';
import noLikeIcon from '@iconify/icons-wpf/like';
import axios from 'axios'

const CommentInput = ({picId}) =>{
  const [commentInput, setCommentInput] = useState("")

  const handleSubmit =(e) =>{
    console.log("hi")
    axios({
      method: 'POST',
      url: `https://insta.nextacademy.com/api/v1/images/${picId}/comments`,
      headers:{'Authorization': `Bearer ${localStorage.jwt}`},
      data:{
        content: commentInput
      }
      })
      .then(reply => {
        console.log(reply)
        setCommentInput("")
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  }

  return(
    <>
    <div className="d-flex">
      <Form inline className="d-flex align-items-center">
        <FormGroup>
          <Input type="text" name="comment" id="comment" onChange={e => setCommentInput(e.target.value)} value={commentInput} placeholder="What do you think?" />
        </FormGroup>
        <Button onClick={handleSubmit} color="transparent" size="sm"><span role="img" aria-label="" style={{fontSize:"2rem"}}>👉</span></Button>{' '}
      </Form>
    </div>
    <ul>
    </ul>
    </>
    
  )
}

export default CommentInput