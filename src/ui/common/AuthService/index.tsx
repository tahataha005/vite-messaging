import { FC, useCallback } from "react";
import "./style.css";
import google from "../../../../public/google-logo.svg";
import facebook from "../../../../public/facebook-logo.svg";
import github from "../../../../public/github-logo.svg";

type Props = {
  type: "google" | "facebook" | "github";
  onClick?: () => void;
};

export const AuthService: FC<Props> = ({ type, onClick }) => {
  const getLogo = useCallback(() => {
    switch (type) {
      case "google":
        return google;
      case "facebook":
        return facebook;
      case "github":
        return github;
      default:
        return google;
    }
  }, [type]);

  return (
    <div className="flex center rounded auth-service">
      <img src={getLogo()} alt={type} onClick={onClick} />
    </div>
  );
};
