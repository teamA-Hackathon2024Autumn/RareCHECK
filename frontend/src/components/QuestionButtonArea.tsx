import { useNavigate } from "react-router-dom";
import {
  QuestionButton,
  QuestionOutlinedButton,
} from "../components/common/QuestionButton";

export const QuestionButtonArea = () => {
  const navigate = useNavigate();

  return (
    <>
      <QuestionButton
        variant="contained"
        size="large"
        onClick={() => navigate("/QuestionSelection")}
      >
        問題演習
      </QuestionButton>
      <QuestionButton
        variant="contained"
        size="large"
        onClick={() => navigate("/CreateQuestion")}
      >
        問題作成
      </QuestionButton>
      <QuestionOutlinedButton variant="outlined" size="large">
        問題一覧（工事中）
      </QuestionOutlinedButton>
      <QuestionOutlinedButton
        variant="outlined"
        size="large"
        onClick={() => navigate("/CreatedQuestionList")}
      >
        作成した問題一覧
      </QuestionOutlinedButton>
    </>
  );
};
