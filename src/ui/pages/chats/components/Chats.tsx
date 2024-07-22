import React, { FC } from "react";
import { Chat } from "../../../../core/types/Chat";
import { ChatCard } from "../../../common/ChatCard";

type Props = {
  chats: Chat[];
  setOpenCreate: (value: boolean) => void;
};

const ChatsSection: FC<Props> = ({ chats, setOpenCreate }) => {
  return (
    <div className="flex column chats-section">
      <div className="flex column full-width chats-header">
        <div className="flex row">
          <input type="text" placeholder="Search" />
          <button
            className="flex center"
            onClick={() => {
              setOpenCreate(true);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="divider" />

      <div className="flex column full-width chat-list">
        {chats.map((chat) => {
          return <ChatCard key={chat.id} chat={chat} />;
        })}
      </div>
    </div>
  );
};

export default ChatsSection;
