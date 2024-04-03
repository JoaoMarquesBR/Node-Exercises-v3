import React from "react";
import TrafficLight from "./trafficlight";
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
        marginTop:"20vh"
    },
};


const AllStreets = () => {
    return(
        
        <div style={styles.flexContainer}>
        <TrafficLight street="Joao" />
        <TrafficLight street="Marques" />
        <TrafficLight street="Info3139" />
    </div>
    )
}

export default AllStreets;

// note - using a functional component here
// const AllRooms = () => (
//  <div>
//  <SocketClient name="some geek" room="geeks" />
//  <SocketClient name="some nerd" room="nerds" />
//  <SocketClient name="bigger nerd" room="nerds" />
//  <SocketClient name="bigger geek" room="geeks" />
//  </div>
// );
// export default AllRooms;
