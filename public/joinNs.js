function joinNs(endpoint) {
  const nsSocket = io("http://localhost:9000/wiki");
  nsSocket.on("nsRoomLoad", (nsRooms) => {
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    nsRooms.forEach((room) => {
      let glpyh;
      if (room.privateRoom) glpyh = "lock";
      else glpyh = "globe";
      return (roomList.innerHTML += ` <li class='room'><span class="glyphicon glyphicon-${glpyh}"></span>${room.roomTitle}</li>`);
    });
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log("clicked on ", e.target.innerText);
      });
    });
  });

  nsSocket.on("messageToClients", (msg) => {
    console.log(msg);
    document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
  });

  document
    .querySelector(".message-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newMessage = document.querySelector("#user-message").nodeValue;
      socket.emit("newMessageToServer", { text: newMessage });
    });
}