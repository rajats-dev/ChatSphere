import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  });
}
