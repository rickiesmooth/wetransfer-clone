import React from "react";
import { render } from "@testing-library/react";
import { Done } from "./done";

describe("Progress", () => {
  test("given an update, should update progress", () => {
    const link = "http://link.nl";
    const { getByTestId } = render(<Done link={link} />);
    expect((getByTestId("input") as HTMLInputElement).value).toEqual(link);
  });
});
