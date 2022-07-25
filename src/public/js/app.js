const nickForm = document.querySelector("#nick");
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`); // JS 내장 객체 WebSocket을 이용해 소켓을 생성. 인자로는 연결되는 웹의 url을 담는다.

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from the server");
});

// setTimeout(() => {
//   socket.send("hello from browser!");
// }, 5000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
