import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SERVER_URL!, {
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
