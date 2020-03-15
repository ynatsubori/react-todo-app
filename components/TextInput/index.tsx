import * as React from "react";
import styled from "@emotion/styled";
import { colors } from "../styles";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent) => void;
  value: string;
}

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
  border: 1px solid ${colors.secondary};
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
    border: 1px solid ${colors.secondaryDark};
  }
`;

export const TextInput = (props: Props) => {
  return (
    <>
      <TaskInput
        type="text"
        placeholder="please input task..."
        onChange={props.onChange}
        value={props.value}
      />
      <AddButton onClick={props.onSubmit}>add</AddButton>
    </>
  );
};
