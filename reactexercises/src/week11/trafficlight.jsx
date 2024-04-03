import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import io from "socket.io-client";
import { stepConnectorClasses } from "@mui/material";

const TrafficLight = (props) => {

    const streetName = props.street;

    const [color, setColor] = useState("red");
    const [connectionStatus, setConnectionStatus] = useState("connecting");
    const [socket, setSocket] = useState(null);
    const effectRan = useRef(false);


    useEffect(() => {
        if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
        serverConnect();
        effectRan.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const serverConnect = () => {
        try {
            // const socket = io.connect("localhost:5000", {
            //     forceNew: true,
            //     transports: ["websocket"],
            //     autoConnect: true,
            //     reconnection: false,
            //     connect_timeout: 5000, 
            //     timeout: 5000,
            // });
            const socket = io.connect();
            setSocket(socket);


            socket.on("connect", () => {
                console.log("connecting")
                socket.emit("join", { name: streetName }, (err) => { });
                setConnectionStatus("connected");

                socket.emit("turnLampOn", streetName ,(callBack) => {
                    console.log(callBack)//street returned
                    handleTurnLampOn(callBack,socket)
                });


            });


            socket.on("connect_error", (error) => {
                console.log("Connection attempt failed:", error.message);
                setConnectionStatus("can't connect");
            });


        } catch (error) {
            console.log(error)
        }

    }

    const styles = {
        light: {
            border: "solid",
            width: "4.25rem",
        },
        lamp: {
            height: "3rem",
            width: "3rem",
            borderStyle: "solid",
            borderWidth: "2px",
            borderRadius: "50%",
        },
        flexContainer: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100vw",
            marginLeft: "3vw",
            marginBottom: "50vh",
        },
    };

    const getStateColor = (c) => (color === c ? color : "white");

    const handleTurnLampOn = async (lampData, socket) => {
        socket.disconnect(); // don't need server anymore once we have data
        while (true) { // loop until browser closes
            // wait on current colour, then set next color
            await waitSomeSeconds(lampData.red, "green");
            await waitSomeSeconds(lampData.green, "yellow");
            await waitSomeSeconds(lampData.yellow, "red");
            // .. green and yellow lamps go here
        }
    };

    const waitSomeSeconds = (waitTime, nextColorToIlluminate) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setColor(nextColorToIlluminate);
                // update state variable
                resolve();
            }, waitTime);
        });
    };

    return (
        <div>
            <div style={{ textAlign: "center", fontName: "Helvetica", marginTop: "01.5rem" }}>
                {connectionStatus}
            </div>
            <div style={styles.light}>
            <div style={{ ...styles.lamp, backgroundColor: getStateColor("red"), margin: ".5rem" }} />
            <div style={{ ...styles.lamp, backgroundColor: getStateColor("yellow"), margin: ".5rem" }} />
            <div style={{ ...styles.lamp, backgroundColor: getStateColor("green"), margin: ".5rem" }} />
            <div style={{ textAlign: "center", fontName: "Helvetica" }}>{streetName}</div>
            </div>
            
        </div>
    );


};

export default TrafficLight;
