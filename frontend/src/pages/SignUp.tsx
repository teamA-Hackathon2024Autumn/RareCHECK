import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Page } from "../components/layout/Page";
import { Logo } from "../components/common/Logo";
import { signup } from "../services/auth";
import styles from "./Userinfo.module.css";

export type SingupFormValues = {
  username: string;
  email: string;
  password: string;
  rePassword: string;
};

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SingupFormValues>();

  // パスワードが一致するかどうかに利用
  const password = watch("password");

  // サインアップ失敗時のエラーメッセージ状態
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<SingupFormValues> = async (data) => {
    const result = await signup(data);

    if ("data" in result) {
      if (result.status == 201) {
        console.log("result.data", result.data);
        const userId: string = result.data.userId;
        const userName: string = result.data.username;
        const isAdmin: boolean = result.data.isAdmin;

        // ローカルストレージにユーザー名とユーザーID, 管理者かどうかを保存
        // 理想はセッションIDのみ保存してリクエスト毎にユーザー情報を取得したい
        const storage = localStorage;
        storage.setItem("rarecheck-userId", userId);
        storage.setItem("rarecheck-username", userName);
        storage.setItem("rarecheck-isAdmin", isAdmin.toString());

        navigate("/");
      }
    } else {
      // エラー時のメッセージを表示
      setErrorMessage(result.message);
    }
  };

  return (
    <Page login={false}>
      <div className={styles.userInfoFrame}>
        <div className={styles.sinupLayout}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.userInfoFormFrame}>
            <h2 className={styles.title}>新規登録</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  label="User name"
                  variant="outlined"
                  {...register("username", {
                    required: "ユーザー名を入力してください。",
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  label="Email address"
                  variant="outlined"
                  {...register("email", {
                    required: "メールアドレスを入力してください。",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 簡易的なメールアドレスの正規表現
                      message: "有効なメールアドレスを入力してください。",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("password", {
                    required: "パスワードを入力してください。",
                    minLength: {
                      value: 8,
                      message: "パスワードは8文字以上である必要があります。",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <TextField
                  label="Re-type password"
                  type="password"
                  variant="outlined"
                  {...register("rePassword", {
                    required: "確認用パスワードを入力してください。",
                    validate: (value) =>
                      value === password || "パスワードが一致しません。",
                  })}
                  error={!!errors.rePassword}
                  helperText={errors.rePassword?.message}
                />
              </Stack>
              {errorMessage && (
                <Typography
                  variant="body2"
                  color="error"
                  className={styles.errorMessage}
                >
                  {errorMessage}
                </Typography>
              )}
              <Stack spacing={2} className={styles.buttonFrame}>
                <Button
                  variant="contained"
                  className={styles.button}
                  type="submit"
                >
                  新規登録
                </Button>
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={() => navigate("/")}
                >
                  ログインはこちら
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};
