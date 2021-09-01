import express from "express";
import dotenv from "dotenv";
import socket from "socket.io";
import color from "colors";
import cors from "cors";
import { get_Current_User, join_User, user_Disconnect } from "./dummyuser";

dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT: string | number = process.env.PORT || 5000;

var server = app.listen(Number(PORT), () =>
  console.log(`Server is running on the port no: ${PORT} `.green)
);

const io = new socket.Server(server);

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomname }) => {
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(p_user.room);

    // display a message to the user who have joined the room
    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `Welcome ${p_user.username}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username} has joined the chat`,
    });
  });

  // user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const p_user = get_Current_User(socket.id);
    if (p_user) {
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: text,
      });
    }
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has left the room`,
      });
    }
  });
});
