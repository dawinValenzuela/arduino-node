const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const serialPort = require("serialport");

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

const port = new serialPort("/dev/cu.usbserial-1410", { baudRate: 9600 });
const Readline = serialPort.parsers.Readline;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));

//ROUTES
app.get("/", (req, res) => {
  res.status(200).render("base");
});

//  SOCKET
var brightness = 0;
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

io.sockets.on("connection", function(socket) {
  socket.on("led", function(data) {
    brightness = data.value;

    var buf = new Buffer.alloc(1);
    buf.writeUInt8(brightness, 0);
    port.write(buf);
    io.sockets.emit("led", { value: brightness });
  });

  socket.emit("led", { value: brightness });

  parser.on("data", function(data) {
    socket.emit("temp", data);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
