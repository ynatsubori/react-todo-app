import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../styles";

interface Props {
  id: number;
  task: string;
  // index: number;
}

export const TaskList = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 32px;
  list-style: none;
`;

const Item = styled.li`
  margin: 0;
  padding: 0;
  margin-top: 16px;
  font-size: 1.6rem;
  color: ${colors.primary};
  word-break: break-all;
  &.complete {
    text-decoration-line: line-through;
  }
`;

const TaskLabel = styled.label`
  margin-right: 16px;
`;

const CompleteButton = styled.input`
  margin: 0;
  padding: 0;
  margin-right: 16px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  margin: 0;
  padding: 4px 8px;
  border: 1px solid ${colors.secondary};
  color: ${colors.secondary};
  background-color: ${colors.white};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: ${colors.white};
    background-color: ${colors.secondary};
  }
`;

export const TaskItem = (props: Props) => {
  const [complete, setComplete] = useState(false);

  return (
    <>
      <Item className={complete ? " complete" : ""} key={props.id}>
        <TaskLabel>
          <CompleteButton
            type="checkbox"
            checked={complete}
            onChange={() => setComplete(!complete)}
          />
          {props.task}
        </TaskLabel>
        <DeleteButton>delete</DeleteButton>
      </Item>
    </>
  );
};
