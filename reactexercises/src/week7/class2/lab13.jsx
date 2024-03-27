import React, { useReducer, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Snackbar,
    Typography,
    TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import theme from "../../theme";

const Lab13 = () => {
    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        users: [],
        selectedUser: null,
    };

    const reducer = (state, newState) => ({ ...state, ...newState });

    const [state, setState] = useReducer(reducer, initialState);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load users from server...",
            });
            let response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query { users{name,age,email} }" }),
            });
            let json = await response.json();

            const filteredUsers = json.data.users.filter(user => user.name !== "New User");

            setState({
                snackBarMsg: `Users loaded`,
                users: filteredUsers,
                contactServer: false,
            });
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    const handleUserSelect = (event, value) => {
        setState({ selectedUser: value });
        setMessage("You selected " + value.name + "This user can be contacted at " + value.email)
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
            <Card className="card">
                <CardHeader
                    title="Ex #3 - Full Stack JavaScript"
                    style={{ color: theme.palette.primary.main, textAlign: "center" }}
                />
                <CardContent>
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
                        Lab 13 - Search for User
                    </Typography>

                    <div>
                        <Typography color="error">{state.msg}</Typography>
                        <Autocomplete
                            value={state.selectedUser}
                            onChange={handleUserSelect}
                            options={state.users}
                            getOptionLabel={(user) => user.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search or Select"
                                    variant="outlined"
                                />
                            )}
                        />
                    </div>
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
                        {message}
                    </Typography>
                    
                </CardContent>
            </Card>
            <Snackbar
                open={state.contactServer}
                message={state.snackBarMsg}
                autoHideDuration={3000}
                onClose={snackbarClose}
            />
        </ThemeProvider>
    );
};

export default Lab13;
