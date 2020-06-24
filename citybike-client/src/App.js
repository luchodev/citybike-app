import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Map, TileLayer } from "react-leaflet";
import MapNode from "./MapNode";

class App extends Component {
   constructor() {
      super();

      this.state = {
         network: {
            endpoint: "http://127.0.0.1:4001",
            lat: 25.790654,
            lng: -80.1300455,
            zoom: 13,
         },
         stations: [],
      };
   }
   componentDidMount() {
      const { endpoint } = this.state.network;
      const socket = socketIOClient(endpoint);

      socket.on("message", (data) => {
         this.setState({
            stations: data,
         });
         console.log("Data received");
      });
   }

   render() {
      const position = [this.state.network.lat, this.state.network.lng];

      return (
         <div className="map">
            <h1 className="map-title"> City Bikes in Miami </h1>
            <Map
               className="map-content"
               center={position}
               zoom={this.state.network.zoom}
            >
               <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               {this.state.stations.map((station) => (
                  <MapNode {...station} />
               ))}
            </Map>
         </div>
      );
   }
}

export default App;
