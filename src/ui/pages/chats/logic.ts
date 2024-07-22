import { useDispatch } from "react-redux";
import {
  chatSliceSeletor,
  loadChats,
} from "../../../core/data/local/redux/slices/chats";
import { useEffect, useState } from "react";
import { chatApi } from "../../../core/data/remote/chats";

const useChatLogic = () => {
  const dispatch = useDispatch();
  const { list: chats, selected: chat } = chatSliceSeletor();

  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await chatApi.getChats();

      dispatch(loadChats(chats));
    };

    fetchChats();
  }, []);

  return {
    chats,
    chat,
    openCreate,
    setOpenCreate,
  };
};

export default useChatLogic;
