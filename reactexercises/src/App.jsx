import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
    Toolbar,
    AppBar,
    Menu,
    MenuItem,
    IconButton,
    Typography,
} from "@mui/material";



import Project1Component from "./project1/project1component";
import ResetDataComponent from "./project1/resetData";
import ListAdvisoriesComponent from "./project1/listadvisories";
import AddAdvisoryComponent from "./project1/addadvisory";

// const queryClient = new QueryClient();
// const App = () => {
//     return (
//         <QueryClientProvider client={queryClient}>
//             <ReactQueryExample />
//         </QueryClientProvider>
//     );
// };

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        INFO3139 - Case #1
                    </Typography>
                    <IconButton
                        onClick={handleClick}
                        color="inherit"
                        style={{ marginLeft: "auto", paddingRight: "1vh" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={NavLink} to="/" onClick={handleClose}>
                            Home
                        </MenuItem>
                        <MenuItem component={NavLink} to="/resetdata" onClick={handleClose}>
                            Reset Data
                        </MenuItem>
                        <MenuItem component={NavLink} to="/addadivsory" onClick={handleClose}>
                            Add Advisory
                        </MenuItem>
                        <MenuItem component={NavLink} to="/listadvisories" onClick={handleClose}>
                            List Advisories
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<Project1Component />} />
                <Route path="/resetdata" element={<ResetDataComponent />} />
                <Route path="/addadivsory" element={<AddAdvisoryComponent />} />
                <Route path="/listadvisories" element={<ListAdvisoriesComponent />} />

            </Routes>
        </ThemeProvider>
    );
};
export default App;
