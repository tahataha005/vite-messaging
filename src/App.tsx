import { BrowserRouter, Route, Routes } from "react-router-dom";
import MessageBox from "./ui/pages/MessageBox";
import Auth from "./ui/pages/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Chats from "./ui/pages/chats";
import { AuthProvider } from "./core/data/local/context/authContext";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./core/data/local/redux/store";
import { useEffect } from "react";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <ReduxProvider store={store}>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <Routes>
                <Route path="/" element={<h1>Hello World</h1>} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/box" element={<MessageBox />} />
              </Routes>
            </GoogleOAuthProvider>
          </ReduxProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
