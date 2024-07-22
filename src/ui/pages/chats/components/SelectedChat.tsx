import React, { FC, useEffect, useRef, useState } from "react";
import { Chat } from "../../../../core/types/Chat";
import { Message } from "../../../../core/types/Message";
import { User } from "../../../../core/types/User";
import { useAuthContext } from "../../../../core/data/local/context/authContext";
import {
  loadOnlineUsers,
  userSliceSeletor,
} from "../../../../core/data/local/redux/slices/users";
import menu from "../../../../../public/menu.svg";
import {
  addMessage,
  loadMessages,
  messageSliceSeletor,
} from "../../../../core/data/local/redux/slices/messages";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadNewMessage,
  readChat,
  selectChat,
} from "../../../../core/data/local/redux/slices/chats";
import { useSocket } from "@elyxios/messaging-react";

type Props = {
  chat: Chat | null;
};

const SelectedChat: FC<Props> = ({ chat }) => {
  const dispatch = useDispatch();

  const { user } = useAuthContext();
  const { online: users } = userSliceSeletor();
  const { list: messages } = messageSliceSeletor();
  const [message, setMessage] = useState<string>("");

  const [params] = useSearchParams();
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const context: any = useSocket();

  const {
    onConnect,
    onlineUsers,
    emitSendMessage,
    onNewMessage,
    emitReadChat,
    onMessageRead,
  } = context;

  useEffect(() => {
    onConnect(() => {
      messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    onlineUsers((onlineUsers) => {
      console.log(onlineUsers);

      dispatch(loadOnlineUsers(onlineUsers));
    });
  }, []);

  useEffect(() => {
    const room = params.get("room");

    if (room) {
      dispatch(selectChat(room));
    }
  }, [params]);

  useEffect(() => {
    if (chat) {
      dispatch(readChat(chat.room));
      dispatch(loadMessages(chat.messages));
    }

    onNewMessage(({ message, payload }) => {
      const { room } = payload;

      dispatch(loadNewMessage({ message, room }));

      if (chat?.room === room) {
        emitReadChat({ room, token: localStorage.getItem("token") });

        dispatch(readChat(room));
        dispatch(addMessage(message));
      }

      messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    onMessageRead((room) => {
      if (chat?.room === room) {
        dispatch(readChat(room));
      }
    });
  }, [chat?.room]);

  const getMessageClass = (message: Message) => {
    if (message.user === user?._id) {
      return "sender white-text primary-bg";
    }

    return "reciever grey-bg black-text";
  };

  const getUserName = (chat: Chat) => {
    const chatUser = chat.users.find((u) => u.email !== user?.email);

    return chatUser?.firstName + " " + chatUser?.lastName;
  };

  const sendMessage = () => {
    const to = chat?.users.find((u) => u.email !== user?.email)?._id;

    emitSendMessage({
      to,
      message,
      token: localStorage.getItem("token"),
      payload: { room: chat?.room },
    });

    setMessage("");
  };

  return (
    <div className="flex column grow chat-box full-height">
      {chat ? (
        <>
          <div className="flex row chat-header">
            <div className="chat-profile-picture"></div>

            <div className="flex column grow chat-box-info">
              <p className="bold">{getUserName(chat)}</p>
              <p className="grey-text">
                {users.find(
                  (u) =>
                    u.id ===
                    chat.users.find((u) => u.email !== user?.email)?._id
                )
                  ? "Online"
                  : "Offline"}
              </p>
            </div>

            <div>
              <img src={menu} height={25} width={25} />
            </div>
          </div>

          <div className="flex column full-width messages">
            {messages?.map((message) => {
              return (
                <div
                  key={message.createdAt}
                  className={`flex center message ${getMessageClass(message)}`}
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
            <button className="white-text" onClick={() => sendMessage()}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="flex center full-height">Select a chat</div>
      )}
    </div>
  );
};

export default SelectedChat;
