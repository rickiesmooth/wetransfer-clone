import React from "react";
import "./input.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const Input: React.FC<Props> = ({ inputRef, ...rest }) => (
  <input data-testid="input" className="input-field" {...rest} ref={inputRef} />
);
