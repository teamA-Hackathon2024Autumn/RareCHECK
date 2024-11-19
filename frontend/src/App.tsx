import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { UserInfo } from "./pages/UserInfo";
import { AdminHome } from "./pages/AdminHome";
import { ApiCheck } from "./components/common/ApiCheck";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/test" element={<ApiCheck />} />
      </Routes>
    </BrowserRouter>
  );
};
