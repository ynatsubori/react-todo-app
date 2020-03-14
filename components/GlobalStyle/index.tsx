import { css, Global } from "@emotion/core";

export const GlobalStyle = () => {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            height: 100%;
            font-size: 62.5%;
          }
          body {
            font-family: Helvetica, Arial, sans-serif;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
        `}
      />
    </>
  );
};
