const express = require("express");
const app = express();
const socketio = require("socket.io");
const expressServer = app.listen(9000);
app.use(express.static(__dirname + "/public"));

const io = socketio(expressServer);

let namespaces = require("./data/namespaces");

io.on("connection", (socket) => {
  //build an array to send back with img to the end point of each namespace
  let nsData = namespaces.map((ns) => ({ img: ns.img, endpoint: ns.endpoint }));
  //send the ns data to back to the client
  socket.emit("nsList", nsData);
});

namespaces.map((e) => {
  io.of(e.endpoint).on("connection", (nsSocket) => {
    console.log(`connected the ${nsSocket.id} with ${e.endpoint}`);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
  });
});
