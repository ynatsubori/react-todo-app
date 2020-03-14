import * as React from "react";
import styled from "@emotion/styled";
import { colors } from "../styles";
import { Task } from "../Task";

const Background = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 452px;
`;

const Heading = styled.h1`
  margin: 0;
  padding: 0;
  margin-top: 78px;
  font-size: 3.6rem;
  line-height: 1.2;
  color: ${colors.primary};
`;

const LayoutBase = styled.div`
  background-color: ${colors.background};
  box-sizing: border-box;
  padding: 16px;
  margin: 0 auto;
  margin-top: 16px;
  border-radius: 10px;
  width: 452px;
  height: 508px;
`;

export const TaskLayout = () => {
  return (
    <>
      <Background>
        <Heading>TODOList</Heading>
        <LayoutBase>
          <Task />
        </LayoutBase>
      </Background>
    </>
  );
};
