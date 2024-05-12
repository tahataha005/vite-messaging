import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../../types/User";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../remote/user";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  token: string;
  loadAuthentication: (user: User) => void;
  authenticating: () => void;
  logout: () => void;
};

const authContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: false,
  user: null,
  token: "",
  loadAuthentication: () => {},
  authenticating: () => {},
  logout: () => {},
});

const { Provider } = authContext;

export const useAuthContext = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthContextType>({
    isAuthenticated: false,
    loading: false,
    user: null,
    token: "",
    authenticating: () => {},
    loadAuthentication: () => {},
    logout: () => {},
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setState({
          ...state,
          token,
          loading: false,
          isAuthenticated: true,
        });

        try {
          const user = await userApi.getUser();

          const { _id: id, ...info } = user;

          console.log(user);

          setState({
            ...state,
            token: token || "",
            user: {
              id,
              ...info,
            },
          });
        } catch (error) {
          console.log((error as any)?.response?.data);
        }
      } else {
        setState({
          ...state,
          loading: false,
          isAuthenticated: false,
        });
      }
    };

    init();
  }, []);

  const value = {
    ...state,
    loadAuthentication: (user: User) => {
      setState({
        ...state,
        isAuthenticated: true,
        loading: false,
        user,
      });
    },
    authenticating: () => {
      setState({
        ...state,
        loading: true,
      });
    },
    logout: () => {
      localStorage.removeItem("token");

      setState({
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: "",
      });

      navigate("/auth/");
    },
  };

  return (
    <Provider
      value={{
        ...value,
      }}
    >
      {children}
    </Provider>
  );
};

export default authContext;
