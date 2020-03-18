import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { colors } from "../styles";
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  XYCoord,
  DragSourceMonitor,
} from "react-dnd";

interface Props {
  index: number;
  task: string;
  onDelete: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: number;
  type: string;
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
  &.completed {
    text-decoration-line: line-through;
  }
`;

const TaskLabel = styled.label`
  margin-right: 16px;
  user-select: none;
  cursor: move;
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
  outline: none;
  &:hover {
    color: ${colors.white};
    background-color: ${colors.secondary};
  }
`;

export const TaskItem = (props: Props) => {
  const [completed, setCompleted] = useState(false);
  const liRef = useRef<HTMLLIElement>(null);
  const ref = liRef.current;
  const [, drop] = useDrop({
    accept: "task",
    drop(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref) return;
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref!.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      props.moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "task", index: props.index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(liRef));

  return (
    <>
      <Item
        className={completed ? " completed" : ""}
        style={{ opacity: isDragging ? 0 : 1 }}
        key={props.index}
        ref={liRef}
      >
        <CompleteButton
          type="checkbox"
          checked={completed}
          onChange={() => {
            setCompleted(!completed);
          }}
        />
        <TaskLabel>{props.task}</TaskLabel>
        <DeleteButton onClick={() => props.onDelete()}>delete</DeleteButton>
      </Item>
    </>
  );
};
