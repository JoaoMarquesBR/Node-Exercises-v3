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
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100vw",
        marginTop: "2vh"
    },
    headerContainer: {
        marginTop:"10vh",
        textAlign: "center",
        width: "100%"
    }
};


const AllStreets = () => {
    return(
        <div>
        <div style={styles.headerContainer}>
            <h1>Lab 17</h1>
        </div>
        <div style={styles.flexContainer}>
            <TrafficLight street="Joao" />
            <TrafficLight street="Marques" />
            <TrafficLight street="Info3139" />
        </div>
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
