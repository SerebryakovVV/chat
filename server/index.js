const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
});

io.on("connection", (socket)=>{
    socket.on("join", (data)=>{
        socket.join(data.room);
    })
    socket.on("send", (data)=>{
        socket.to(data.room).emit("receive", data);
    })
    socket.on("leave", (room)=>{
        socket.leave(room);
    })
});

server.listen(3001, ()=>{console.log("started")});