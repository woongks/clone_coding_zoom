import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const handleListen = () => console.log("Listening on port 3000");
//app.listen(3000, handleListen);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  sockets.push(socket);
  console.log("connected to browser");
  socket.on("close", () => console.log("Disconnected from the Browser"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`),
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
}); // connection 이벤트가 발생하면 handleConnection 함수를 실행. on 메서드는 콜백 함수에 socket을 넘겨준다. 소켓은 사용자와 서버의 연결 혹은 연결에 대한 정보를 의미.

server.listen(3000, handleListen); // http와 웹소켓 프로토콜을 하나의 포트에서 사용하려면 http 서버 위에 웹소켓 서버를 만들어 준다.
