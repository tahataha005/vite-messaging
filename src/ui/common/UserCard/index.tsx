import { FC, useMemo } from "react";
import { User } from "../../../core/types/User";
import "./style.css";
import { userSliceSeletor } from "../../../core/data/local/redux/slices/users";

type Props = {
  user: User;
  selected?: boolean;
  onClick?: (email: string) => void;
};

const UserCard: FC<Props> = ({ user, selected = false, onClick }) => {
  const { online } = userSliceSeletor();

  const isOnline = useMemo<boolean>(
    () => online.some((u) => u.id === user._id),
    [online, user]
  );

  return (
    <div
      className={`flex row gap-15 user-card ${selected && "selected-card"}`}
      onClick={() => {
        if (onClick) onClick(user.email);
      }}
    >
      <div className="profile-picture"></div>
      <div className="flex column">
        <p className="bold">
          {user.firstName} {user.lastName}
        </p>
        <p className="grey-text user-card-email">{user.email}</p>
      </div>
      {isOnline && (
        <div className="flex crow enter grow online-dot">
          <div></div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
