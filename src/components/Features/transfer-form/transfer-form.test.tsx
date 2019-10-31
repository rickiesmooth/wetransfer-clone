import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TransferForm } from "./transfer-form";

describe("TransferForm", () => {
  const mockFile = new File(["(⌐□_□)"], "hey.png", { type: "image/png" });

  test("given no file, button should be disabled", () => {
    const { getByText } = render(
      <TransferForm onSubmit={() => {}} onFileUpload={() => {}} />
    );
    expect(getByText("Transfer")).toHaveAttribute("disabled");
  });

  test("given no file, user should be able to upload one", () => {
    const mockedUploadFunction = jest.fn(file => {});
    const { getByAltText, getByTestId } = render(
      <TransferForm onSubmit={() => {}} onFileUpload={mockedUploadFunction} />
    );
    expect(getByAltText("upload-file")).toBeInTheDocument();
    fireEvent.change(getByTestId("file-upload"), {
      target: { files: [mockFile] }
    });
    expect(mockedUploadFunction).toHaveBeenCalledWith(mockFile);
  });

  test("given a file, label should show meta info", () => {
    const { getByText } = render(
      <TransferForm
        onSubmit={() => {}}
        onFileUpload={() => {}}
        file={mockFile}
      />
    );
    expect(getByText("hey.png")).toBeInTheDocument();
    expect(getByText("1KB * image/png")).toBeInTheDocument();
  });

  xtest("given a file, transfer button should be enabled", () => {
    const mockedSubmitFunction = jest.fn(() => {});
    const { getByText } = render(
      <TransferForm
        onSubmit={mockedSubmitFunction}
        onFileUpload={() => {}}
        file={{} as File}
      />
    );
    fireEvent.click(getByText("Transfer"));
    expect(mockedSubmitFunction).toBeCalled();
  });
});
