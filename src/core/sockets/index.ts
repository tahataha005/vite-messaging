import { io } from "socket.io-client";

export const socket = io("http://172.20.10.5:8000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

socket.on("connect", () => {
  console.log("Connected to server");
});

export const connect = () => {
  socket.connect();
};

export const disconnect = () => {
  socket.disconnect();
};

export const emit = (event: string, data) => {
  socket.emit(event, data);
};
