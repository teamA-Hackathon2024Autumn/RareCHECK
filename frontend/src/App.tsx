import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { QuestionSelection } from "./pages/QuestionSelection";
import { Exercise } from "./pages/Exercise";
// import { CreateQuestion } from "./pages/CreateQuestion";
import { ApiCheck } from "./components/common/ApiCheck";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/QuestionSelection" element={<QuestionSelection />} />
        <Route path="/Exercise" element={<Exercise />} />
        {/* <Route path="/CreateQuestion" element={<CreateQuestion />} /> */}
        <Route path="/test" element={<ApiCheck />} />
      </Routes>
    </BrowserRouter>
  );
};
