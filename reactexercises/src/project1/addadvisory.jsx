import React, { useReducer, useEffect, useState } from "react";
import {
    Card,
    Toolbar,
    CardHeader,
    CardContent,
    Snackbar,
    ThemeProvider,
    Autocomplete,
    TextField,
    Button,
    AppBar,
    Typography,
} from "@mui/material";
import "../App.css"
import theme from "../theme";
import { API_URL } from "../contants";

const AddAdvisoryComponent = () => {

    //data 
    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        users: [],
    };

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [travalerName, setTravelerName] = useState("");
    // const options = ["I", "LOve", "JavaScript", "COurses", "From", "Joao Marques"];
    const [country, setCountry] = useState("");
    const [options, setOptions] = useState([]);

    //functions
    useEffect(() => {
        loadRequestResetData();
    }, []);

    const handleClearWord = () => {
        setCountry("");
        setSentence("")
    };

    const handleWordChange = (event) => {
        setTravelerName(event.target.value);
    };

    const loadRequestResetData = async () => {
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load users from server...",
            });

            let myQuery = `
            query {
                alerts {
                    name,
                    text
                }
            }
        `
            let response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: myQuery
                }),

            });
            let json = await response.json();
            setState({
                snackBarMsg: `users loaded`,
                response: json.data.alerts,
                contactServer: true,
            });

            setOptions(json.data.alerts.map(x => x.name));

        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    const selectCountry = (value) => {
        setCountry(value)
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


    const addAdvisory = async()=>{
        let selectedCountry = state.response.find(x=>x.name == country)
        
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        const newAdvisory ={
            name: travalerName,
            country: selectedCountry.name,
            text: selectedCountry.text,
            date: formattedDate
        }

        

        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load users from server...",
            });

            let myQuery = `
    mutation {
      addOneAdvisory(
        name: "${newAdvisory.name}",
        country: "${newAdvisory.country}",
        date: "${newAdvisory.date}",
        text: "${newAdvisory.text}"
      ) {
        _id
        name
        country
        date
        text
      }
    }
  `;
            let response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: myQuery
                }),

            });
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }

    }

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
                        title="Add Advisory"
                        style={{ textAlign: "center" }}
                    />

                    <input
                        placeholder="Travaler's"
                        variant="outlined"
                        value={travalerName}
                        onChange={handleWordChange}
                    />


                    <Autocomplete
                        options={options}
                        renderInput={(params) => (
                            <TextField placeholder="Pick a word" {...params} label="Pick a word" variant="outlined" />
                        )}
                        onChange={(event, value) => selectCountry(value)}
                        // onClear={handleClearWord}
                        clearOnEscape
                    />


                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={addAdvisory}
                        style={{ marginLeft: '10px' }}
                    >
                        Add Advisory
                    </Button>


                </CardContent>

            </Card>
        </ThemeProvider>
    );
};


export default AddAdvisoryComponent;

