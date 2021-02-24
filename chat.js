const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9001);

const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "welcome to the server" });
  socket.on("newMessageToServer", (data) => {
    io.emit("messageToClients", { text: data.text });
  });
});
