import { ReactNode } from "react";
import { Header } from "./Header";
import { LoginHeader } from "./LoginHeader";
import styles from "./Page.module.css";

interface PageProps {
  login: boolean;
  children: ReactNode;
}

export const Page = ({ login, children }: PageProps) => {
  return (
    <div className={styles.topScreenFrame}>
      {login ? <Header /> : <LoginHeader />}
      <main className={styles.mainArea}>
        <div className={styles.mainLayout}>{children}</div>
      </main>
    </div>
  );
};
