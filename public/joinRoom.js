function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    //this is a acknoweledgement callback that we will pass to the server once we have joinde
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
  });
}
