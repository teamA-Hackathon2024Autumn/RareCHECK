import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components/layout/Page";
import { FormAndTable } from "./FormAndTable";
import { GetCreatedList } from "../../types/api/GetCreatedList";

export const CreatedQuestionList: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("rarecheck-username");
    // const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

    // if (storedUserIsAdmin === "true") {
    //   navigate("/admin-home");
    // }
    if (storedUserName === null) {
      navigate("/login");
    }
  }, [navigate]);


  const [quiz, setQuiz] = useState<GetCreatedList[]>([]);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get('http://localhost:5000/rarecheck/users/questions', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setQuiz(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data);
        }
      }
    };
    getQuiz();
  }, []);


  return (
    <Page login={true}>
      {quiz.length === 0 ? (
        <p>データを読み込み中...</p> // データが空の場合の表示
      ) : (
        <FormAndTable rows={quiz} />
      )}
    </Page>
  );
}