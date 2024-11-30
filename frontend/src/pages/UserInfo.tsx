import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { Page } from "../components/layout/Page";
import { editUserInfo, fetchUserInfo } from "../services/api";
import styles from "./Userinfo.module.css";

export type EditUserInfoValues = {
  username: string;
  email: string;
  beforePassword: string;
  password: string;
  rePassword: string;
};

export const UserInfo = () => {
  const navigate = useNavigate();
  const [userDefaultInfo, setUserDefaultInfo] = useState<{
    username: string;
    email: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EditUserInfoValues>();

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("rarecheck-userId");
      if (userId) {
        const result = await fetchUserInfo(userId);
        console.log(result);
        if (result && "data" in result) {
          if (result.status == 200) {
            setUserDefaultInfo(result.data);
            setValue("username", result.data.username);
            setValue("email", result.data.email);
          }
        } else {
          setUserDefaultInfo(null);
        }
      }
    };

    fetchData();
  }, [navigate, setValue]);

  // パスワードが一致するかどうかに利用
  const password = watch("password");

  const onSubmit: SubmitHandler<EditUserInfoValues> = async (data) => {
    try {
      const result = await editUserInfo(data);

      if ("data" in result) {
        if (result && result.status === 200) {
          // ユーザー名をローカルストレージに保存
          localStorage.setItem("rarecheck-username", result.data.username);
          alert("ユーザー情報の更新ができました。");
          // 1秒後にページをリロード
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // エラーが返ってきた場合
          alert(
            "ユーザー情報の更新ができませんでした。\nメールアドレスまたはパスワードが間違っています。",
          );
        }
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert(
        "ユーザー情報の更新ができませんでした。\nメールアドレスまたはパスワードが間違っています。",
      );
    }
  };

  return (
    <Page login={false}>
      <div className={styles.userInfoFrame}>
        <div className={styles.userInfoLayout}>
          <div className={styles.userInfoFormFrame}>
            <h2 className={styles.title}>ユーザー情報の確認・変更</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  label="User name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={userDefaultInfo?.username || ""} // 初期値を設定
                  {...register("username", {
                    required: "ユーザー名を入力してください。",
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  label="Email address"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={userDefaultInfo?.email || ""} // 初期値を設定
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
                  label="Password(現在のパスワード)"
                  type="password"
                  variant="outlined"
                  {...register("beforePassword", {
                    required: "パスワードを入力してください。",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <TextField
                  label="New password"
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
                  label="Re-type new password"
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
              <Stack spacing={2} className={styles.buttonFrame}>
                <Button
                  variant="contained"
                  className={styles.button}
                  type="submit"
                >
                  保存
                </Button>
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={() => navigate("/login")}
                >
                  戻る
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};
