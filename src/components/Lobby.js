import React from 'react';

const Lobby = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter video call</h2>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
