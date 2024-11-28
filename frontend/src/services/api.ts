import axios, { AxiosResponse } from "axios";
import { api } from "./auth";

export const ApiTest = async () => {
  const response = await axios.get("/api/items");
  return response.data;
};

export const fetchExerciseAnalysisData = async (userId: string) => {
  console.log(userId);

  const url = `/rarecheck/users/${userId}/exercise_analysis`;

  try {
    const response: AxiosResponse = await api.get(url);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        console.log(error.response.data);
        return {
          status: error.response?.status,
          message: error.response.data.message,
        };
      }
      if (error.response?.status === 404)
        return {
          status: error.response?.status,
          message: "APIが見つかりません",
        };
      console.error("その他のエラー:", error.response?.status, error.message);
    } else {
      console.error("予期しないエラー:", error);
    }
  }
};
