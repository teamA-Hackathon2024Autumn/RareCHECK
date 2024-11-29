import React from "react";
import { Link } from "react-router-dom";

export const Page404: React.FC = () => {
  return (
    <>
      <p>404ページです</p>
      <Link to={"/"}>戻る</Link>
    </>
  );
};
