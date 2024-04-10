import { List } from "@mui/material";
import User from "./user";
import UserMessage from "./usermessage";

const UserListMessageList = (props) => {

 let users = props.users.map((user, idx) => {
 return <UserMessage key={idx} user={user} />;
 });
 return <List>{users}</List>;
}

export default UserListMessageList;