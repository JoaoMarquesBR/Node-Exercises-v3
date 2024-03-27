import React, { useState, useReducer, useEffect } from "react";
import {
    Card,
    Toolbar,
    CardHeader,
    CardContent,
    Snackbar,
    ThemeProvider,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    AppBar,
    Typography,
    Autocomplete,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel
} from "@mui/material";
import theme from "../theme";
import { API_URL } from "../contants";

const ListAdvisoriesComponent = () => {
    // State initialization
    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        users: [],
        adverseries: [],
        countries: []
    };
    const [selectedOption, setSelectedOption] = useState("");
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [countryList, setCountries] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [travelers, setTravelers] = useState([]);
    const [selectedTraveler, setSelectedTraveler] = useState(null);
    const [alertsData, setAlertsData] = useState([]);
    const [alertsDataFiltered, setAlertsDataFiltered] = useState([]);
    const [selectedSearchValue, setSelectedSearchValue] = useState("Pick a Travellers");


    // Event handlers
    const handleSelectChange = async (event) => {
        console.log("selected")
        setSelectedOption(event.target.value);
        console.log(event.target.value)
        switch (event.target.value) {
            case "Traveler":
                await findTravelers();
                break;
            case "Region":
                setSelectedSearchValue("Region");
                await findRegions();
                break;
            case "Subregion":
                setSelectedSearchValue("Sub-Region");
                await findSubRegions();
                break;
            // Add cases for other options if needed
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




    const handleTravelerChange = async (event, newValue) => {
        console.log(selectedOption)
        switch (selectedOption) {
            case "Traveler":
                const travellerAlerts = alertsData.filter(x => x.traveller === newValue);
                setAlertsDataFiltered(travellerAlerts);
                break;
            case "Region":
                setSelectedSearchValue("Region");
                console.log("\n\nregion")
                const filteredAlerts = countryList.filter(x => x.region == newValue)
                console.log(filteredAlerts)

                const loadedALerts = filteredAlerts.map((alert, index) => ({
                    id: index + 1, // Adding 1 to index to start ids from 1
                    header1: alert.name,
                    header2: alert.text,
                }));
                setAlertsDataFiltered(loadedALerts)
                break;
            case "Subregion":
                setSelectedSearchValue("Sub-Region");
                console.log("\n\sub-region")

                console.log(countryList)
                // console.log()

                const filteredAlertsByRegion = countryList.filter(x => x.subregion == newValue)
                console.log(filteredAlertsByRegion)

                const loadedALertsSubregion = filteredAlertsByRegion.map((alert, index) => ({
                    id: index + 1, // Adding 1 to index to start ids from 1
                    header1: alert.name,
                    header2: alert.text,
                }));
                setAlertsDataFiltered(loadedALertsSubregion)
                break;
            // Add cases for other options if needed
        }


    };


    // Fetch data functions
    const loadALlAlerts = async () => {
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load all alerts...",
            });
            const myQuery = `
                query {
                    alerts {
                        name,
                        text,
                        region,
                        subregion
                    }
                }
            `;
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: myQuery }),
            });
            const json = await response.json();
            setCountries(json.data.alerts)
            setState({
                contactServer:true,
                snackBarMsg:"TOtal of "+ json.data.alerts.length+" alerts"
            })
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    const findTravelers = async () => {
        await loadALlAlerts();
        console.log("x20")
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load travellers from server...",
            });

            const myQuery = `
                query {
                    adviseries { name, country,text }
                }
            `;
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: myQuery }),
            });
            const json = await response.json();
            let travelersList = json.data.adviseries
            setFilteredList(travelersList.map(x => x.name))
            setTravelers(travelersList)
            const loadedALerts = travelersList.map((traveler, index) => ({
                id: index + 1, // Adding 1 to index to start ids from 1
                header1: traveler.country,
                header2: traveler.text,
                traveller: traveler.name
            }));
            setAlertsData(loadedALerts)

            setState({
                contactServer: true,
                snackBarMsg: "Loaded "+ travelersList.length+" travellers from server",
            });
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    const findRegions = async () => {
        console.log("y")
        await loadALlAlerts();
        console.log("x")
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load all regions from server...",
            });

            const myQuery = `
                query {
                    regions 
                }
            `;
            console.log("attempt for "+ API_URL)
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: myQuery }),
            });
            const json = await response.json();
            let regionsList = json.data.regions
            setFilteredList(regionsList)
            setState({
                contactServer: true,
                snackBarMsg: "Loaded "+regionsList.length+" regions.",
            });
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    const findSubRegions = async () => {
        await loadALlAlerts();
        try {
            setState({
                contactServer: true,
                snackBarMsg: "Attempting to load subregions from server...",
            });

            const myQuery = `
                query {
                    subregions 
                }
            `;
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: myQuery }),
            });
            const json = await response.json();
            let subregionsList = json.data.subregions
            setFilteredList(subregionsList)
            setState({
                contactServer: true,
                snackBarMsg: "Loaded "+ subregionsList.length+" subregions.",
            });
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    const loadAllAlerts = async () => {
        // await loadALlAlerts();
        try {
            const myQuery = `
                query {
                    adviseries { name, country,text }
                }
            `;
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: myQuery }),
            });
            const json = await response.json();
            let travelersList = json.data.adviseries
            setFilteredList(travelersList.map(x => x.name))
            const loadedALerts = travelersList.map((traveler, index) => ({
                id: index + 1, // Adding 1 to index to start ids from 1
                header1: traveler.country,
                header2: traveler.text,
                traveller: traveler.name
            }));
            setAlertsData(loadedALerts)
        } catch (error) {
            console.log(error);
            setState({
                msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    useEffect(() => {
        loadAllAlerts();
    }, []);

    // Render
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
                    <img
                        style={{ width: "200px", height: "200px" }}
                        src="https://image.similarpng.com/very-thumbnail/2021/08/Illustration-of-Travel-agency-logo-design-template-on-transparent-background-PNG.png"
                        alt="Travel logo image"
                    />
                    <CardHeader
                        title="Joao's Airlanes Alerts"
                        style={{ textAlign: "center" }}
                    />
                    <CardHeader
                        title="List Advisories By:"
                        style={{ textAlign: "center" }}
                    />
                    <RadioGroup
                        id="selectOption"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        style={{ display: "inline", justifyContent: "center" }}
                    >
                        <FormControlLabel
                            value="Traveler"
                            control={<Radio />}
                            label="Traveler"
                        />
                        <FormControlLabel
                            value="Region"
                            control={<Radio />}
                            label="Region"
                        />
                        <FormControlLabel
                            value="Subregion"
                            control={<Radio />}
                            label="Sub-region"
                        />
                    </RadioGroup>
                    <p>Selected option: {selectedOption}</p>
                    <Autocomplete
                        options={filteredList}
                        onChange={handleTravelerChange}
                        renderInput={(params) => (
                            <TextField
                                placeholder={selectedSearchValue}
                                {...params}
                                label={selectedSearchValue}
                                variant="outlined"
                            />
                        )}
                        clearOnEscape
                    />

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Alert Information</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {alertsDataFiltered.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.header1}</TableCell>
                                        <TableCell>{item.header2}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Snackbar
                        open={state.contactServer}
                        message={state.snackBarMsg}
                        autoHideDuration={3000}
                        onClose={snackbarClose}
                    />

                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default ListAdvisoriesComponent;
