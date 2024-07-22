import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addSeachedUsers,
  loadingUsers,
  queryChanges,
  userSliceSeletor,
} from "../../../../core/data/local/redux/slices/users";
import { userApi } from "../../../../core/data/remote/user";
import loadingAnimation from "../../../../../public/loading.json";
import UserCard from "../../../common/UserCard";
import { chatApi } from "../../../../core/data/remote/chats";
import { createChat } from "../../../../core/data/local/redux/slices/chats";
import Lottie from "lottie-react";
import useDelay from "../../../../core/hooks/delay";

type Props = {
  openPopup: boolean;
  setOpenCreate: (open: boolean) => void;
};

const CreateChatPopup: FC<Props> = ({ openPopup, setOpenCreate }) => {
  const dispatch = useDispatch();

  const { fileredList: filteredUsers, loading: isUsersLoading } =
    userSliceSeletor();

  const [selectedToCreate, setSelectedToCreate] = useState<string | null>(null);
  const [query, setQuery] = useState({
    email: "",
    username: "",
  });

  useEffect(() => {
    dispatch(loadingUsers());
    dispatch(queryChanges(query));
  }, [query]);

  useDelay(() => {
    searchUsers();

    dispatch(loadingUsers(false));

    return (t) => {
      clearTimeout(t);
    };
  }, [query]);

  const searchUsers = async () => {
    if (query.email !== "") {
      const users = await userApi.search(query);

      dispatch(addSeachedUsers(users));
      dispatch(queryChanges(query));
    }
  };

  const handleCreateChat = async () => {
    const response = await chatApi.createChat(selectedToCreate!);

    dispatch(createChat(response));
    setOpenCreate(false);
  };

  return openPopup ? (
    <div
      className="flex column full-width full-height popup"
      onClick={() => {
        setOpenCreate(false);
      }}
    >
      <div
        className="flex column gap-30 rounded white-bg popup-content "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setQuery({ ...query, email: e.target.value });
          }}
        />

        <div className="flex column rounded popup-users">
          <div className="full-height flex center">
            {isUsersLoading && (
              <div className="flex center">
                <Lottie
                  animationData={loadingAnimation}
                  style={{ width: 50, height: 50 }}
                />
              </div>
            )}
          </div>
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              selected={selectedToCreate === user.email}
              onClick={(email) => {
                setSelectedToCreate(email);
              }}
            />
          ))}
          <div className="full-height flex center">
            {filteredUsers.length === 0 && !isUsersLoading && (
              <p>No users found</p>
            )}
          </div>
        </div>

        <button
          disabled={!selectedToCreate}
          className="full-width primary-bg bold white-text"
          onClick={() => handleCreateChat()}
        >
          Create
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CreateChatPopup;
