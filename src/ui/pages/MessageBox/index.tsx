/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { connect, disconnect, emit, socket } from "../../../core/sockets";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const MessageBox = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [params, setParams] = useSearchParams();
  const [chat, setChat] = useState<any>();

  useEffect(() => {
    connect();

    socket.on("connect", () => {});

    socket.on("new-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    const getMessages = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL!}/chats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(data);

      const chat = data.find((chat) => chat.room === params.get("room"));

      if (chat) {
        setChat(chat);
        setMessages(chat.messages);
      }
    };

    getMessages();

    return () => {
      disconnect();
    };
  }, [params, setParams]);

  return (
    <div className="flex column center page gap-30">
      <h1>Messages</h1>
      <div className="flex column gap-15">
        {messages.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))}
      </div>
      <div className="flex row gap-15">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const to = chat?.users.find(
              (user) => user.email !== localStorage.getItem("email")
            ).tunnel;

            console.log(to);

            emit("send-message", {
              message,
              room: params.get("room"),
              token: localStorage.getItem("token"),
              to,
            });

            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
