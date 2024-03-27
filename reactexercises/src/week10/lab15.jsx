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



const Lab15 = (props) => {

    const initialState = {
        msg: "",
        roomMsg: "",
        snackBarMsg: "",
        contactServer: false,
        selectedUser: null,
    };

    const reducer = (state, newState) => ({ ...state, ...newState });

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
    }


    const serverConnect = () => {
        try {
            setState({
                snackBarMsg: `Connecting to server`,
                contactServer: true,
            });

            const newSocket = io.connect("localhost:5000", {
                forceNew: true,
                transports: ["websocket"],
                autoConnect: true,
                reconnection: false,
                timeout: 5000,
            });

            newSocket.on("welcome", onWelcome);
            newSocket.on("newclient", newClientJoined);

            newSocket.emit("join", { name: username, room: roomName }, (err) => { });

            setSocket(newSocket);
            setState({ msg: username + " joined" });

            if (newSocket.io._readyState === "opening") {
                setState({ snackBarMsg: "trying conneciton.." });
            }

        } catch (err) {
            console.log(err);
            setState({ snackBarMsg: "Can't get connection - try later!", });
            setState({ msg: "" });
        }
    };

    const onWelcome = (welcomeMsgFromServer) => {
        console.log("welcomed?" + welcomeMsgFromServer)
        setState({ snackBarMsg: welcomeMsgFromServer });

    };
    const newClientJoined = (joinMsgFromServer) => {
        console.log("client joined? " + joinMsgFromServer)
        setState({ msg: joinMsgFromServer })
    };

    const snackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

    };


    return (
        <ThemeProvider theme={theme}>
            <Card className="card">
                <CardHeader
                    title="Ex #3 - Full Stack JavaScript"
                    style={{ color: theme.palette.primary.main, textAlign: "center" }}
                />
                <CardContent>
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
                        Lab 15 - Socket.io
                    </Typography>

                    <br></br>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField
                            label="Enter user's name here"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

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
                {/* {message} */}
                <Typography color="error">{state.msg}</Typography>

            </Typography>
            <Snackbar
                open={state.contactServer}
                message={state.snackBarMsg}
                autoHideDuration={3000}
                onClose={snackbarClose}
            />
        </ThemeProvider>

    )

    // <Button
    // color="primary"
    // variant="contained"
    // onClick={sendParentSomeData}
    // >
    // Return Data
    // </Button>
};


export default Lab15;
