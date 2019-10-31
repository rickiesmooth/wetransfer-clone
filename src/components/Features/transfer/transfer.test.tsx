import React from "react";
import { render } from "@testing-library/react";
import { Transfer } from "./transfer";

test("initial route should be transferForm", () => {
  const { getByText } = render(<Transfer />);
  expect(getByText("Add your files")).toBeInTheDocument();
});
