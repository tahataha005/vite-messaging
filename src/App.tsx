import { BrowserRouter, Route, Routes } from "react-router-dom";
import MessageBox from "./ui/pages/MessageBox";
import Test from "./ui/pages/cliser_test";
import Auth from "./ui/pages/auth";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/box" element={<MessageBox />} />
          <Route path="/test" element={<Test />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
