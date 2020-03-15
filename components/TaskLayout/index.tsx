import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../styles";
import { TaskList, TaskItem } from "../TaskList";
import { TextInput } from "../TextInput";

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
  const [addTask, setAddTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  const submitTask = (e: React.MouseEvent) => {
    e.preventDefault();
    if (addTask === "") return;
    setTasks([...tasks, addTask]);
    setAddTask(""); // 初期化
  };

  const deleteTask = (taskId: number) => {
    const filteredTask = tasks.filter((_: string, index: number) => {
      return index !== taskId;
    });
    setTasks(filteredTask);
  };

  return (
    <>
      <Background>
        <Heading>TODOList</Heading>
        <LayoutBase>
          <TextInput
            onSubmit={submitTask}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAddTask(e.target.value);
            }}
            value={addTask}
          />
          <TaskList>
            {tasks.map((task: string, i: number) => (
              <TaskItem
                key={i}
                task={task}
                id={i}
                onClickDelete={() => {
                  deleteTask(i);
                }}
              />
            ))}
          </TaskList>
        </LayoutBase>
      </Background>
    </>
  );
};
