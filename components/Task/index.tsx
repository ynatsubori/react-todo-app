import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../styles";

const TaskList = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 32px;
  list-style: none;
`;

const TaskItem = styled.li`
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

const TaskDetail = styled.span`
  margin-right: 16px;
`;

const TaskInput = styled.input`
  width: 305px;
  height: 36px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  background-color: ${colors.white};
  padding: 8px;
  margin: 0;
  margin-right: 16px;
  color: ${colors.primary};
  font-size: 1.4rem;
  box-sizing: border-box;
  &:-ms-expand {
    display: none;
  }

  &::placeholder {
    color: ${colors.border};
  }

  &:placeholeder-shown {
    color: ${colors.border};
  }
`;

const AddButton = styled.button`
  background-color: ${colors.secondary};
  box-sizing: border-box;
  color: ${colors.white};
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  font-size: 1.4rem;
  width: 99px;
  height: 36px;
  &:hover {
    background-color: ${colors.secondaryDark};
  }
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

export const Task = () => {
  const [addTask, setAddTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  const submitTask = (e: React.MouseEvent) => {
    e.preventDefault();
    setTasks([...tasks, addTask]);
    setAddTask(""); // 初期化
  };

  return (
    <>
      <TaskInput
        type="text"
        placeholder="please input task..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddTask(e.target.value);
        }}
        value={addTask}
      />
      <AddButton onClick={submitTask}>add</AddButton>
      <TaskList>
        {tasks.map((task: string, i: number) => (
          <TaskItem className={complete ? " complete" : ""} key={i}>
            <CompleteButton
              type="checkbox"
              onClick={() => setComplete(!complete)}
            />
            <TaskDetail>{task}</TaskDetail>
            <DeleteButton>delete</DeleteButton>
          </TaskItem>
        ))}
      </TaskList>
    </>
  );
};
