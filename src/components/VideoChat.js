import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import axios from 'axios'

const VideoChat = () => {
  const [token, setToken] = useState(null);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/api/v1/appointments/create_access',
        headers:
        {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
        .then(response => {
          setToken(response.data)
        })
    },
    []
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName="RemoteMed" token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
