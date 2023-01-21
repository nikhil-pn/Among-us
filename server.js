const { isObject } = require("util");

const app = require("express")();

const httpServer = require("http").Server(app);

const sock = require("socket.io")(httpServer, {
  cors: {
    origins: ["https://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("Player Disconnected");
  });

  socket.on("move", ({ x, y }) => {
    socket.broadcast.emit("move", { x, y });
  });

  socket.on("moveEnd", () => {
    socket.broadcast.emit("moveEnd");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is Running");
});
