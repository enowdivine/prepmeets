const onlineSessionLogic = (io: any) => {
  // online session logic
  // io.on("connection", (socket: any) => {
  //   socket.emit("me", socket.id);

  //   socket.on("disconnect", (socket: any) => {
  //     socket.broadcast.emit("callEnded");
  //   });

  //   socket.on("callUser", (data: any) => {
  //     io.to(data.userToCall).emit("callUser", {
  //       signal: data.signal,
  //       from: data.from,
  //       name: data.name,
  //     });
  //   });

  //   socket.on("answerCall", (data: any) => {
  //     io.to(data.to).emit("callAccepted"), data.signal;
  //   });
  // });

  io.on("connection", (socket: any) => {
    socket.on("join-room", (roomId: string, userId: string) => {
      socket.join(roomId);
      io.to(roomId).broadcast.emit("user-connected", userId);

      socket.on("disconnect", () => {
        io.to(roomId).broadcast.emit("user-disconnected", userId);
      });
    });
  });
};

export default onlineSessionLogic;
