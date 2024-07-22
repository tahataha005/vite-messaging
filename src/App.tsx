import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./ui/pages/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Chats from "./ui/pages/chats";
import { AuthProvider } from "./core/data/local/context/authContext";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./core/data/local/redux/store";
import ChatsProvider from "@elyxios/messaging-react";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <ChatsProvider
            url={import.meta.env.VITE_SERVER_URL!}
            requireAuth={true}
            token={localStorage.getItem("token")}
          >
            <ReduxProvider store={store}>
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              >
                <Routes>
                  <Route path="/" element={<h1>Hello</h1>} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/chats" element={<Chats />} />
                </Routes>
              </GoogleOAuthProvider>
            </ReduxProvider>
          </ChatsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
