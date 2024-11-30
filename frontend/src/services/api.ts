import axios, { AxiosResponse } from "axios";
import { api } from "./auth";
import { EditUserInfoValues } from "../pages/UserInfo";

export const ApiTest = async () => {
  const response = await axios.get("/api/items");
  return response.data;
};

export const fetchExerciseAnalysisData = async (userId: string) => {
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

export const fetchUserInfo = async (userId: string) => {
  const url = `/rarecheck/users/${userId}`;

  try {
    const response: AxiosResponse = await api.get(url);
    // console.log(response);
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

export const editUserInfo = async (data: EditUserInfoValues) => {
  const userId = localStorage.getItem("rarecheck-userId");

  console.log(userId);

  const url = `/rarecheck/users/${userId}`;

  const requestBody = {
    username: data.username,
    email: data.email,
    beforePassword: data.beforePassword,
    password: data.password,
  };

  try {
    const response: AxiosResponse = await api.put(url, requestBody);
    console.log(response);
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

  return data;
};
