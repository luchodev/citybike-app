const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach";
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server);
let interval = 5000;

io.on("connection", (socket) => {
   var socketId = socket.id;
   var clientIp = socket.request.connection.remoteAddress;
   console.log("New connection " + socketId + " from " + clientIp);
   socket.on("disconnect", () => {
      console.log("Client disconnected");
   });
});

setInterval(sendUpdateToClients, interval);

function sendUpdateToClients() {
   axios
      .get(citybikeurl)
      .then((response) => {
         let data = response.data.network.stations;
         console.log(`Emmiting at ${new Date().toLocaleString()}`);
         io.send(data);
      })
      .catch((err) => {
         console.log(`There was an error fetching the data = ${err}`);
      });
}

server.listen(port, () => console.log(`Listening on port ${port}`));
