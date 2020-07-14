import React, { useState, useEffect } from 'react';
import axios from 'axios'
import LoadingIndicator from "../components/LoadingIndicator"

const UserImage = ({data}) =>{
  const [userPic, setUserPic] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${data}`)
    .then(result => {
      setUserPic(result.data)
      setLoading(false)
    })
    .catch(error => {
      console.log('ERROR: ', error)
  })
  }, [data])

  if (loading) {
    return (
    <LoadingIndicator width="100px" height="100px" color="#50c878" />
    )
  }

  return (
    userPic.map((item)=>{
      return (
      <div>
        <img className="userImg" src={item.url} alt=""/>
      </div>
      )
    })
    
  );
}

export default UserImage