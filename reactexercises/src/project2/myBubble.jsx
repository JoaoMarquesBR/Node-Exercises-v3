import "../App.css";
const MyBubble = (props) => {
  return (
    <div className="userBubble" style={{ backgroundColor: props.color }}>
      <div style={{ fontWeight: "bold" }}>{props.user.name} says:  {props.user.date}</div>
      <div>{props.user.msg}</div>
    </div>
  );
};
export default MyBubble;

