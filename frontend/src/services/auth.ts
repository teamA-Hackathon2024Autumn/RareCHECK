import axios, { AxiosResponse } from "axios";
import { LoginFormValues } from "../pages/Login";
import { SingupFormValues } from "../pages/SignUp";

export const api = axios.create({
  baseURL: "http://localhost:5000", // バックエンドのベースURL
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // セッション情報を自動送信
});

export const login = async (data: LoginFormValues) => {
  const url = "/rarecheck/users/login";

  const requestBody = {
    email: data.email,
    password: data.password,
  };

  try {
    const response: AxiosResponse = await api.post(url, requestBody);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        return {
          status: error.response?.status,
          message: "認証エラー: ユーザー名またはパスワードが間違っています。",
        };
      if (error.response?.status === 404)
        return {
          status: error.response?.status,
          message: "APIが見つかりません",
        };

      console.error("その他のエラー:", error.response?.status, error.message);
    } else {
      console.error("予期しないエラー:", error);
    }
    throw error;
  }
};

export const logout = async () => {
  const url = "/rarecheck/users/logout";

  try {
    const response: AxiosResponse = await api.post(url, {});
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        return {
          status: error.response?.status,
          message: "ログアウト処理に失敗しました",
        };
    } else {
      console.error("予期しないエラー:", error);
    }
    throw error;
  }
};

export const signup = async (data: SingupFormValues) => {
  const url = "/rarecheck/users/register";

  const requestBody = {
    username: data.username,
    email: data.email,
    password: data.password,
  };

  try {
    const response: AxiosResponse = await api.post(url, requestBody);
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
    throw error;
  }
};
