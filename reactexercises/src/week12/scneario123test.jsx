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
import Autocomplete from "@mui/material/Autocomplete";
import theme from "../theme";

const Lab19 = (props) => {
  const initialState = {
    msg: [],
    roomMsg: "",
    snackBarMsg: "",
    contactServer: false,
    selectedUser: null,
    isTyping: false,
    typingMsg: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_MSG":
        return { ...state, msg: [...state.msg, action.payload] };
        case "UPDATE_CURRENT_MESSAGE":
          return { ...state, typingMsg: action.payload };
          default:
        return state;
    }
  };
  const [state, setState] = useReducer(reducer, initialState);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const [socket, setSocket] = useState(null);

  const effectRan = useRef(false);

  const joinRoom = () => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
  };

  const serverConnect = () => {
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

        newSocket.on("someoneistyping", onTyping);
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

  const onTyping = (resp) => {
    // console.log("typing was called "+ msg);

    if (resp.from !== state.chatName) {
      setState({ type: "UPDATE_CURRENT_MESSAGE", payload: `${resp.msg}` });
    }
   
  };

  const userLeft = (message) => {
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
    setState({ message: e.target.value });
    if (socket && !state.isTyping) { 
      console.log("sending emit")
      socket.emit("typing", { from: username }, (err) => {});
      setState({ isTyping: true });
    }else{
      console.log("socket isn't defined")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Socket IO Tests"
          style={{ color: theme.palette.primary.main, textAlign: "center" }}
        />
        <CardContent>
          <Typography variant="body1" style={{ marginTop: "20px" }}>
            Scenarios 1,2 and 3 Test
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

      <Typography variant="body1" style={{ marginTop: "20px" }}>
        <TextField
          onChange={onMessageChange}
          placeholder="type something here"
          autoFocus={true}
          required
        />

        {state.msg.map((message, index) => (
          <div key={index}>
            <Typography color="error">{message}</Typography>
          </div>
        ))}

        
      </Typography>

      <div>
          <Typography color="primary">{state.typingMsg}</Typography>
        </div>

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

export default Lab19;
