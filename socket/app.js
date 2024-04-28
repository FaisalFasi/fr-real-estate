import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExist = onlineUsers.find((u) => u.userId === userId);
  if (!userExist) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log("Receiver ID:", receiverId, "Data:", data);

    const receivedUser = getUser(receiverId);
    if (!receivedUser) {
      console.log(`User with ID ${receiverId} not found.`);
      return; // Exit early if user is not found
    }

    console.log("Received User:", receivedUser);

    const { socketId } = receivedUser;
    if (socketId) {
      io.to(socketId).emit("getMessage", data);
      console.log("Message sent to receiver:", receiverId);
    } else {
      console.log(`Socket ID not found for user with ID ${receiverId}`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`User disconnected. Socket ID: ${socket.id}`);
  });
});

io.listen(4000, () => {
  console.log("Socket.io server listening on port 4000");
});

// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// let onlineUsers = [];

// const addUser = (userId, socketId) => {
//   const userExist = onlineUsers.find((u) => u.userId === userId);
//   if (!userExist) {
//     onlineUsers.push({ userId, socketId });
//   }
// };
// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return onlineUsers.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   socket.on("newUser", (userId) => {
//     addUser(userId, socket.id);
//   });

//   socket.on("sendMessage", ({ receiverId, data }) => {
//     console.log("REceiverID", receiverId, data);

//     const receivedUser = getUser(receiverId);
//     if (!receivedUser) {
//       console.log(`User with ID ${receiverId} not found.`);
//       return; // Exit early if user is not found
//     }
//     console.log("Received User:", receivedUser);
//     console.log("Data:", data);

//     if (receivedUser.socketId) {
//       io.to(receivedUser.socketId).emit("getMessage", data);
//     } else {
//       console.log(`Socket ID not found for user with ID ${receiverId}`);
//     }
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });

// io.listen("4000");
