import { useEffect, useRef } from "react";
import { ListItem } from "@mui/material";
import Bubble from "../week13/bubble";
import Triangle from "../week13/triangle";
const UserMessage = (props) => {
  const userRef = useRef(null);
  useEffect(() => {
    userRef.current.scrollIntoView(true);
  }, []);
  return (
    <div>
      <ListItem
        ref={userRef}
        style={{ textAlign: "left", marginBottom: "2vh" }}
      >
        <Bubble user={props.user} color="rgba(65, 117, 5, 1)" />
        <Triangle color={"rgba(65, 117, 5, 1)"} />
      </ListItem>
      <p></p>
    </div>
  );
};
export default UserMessage;

