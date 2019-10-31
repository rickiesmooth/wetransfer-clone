import React from "react";
import "./button.scss";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  mode?: "outline" | "contained";
  type: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<Props> = ({
  children,
  mode = "contained",
  ...rest
}) => (
  <button {...rest} className={`button ${mode}`}>
    {children}
  </button>
);
