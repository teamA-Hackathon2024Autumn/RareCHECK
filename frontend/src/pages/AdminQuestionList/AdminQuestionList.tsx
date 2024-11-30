import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components/layout/Page";
import { FormAndTable } from "./FormAndTable";
import { GetQuestionListAdmin } from "../../types/api/GetQuestionListAdmin";

export const AdminQuestionList: React.FC = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<GetQuestionListAdmin[]>([]);
  const [loading, setLoading] = useState(true); // ローディング状態の追加

  useEffect(() => {
    const storedUserName = localStorage.getItem("rarecheck-username");
    const storedUserIsAdmin = localStorage.getItem("rarecheck-isAdmin");

    if (storedUserIsAdmin === "false") {
      navigate("/");
    }
    if (storedUserName === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/rarecheck/admin/questions",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );
        setQuiz(res.data);
        setLoading(false); // データ取得後にローディングを終了
      } catch (error) {
        console.error("Error fetching data:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        }
        setLoading(false); // エラーが発生してもローディングを終了
      }
    };
    getQuiz();
  }, []);

  return (
    <Page login={true}>
      {loading ? <div>Loading...</div> : <FormAndTable rows={quiz} />}
    </Page>
  );
};
