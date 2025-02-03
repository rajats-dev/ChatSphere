import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("message", async (data) => {
      console.log(data);
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  });
}
