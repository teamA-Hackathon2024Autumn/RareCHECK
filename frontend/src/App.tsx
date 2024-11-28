import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { UserInfo } from "./pages/UserInfo";
import { AdminHome } from "./pages/AdminHome";
import { QuestionSelection } from "./pages/QuestionSelection/QuestionSelection";
import { Exercise } from "./pages/Exercise/Exercise";
import { CreateQuestion } from "./pages/CreateQuestion";
import { CreatedQuestionList } from "./pages/CreatedQuestionList/CreatedQuestionList";
import { EditQuestion } from "./pages/EditQuestion";
import { AdminCheckQuestion } from "./pages/AdminCheckQuestion";
import { AdminEditQuestion } from "./pages/AdminEditQuestion";
import { QuestionsAwaitingCheck } from "./pages/QuestionsAwaitingCheck/QuestionsAwaitingCheck";
import { AdminQuestionList } from "./pages/AdminQuestionList/AdminQuestionList";
import { Page404 } from "./pages/Page404";
import { ApiCheck } from "./components/common/ApiCheck";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/QuestionSelection" element={<QuestionSelection />} />
        <Route path="/Exercise" element={<Exercise />} />
        <Route path="/CreateQuestion" element={<CreateQuestion />} />
        <Route path="/CreatedQuestionList" element={<CreatedQuestionList />} />
        <Route path="/EditQuestion" element={<EditQuestion />} />
        <Route path="/AdminCheckQuestion" element={<AdminCheckQuestion />} />
        <Route path="/AdminEditQuestion" element={<AdminEditQuestion />} />
        <Route
          path="/QuestionsAwaitingCheck"
          element={<QuestionsAwaitingCheck />}
        />
        <Route path="/AdminQuestionList" element={<AdminQuestionList />} />
        <Route path="/test" element={<ApiCheck />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
