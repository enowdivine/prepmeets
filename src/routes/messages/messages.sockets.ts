import { io } from "../..";
import Messages from "./messages.model";

let users: any[] = [];

const addUser = (userId: any, socketId: any) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getUser = (userId: any) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId: any) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket: any) => {
  socket.on("addUser", (userId: any) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and receive messages
  socket.on(
    "sendMessage",
    async (data: {
      conversationId: any;
      senderId: any;
      receiverId: any;
      message: any;
    }) => {
      const { senderId, receiverId, message } = data;

      // Save message to database
      await Messages.create(data);

      // Get socket user from array
      const user = getUser(receiverId);

      // Send message to socket user
      io.to(user.socketId).emit("getMessage", data);
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
