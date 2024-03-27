import React, { useReducer, useEffect, useState } from "react";
import {
    Card,
    Toolbar,
    CardHeader,
    CardContent,
    Snackbar,
    ThemeProvider,
    AppBar,
    Typography,
} from "@mui/material";
// import {
//     Autocomplete,
//     Card,
//     AppBar,
//     CardHeader,
//     ThemeProvider,  
//     Toolbar,
//     CardContent,
//     Typography,
//     TextField,
// } from "@mui/material";


import "../App.css"
import theme from "../theme";
import { API_URL } from "../contants";

const ResetDataComponent = () => {
    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        users: [],
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log("x")
        loadRequestResetData();
    }, []);
    const loadRequestResetData = async () => {
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load users from server...",
            });
            console.log(API_URL)
            let response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: `
                        query {
                            project1_setup {
                                result
                            }
                        }
                    `
                }),


            });
            console.log("response was ...")
            console.log(response)
            let json = await response.json();
            console.log(json)
            console.log(json.data.project1_setup.result);

            console.log("xx")
            setState({
                snackBarMsg: `users loaded`,
                response: json.data.project1_setup.result,
                contactServer: true,
            });
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };
    const snackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setState({
            msg: `${state.users.length} users loaded`,
            contactServer: false,
        });
    };
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        INFO3139-Project1
                    </Typography>


                </Toolbar>
            </AppBar>

            <Card className="card">
                <CardContent>
                    <img style={{ width: "200px", height: "200px" }} src="https://image.similarpng.com/very-thumbnail/2021/08/Illustration-of-Travel-agency-logo-design-template-on-transparent-background-PNG.png" alt="Travel logo image" />

                    <CardHeader
                        title="Joao's Airlanes Alerts"
                        style={{ textAlign: "center" }}
                    />

                    <CardHeader
                        title="Alert Setup - Details"
                        style={{ textAlign: "center" }}
                    />


                    <p>{state.response}</p>

                </CardContent>

            </Card>
        </ThemeProvider>
    );
};


export default ResetDataComponent;

