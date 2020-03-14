import * as React from "react";
import { TaskLayout, GlobalStyle } from "../components";
import Head from "next/head";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>react-todo-app</title>
      </Head>
      <TaskLayout />
    </>
  );
};

export default App;
