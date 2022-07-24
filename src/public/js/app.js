// alert("hi!");

// const socket = new WebSocket("http://localhost:3000");
const socket = new WebSocket(`ws://${window.location.host}`); // JS 내장 객체 WebSocket을 이용해 소켓을 생성. 인자로는 연결되는 웹의 url을 담는다.

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("Just got this:", message.data, "from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from the server");
});

setTimeout(() => {
  socket.send("hello from browser!");
}, 5000);
