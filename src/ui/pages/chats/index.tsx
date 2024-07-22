import "./style.css";
import CreateChatPopup from "./components/CreateChatPopup";
import ChatsSection from "./components/Chats";
import SelectedChat from "./components/SelectedChat";
import useChatLogic from "./logic";

const Chats = () => {
  const { chats, chat, openCreate, setOpenCreate } = useChatLogic();

  return (
    <div className="flex row page">
      <CreateChatPopup openPopup={openCreate} setOpenCreate={setOpenCreate} />
      <ChatsSection chats={chats} setOpenCreate={setOpenCreate} />
      <SelectedChat chat={chat} />
    </div>
  );
};

export default Chats;
