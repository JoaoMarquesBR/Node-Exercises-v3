import { List } from "@mui/material";
// import UserMessage from "./singleMessage";
import SingleUserMessage from "./singleMessage"

const MyMessageList = (props) => {

 let users = props.users.map((user, idx) => {
 return <SingleUserMessage key={idx} user={user} />;
 });
 return <List>{users}</List>;
}

export default MyMessageList;