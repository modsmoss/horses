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
const state = {
  running: false,
  raceCount: 0,
};

const poll = async () => {
  const response = await axios(config.axiosConfig);
  const { status, data } = response;

  if (status === 204) {
    console.log("No content");
    poll();
  } else if (status === 200) {
    if (!state.running && data.event === "start") {
      state.raceCount++;
      state.running = true;
    } else if (data.event === "finish") {
      state.running = false;
    }

    push(data);

    poll();
  }
};

poll();

const push = data => {
  sockets.forEach(socket => {
    socket.emit("update", { ...data, raceCount: state.raceCount });
  });
  console.log(data);
};

io.on("connection", socket => {
  sockets.push(socket);
  console.log("connection", socket.id);
  io.on("disconnect", () => {
    sockets.splice(sockets.indexOf(socket, 1));
    console.log("diconnected", socket.id);
  });
});
