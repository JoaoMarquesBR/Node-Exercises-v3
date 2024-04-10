import { useEffect, useRef } from "react";
import { ListItem } from "@mui/material";
import MyBubble from "./myBubble";
import MyTriangle from "./myTriangle";
const SingleUserMessage = (props) => {
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
        <MyBubble user={props.user} color="rgba(65, 117, 5, 1)" />
        <MyTriangle color={"rgba(65, 117, 5, 1)"} />
      </ListItem>
      <p></p>
    </div>
  );
};
export default SingleUserMessage;

