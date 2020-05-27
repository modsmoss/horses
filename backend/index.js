import express from "express";
import axios from "axios";
import socketIo from "socket.io";
import http from "http";

import config from "./config.js";

const app = express();
const server = http.Server(app);
const io = socketIo(server);

server.listen(process.env.NODE_PORT, () =>
  console.log(`Server is listening on ${process.env.NODE_PORT}`)
);

const sockets = [];

const poll = async () => {
  const response = await axios(config.axiosConfig);
  const { status, data } = response;

  if (status === 204) {
    console.log("No content");
    await poll();
  } else if (status === 200) {
    push(data);

    await poll();
  }
};

poll();

const push = data => {
  sockets.forEach(socket => {
    socket.emit("update", data);
  });
  console.log(data);
};

io.on("connection", socket => {
  console.log("connection");
  sockets.push(socket);
});
