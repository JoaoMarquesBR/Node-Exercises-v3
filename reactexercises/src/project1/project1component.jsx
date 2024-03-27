import React, { useState } from "react";
// import { AppBar, ThemeProvider,Toolbar, Card, Button, Typography, CardContent, Autocomplete, TextField } from "@mui/material";
import { API_URL } from "../contants";

import {
    Autocomplete,
    Card,
    AppBar,
    CardHeader,
    ThemeProvider,  
    Toolbar,
    CardContent,
    Typography,
    TextField,
} from "@mui/material";
import "../App.css"
import theme from "../theme";

const Project1Component = () => {
    const [selection, setSelection] = useState("");
    const onChange = (e, selectedOption) => {
        selectedOption
            ? setSelection(`You selected ${selectedOption}`)
            : setSelection("");
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

                    <Typography variant="body2" color="textSecondary" align="center">
                        © {new Date().getFullYear()} Joao Marques's Airlanes . All rights reserved.
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};


export default Project1Component;

