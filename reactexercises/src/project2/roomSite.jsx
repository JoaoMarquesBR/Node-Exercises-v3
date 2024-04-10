import React from "react";
import { useLocation } from "react-router-dom";

const ClientCase = () => {
  const location = useLocation();
  const { username, roomName } = location.state;

  // Do something with username and roomName, like joining the room

  return (
    <div>
      <h2>Client Case</h2>
      <p>Username: {username}</p>
      <p>Room Name: {roomName}</p>
    </div>
  );
};

export default ClientCase;
