import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUser = []; // mỗi 1 lần vào link thì user với socket id được tạo tương ứng sẽ được lưu
// vào array này và có thể truy xuất tương ứng.
let messStore = null; // Tất cả các mess được gửi từ client sẽ đưa vào đây> biến nó thành 1 kho lưu trữ như MongoDB
let notiTest = null;

const addNewUser = (userName, socketId) => {
  if (
    !onlineUser.some((user) => {
      return user.userName === userName;
    })
  ) {
    if (userName) {
      onlineUser.push({
        userName: userName,
        socketId: socketId,
      });
    }
  }
};

const removeUser = (socketId) => {
  console.log(socketId, "da roi di");
  onlineUser = onlineUser.filter((user) => {
    return user.socketId !== socketId;
  });
};

const getUser = (userName) => {
  return onlineUser.find((user) => user.userName === userName);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userName) => {
    addNewUser(userName, socket.id);
    console.log("online user laf: ", onlineUser);
  });

  //socket message
  /* 
     // khi gui data từ client về server sẽ phải kèm {senderId, reciever, mess} -> 2 id để lấy dk socketId tương ứng
     --> tạo method để đẩy mess to client tuong ung.
     1. method get message from sender (on)*/
  socket.on("getMessageClient", (dataClient) => {
    messStore = {
      conversationId: dataClient.conversationId,
      sender: dataClient.sender,
      text: dataClient.text,
      reciever: dataClient.reciever,
      isRead: true,
      createdAt: Date.now(),
      senderName: dataClient.nameOtherUser,
    };
    console.log(messStore);
    /*
     2. method send message to reciever (emit)
    */
    let otherUser = getUser(messStore.reciever);
    socket.to(otherUser.socketId).emit("sendMessageServer", messStore);
    // tao notify an hien
    socket
      .to(otherUser.socketId)
      .emit("sendMessageServer_notyfi", messStore.senderName);
  });

  // send notify cho like, cmt, follow
  socket.on("getNotiClient", (dataNotiClient) => {
    console.log(dataNotiClient);
    let otherUser = getUser(dataNotiClient.otherUser);

    socket.to(otherUser.socketId).emit("sendNotiServer_notify", {
      senderUser: dataNotiClient.currUser,
      senderUserName: dataNotiClient.currUser_name,
      typeSend: dataNotiClient.type,
    });
  });

  socket.on("clickTest", ({ name }) => {
    const result = onlineUser.filter((user) => user.userName === name);
    const otherUser = onlineUser.filter((user) => user.userName !== name);
    notiTest = result[0].socketId;
    socket.to(otherUser[0].socketId).emit("sendId", notiTest);

    console.log(result[0].socketId);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("online user sua khi roi di  laf: ", onlineUser);
  });
});

io.listen(7000);
