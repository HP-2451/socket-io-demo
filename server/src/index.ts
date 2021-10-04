import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true
  } });

io.on("connection", (socket: Socket) => {
//  console.log(socket.id);
    socket.on('message', (message, room) =>{
      // console.log(message);
      if(room == '')
      socket.broadcast.emit("send-message", message)
      else
      socket.to(room).emit("send-message", message)
    })

    socket.on('join-room', (room) => {
      socket.join(room)
    })
});

httpServer.listen(4000, () => {
  console.log("Server is running at 4000");
});