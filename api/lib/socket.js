import { Server } from "socket.io";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL, "http://localhost:5173"],
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
    console.log(`User connected. Socket ID: ${socket.id}`);

    socket.on("newUser", (userId) => {
      addUser(userId, socket.id);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
      const receivedUser = getUser(receiverId);
      if (!receivedUser) {
        console.log(`User with ID ${receiverId} not found.`);
        return; // Exit early if user is not found
      }

      const { socketId } = receivedUser;
      if (socketId) {
        io.to(socketId).emit("getMessage", data);
      } else {
        console.log(`Socket ID not found for user with ID ${receiverId}`);
      }
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log(`User disconnected. Socket ID: ${socket.id}`);
    });
  });

  return io;
};

export default setupSocket;
