import { List } from "@mui/material";
import User from "../week13/user";
import UserMessage from "./singleMessage";

const myMessageList = (props) => {

 let users = props.users.map((user, idx) => {
 return <UserMessage key={idx} user={user} />;
 });
 return <List>{users}</List>;
}

export default myMessageList;