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
import MaterialUIEx3Component from "./week7/class1/materialuiexample3";
import MaterialUIEx5Component from "./week7/class2/materialuiexample5";
import MaterialUIEx6Component from "./week7/class2/materialuiexample6";
import MaterialUIEx7a from "./week7/class2/materialuiexample7a";
import MaterialUIEx7b from "./week7/class2/materialuiexample7b";
import Lab13 from "./week7/class2/lab13";
import FunctionalStateHookComponentLab12 from "./week7/class1/lab12";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactQueryExample from "./week8/class1/reactqueryexample";
import SocketClient from "./week10/socketclient";
import AllRooms from "./week10/allrooms";
import Lab15 from "./week10/lab15";
import AllStreets from "./week11/street";
import ClientCase from "./project2/ClientCase";

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
                        INFO3139 - Socket IO
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
                        <MenuItem component={NavLink} to="/home" onClick={handleClose}>
                            Home
                        </MenuItem>
                        <MenuItem component={NavLink} to="/ex3" onClick={handleClose}>
                            Exercise #3
                        </MenuItem>
                        <MenuItem component={NavLink} to="/ex6" onClick={handleClose}>
                            Exercise #6
                        </MenuItem>
                        <MenuItem component={NavLink} to="/ex7" onClick={handleClose}>
                            Exercise #7
                        </MenuItem>
                        <MenuItem component={NavLink} to="/lab12" onClick={handleClose}>
                            Lab 12
                        </MenuItem>
                        <MenuItem component={NavLink} to="/lab13" onClick={handleClose}>
                            Lab 13
                        </MenuItem>
                        <MenuItem component={NavLink} to="/socketclient" onClick={handleClose}>
                            Socket Client
                        </MenuItem>
                        <MenuItem component={NavLink} to="/lab15" onClick={handleClose}>
                            Lab 15
                        </MenuItem>
                        <MenuItem component={NavLink} to="/lab17" onClick={handleClose}>
                            Lab 17
                        </MenuItem>
                        <MenuItem component={NavLink} to="/case2" onClick={handleClose}>
                            Case 2
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<MaterialUIEx5Component />} />
                <Route path="/home" element={<MaterialUIEx5Component />} />
                <Route path="/ex3" element={<MaterialUIEx3Component />} />
                <Route path="/ex6" element={<MaterialUIEx6Component />} />
                <Route path="/ex7" element={<MaterialUIEx7a />} />
                <Route path="/lab12" element={<FunctionalStateHookComponentLab12 />} />
                <Route path="/lab13" element={<Lab13 />} />
                <Route path="/socketclient" element={<AllRooms />} />
                <Route path="/lab15" element={<Lab15 />} />
                <Route path="/lab17" element={<AllStreets />} />
                <Route path="/case2" element={<ClientCase />} />

            </Routes>
        </ThemeProvider>
    );
};
export default App;
