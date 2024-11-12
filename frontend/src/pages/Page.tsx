import { ReactNode } from "react";
import { Header } from "../components/layout/Header";
import styles from "./Page.module.css";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return (
    <div className={styles.topScreenFrame}>
      <Header />
      <main className={styles.mainArea}>
        <div className={styles.mainLayout}>{children}</div>
      </main>
    </div>
  );
};
