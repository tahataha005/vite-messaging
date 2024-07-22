import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../../core/data/local/context/authContext";
import "./style.css";
import { chatApi } from "../../../core/data/remote/chats";
import { useDispatch } from "react-redux";
import {
  readChat,
  selectChat,
} from "../../../core/data/local/redux/slices/chats";
import { Chat } from "../../../core/types/Chat";
import { FC } from "react";
import { loadMessages } from "../../../core/data/local/redux/slices/messages";

type Props = {
  chat: Chat;
};

export const ChatCard: FC<Props> = ({ chat }) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [params, setParams] = useSearchParams();

  const index = chat.users.findIndex((u) => u.email !== user?.email);

  const name = `${chat.users[index].firstName} ${chat.users[index].lastName}`;
  const unreadCount = chat.messages.filter((message) => {
    return !message.read && user?._id !== message.user;
  }).length;
  const lastMessage =
    chat.messages.length !== 0 && chat.messages[chat.messages.length - 1];
  const lastMessageTime =
    chat.messages.length !== 0 &&
    chat.messages[chat.messages.length - 1].createdAt.slice(11, 16);

  return (
    <div
      className="flex row full-width chat-card"
      onClick={async () => {
        setParams({ room: chat.room });
        await chatApi.readChat(chat.room);

        dispatch(selectChat(chat.room));
      }}
    >
      <div className="flex row profile-image" />
      <div className="flex column grow gap-15">
        <p className="bold">{name}</p>

        <p className="grey-text">
          {lastMessage && lastMessage.user === user?._id && "You: "}
          {lastMessage && lastMessage.message}
        </p>
      </div>
      <div className="flex column center gap-15 chat-details">
        <p>{lastMessageTime}</p>
        {unreadCount !== 0 ? (
          <div className="flex center primary-bg white-text">
            <p>{unreadCount}</p>
          </div>
        ) : (
          <div
            style={{
              height: 23,
            }}
          />
        )}
      </div>
    </div>
  );
};
