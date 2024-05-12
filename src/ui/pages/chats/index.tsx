import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuthContext } from "../../../core/data/local/context/authContext";
import { Chat } from "../../../core/types/Chat";
import { chatApi } from "../../../core/data/remote/chats";
import "./style.css";
import { ChatCard } from "../../common/ChatCard";
import { useSearchParams } from "react-router-dom";
import { connect, disconnect, emit, socket } from "../../../core/sockets";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  chatSliceSeletor,
  loadChats,
  loadNewMessage,
  selectChat,
} from "../../../core/data/local/redux/slices/chats";
import {
  addMessage,
  loadMessages,
  messageSliceSeletor,
} from "../../../core/data/local/redux/slices/messages";
import {
  loadUsers,
  userSliceSeletor,
} from "../../../core/data/local/redux/slices/users";

const Chats = () => {
  const dispatch = useDispatch();
  const { list: chats, selected: chat } = chatSliceSeletor();
  const { list: messages } = messageSliceSeletor();
  const { list: onlineUsers } = userSliceSeletor();

  const { user } = useAuthContext();
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await chatApi.getChats();

      dispatch(loadChats(chats));
    };

    fetchChats();
  }, []);

  const [message, setMessage] = useState("");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    connect();

    socket.on("connect", () => {
      messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    socket.on("new-message", (message) => {
      dispatch(loadNewMessage(message));
      dispatch(addMessage(message));

      messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    socket.on("online", (onlineUsers) => {
      console.log(onlineUsers);

      dispatch(loadUsers(onlineUsers));
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

      const chat = data.find((chat) => chat.room === params.get("room"));
      chat.id = chat._id;

      if (chat) {
        dispatch(selectChat(chat.id));
        dispatch(loadMessages(chat.messages));
      }
    };

    if (params.has("room")) getMessages();

    return () => {
      disconnect();
    };
  }, [params, setParams]);

  const getMessageClass = (message) => {
    if (message.user === user?.id) {
      return "sender white-text primary-bg";
    }

    return "reciever grey-bg black-text";
  };

  const getUserName = (chat: Chat) => {
    const chatUser = chat.users.find((u) => u.email !== user?.email);

    return chatUser?.firstName + " " + chatUser?.lastName;
  };

  return (
    <div className="flex row page">
      <div className="flex column chats-section">
        <div className="flex column full-width chats-header">
          <div className="flex row">
            <input type="text" placeholder="Search" />
            <button className="flex center">+</button>
          </div>
        </div>

        <div className="divider" />

        <div className="flex column full-width chat-list">
          {chats.map((chat) => {
            return <ChatCard key={chat.id} chat={chat} />;
          })}
        </div>
      </div>
      <div className="flex column grow chat-box full-height">
        {chat ? (
          <>
            <div className="flex row chat-header">
              <div className="chat-profile-picture"></div>

              <div className="flex column grow chat-box-info">
                <p className="bold">{getUserName(chat)}</p>
                <p className="grey-text">
                  {onlineUsers.find(
                    (u) =>
                      u.id ===
                      chat.users.find((u) => u.email !== user?.email)?._id
                  )
                    ? "Online"
                    : "Offline"}
                </p>
              </div>

              <div>Menu</div>
            </div>
            <div className="flex column full-width messages">
              {messages?.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={`flex center message ${getMessageClass(
                      message
                    )}`}
                  >
                    <p className="message-content">{message.message}</p>
                    <p className="message-time">
                      {message.createdAt.slice(11, 16)}
                    </p>
                  </div>
                );
              })}
              <div
                style={{ float: "left", clear: "both" }}
                ref={messagesRef}
              ></div>
            </div>

            <div className="flex row full-width message-input">
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button
                className="white-text"
                onClick={() => {
                  emit("send-message", {
                    message,
                    room: params.get("room"),
                    token: localStorage.getItem("token"),
                  });

                  setMessage("");
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex center full-height">Select a chat</div>
        )}
      </div>
    </div>
  );
};

export default Chats;
