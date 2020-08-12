import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { colors } from "../styles";
import { TaskList, TaskItem } from "../TaskList";
import { TextInput } from "../TextInput";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { usePrevious } from "react-use";

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

const undoAnim = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const UndoArea = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 452px;
  margin-left: -16px;
  margin-top: 16px;
  padding: 8px 0;
  text-align: right;
  background-color: ${colors.background};
  animation: ${undoAnim} 1s ease-in 1;
`;

const UndoButton = styled.button`
  margin: 0 16px;
  padding: 4px 8px;
  border: 1px solid ${colors.accent};
  color: ${colors.accent};
  background-color: ${colors.white};
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${colors.accentDark};
    border: 1px solid ${colors.accentDark};
    color: ${colors.white};
  }
`;

type Task = {
  title: string;
  deleted: boolean;
};

export const TaskLayout = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const prevTask = usePrevious(tasks);
  const [deleted, setDeleted] = useState(false);

  const submitTask = (addTask: string) => {
    const newTask = { title: addTask, deleted: false };
    const mergedTask = tasks.concat(newTask);
    setTasks(mergedTask);
  };

  const deleteTask = (taskId: number) => {
    const filteredTask = tasks.filter((_, index) => {
      return index !== taskId;
    });
    setTasks(filteredTask);
  };

  const undoTask = () => {
    if (prevTask === undefined || prevTask.length <= 0) return;
    setTasks(prevTask);
  };

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = tasks[dragIndex];
      setTasks(
        update(tasks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem],
          ],
        }),
      );
    },
    [tasks],
  );

  return (
    <>
      <Background>
        <Heading>TODOList</Heading>
        <LayoutBase>
          <TextInput onSubmit={submitTask} />
          <DndProvider backend={HTML5Backend}>
            <TaskList>
              {tasks.map((task: Task, i: number) => (
                <React.Fragment key={i}>
                  <TaskItem
                    key={i}
                    task={task.title}
                    index={i}
                    onDelete={() => {
                      deleteTask(i);
                      setDeleted(true);
                    }}
                    moveItem={moveItem}
                  />
                </React.Fragment>
              ))}
              {deleted ? (
                <UndoArea>
                  <UndoButton
                    onClick={() => {
                      undoTask();
                    }}
                  >
                    undo
                  </UndoButton>
                </UndoArea>
              ) : (
                <></>
              )}
            </TaskList>
          </DndProvider>
        </LayoutBase>
      </Background>
    </>
  );
};
