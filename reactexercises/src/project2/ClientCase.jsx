import io from "socket.io-client";
import React, { useReducer, useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Snackbar,
  Typography,
  TextField,
} from "@mui/material";
import theme from "../theme";
import MyMessageList from "./myMessageList";

// import userjson from "../week13/user.json"
import userjson from "./messages.json";

const ClientCase = (props) => {
  const initialState = {
    msg: [],
    roomMsg: "",
    snackBarMsg: "",
    contactServer: false,
    selectedUser: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_MSG":
        return { ...state, msg: [...state.msg, action.payload] };
      default:
        return state;
    }
  };

  const [users, setUsers] = useState([]);
  const [state, setState] = useReducer(reducer, initialState);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [socket, setSocket] = useState(null);

  const effectRan = useRef(false);

  useEffect(() => {
    stablishFirstConnection();
    setUsers(userjson);
  }, []);

  //used to "prepare" any kind of preparation required such as room list and etc
  const stablishFirstConnection = () => {
    console.log("x");
    try {
      console.log("x1");

      const newSocket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        connect_timeout: 5000,
        timeout: 5000,
      });

      console.log("x2");

      newSocket.on("connect", () => {
        newSocket.emit("firstConnect", {}, (err) => {});

        newSocket.on("availableRooms", (availableRooms) => {
          console.log("available rooms are ");
          console.log(availableRooms);
          setAvailableRooms(availableRooms);
        });
      });
      
    } catch (err) {
      console.log(err);
    }
  };

  const joinRoom = () => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
    setJoinedRoom(true);
  };

  const serverConnect = () => {
    console.log("xxxxx")
    try {
      const newSocket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        connect_timeout: 5000,
        timeout: 5000,
      });

      newSocket.on("connect", () => {
        console.log("connecting");

        newSocket.on("welcome", onWelcome);

        newSocket.emit("join", { name: username, room: roomName }, (err) => {});

        newSocket.on("message", (message) => {
          console.log(message);
          setState({ type: "UPDATE_MSG", payload: message });
        });

        newSocket.on("nameAlreadyInUse", (message) => {
          console.log(message);
          setMessage(message);
        });
       
        newSocket.on("newMessage", (messageArrival) => {
          console.log(messageArrival); 
          userjson.push(messageArrival); 
        });

      });

      newSocket.on("newUser", newClientJoined);
      newSocket.on("userLeft", userLeft);

      setSocket(newSocket);
    } catch (err) {
      console.log(err);
      setState({ snackBarMsg: "Can't get connection - try later!" });
      setState({ msg: "" });
    }
  };
  const userLeft = (message) => {
    console.log("user was left?")
    console.log(message);
    setState({ type: "UPDATE_MSG", payload: message });
  };

  const onWelcome = (welcomeMsgFromServer) => {
    console.log("welcomed?" + welcomeMsgFromServer);
    setState({ snackBarMsg: welcomeMsgFromServer });
  };
  const newClientJoined = (joinMsgFromServer) => {
    console.log("new client : " + joinMsgFromServer);
    setState({ type: "UPDATE_MSG", payload: joinMsgFromServer });
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const onMessageChange = (e) => {
    setTypedMessage(e.target.value);
    if (socket && !isTyping) {
      socket.emit("typing", { from: username });
      setIsTyping(true);
    }
  };

  const onTyping = (resp) => {
    socket.emit("typing", { from: username });

    setTypedMessage(resp.msg);
    setIsTyping(true);
  };

  const sendMessage = () => {
    console.log("send message")

    setTypedMessage("")


    console.log("sending as "+ username)
    socket.emit("receiveMessage", { username: username ,roomName : roomName ,msg: typedMessage });

    const currentDate = new Date();

  const userOwnMessage = {
    name: username,
    email: "eva_lau@here.com",
    date: currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
    msg: typedMessage,
    color:"green"
  };


    userjson.push(userOwnMessage)

  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="body1" style={{ marginTop: "20px" }}>
        x
      </Typography>
      {joinedRoom ? (
        <Card>
          <MyMessageList users={users} />

          <TextField
            label="Enter message"
            variant="outlined"
            value={typedMessage}
            onChange={onMessageChange}
          />
          <Button color="primary" variant="contained" onClick={sendMessage}>
            Send
          </Button>

        </Card>
      ) : (
        <Card className="card">
          <CardHeader
            title="Socket IO Tests"
            style={{ color: theme.palette.primary.main, textAlign: "center" }}
          />
          <CardContent>
            <Typography variant="body1" style={{ marginTop: "20px" }}>
              Socket IO Tests : j_marquesdossantos
            </Typography>

            <br></br>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <TextField
                label="Enter user's name here"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Typography style={{ color: "red" }}>{message}</Typography>

              <TextField
                label="Enter room to join here"
                variant="outlined"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>

            <br></br>
            <ul>
              {availableRooms.map((roomName) => (
                <li
                  key={roomName}
                  onClick={() => setRoomName(roomName)}
                  style={{
                    cursor: "pointer",
                    textDecoration:
                      roomName === roomName ? "underline" : "none",
                  }}
                >
                  {roomName}
                </li>
              ))}
            </ul>

            <br></br>
            <Button
              color="primary"
              variant="contained"
              disabled={!username || !roomName}
              onClick={joinRoom}
            >
              Join Room
            </Button>
          </CardContent>
        </Card>
      )}

      <Typography variant="body1" style={{ marginTop: "20px" }}>
        {state.msg.map((message, index) => (
          <div key={index}>
            <Typography color="error">{message}</Typography>
          </div>
        ))}
      </Typography>

      <Snackbar
        open={state.contactServer}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );

  // <Button
  // color="primary"
  // variant="contained"
  // onClick={sendParentSomeData}
  // >
  // Return Data
  // </Button>
};

export default ClientCase;
