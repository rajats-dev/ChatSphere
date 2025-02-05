import { Server, Socket } from "socket.io";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    console.log("Socket Connected", socket.id);

    // * Join the room
    socket.join(socket.room);

    socket.on("message", async (data) => {
      console.log("Server Side Message", data);

      // socket.broadcast.emit("message", data);
      io.to(socket.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnect", socket.id);
    });
  });
}
