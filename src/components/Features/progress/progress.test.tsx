import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Progress } from "./progress";
import S3 from "aws-sdk/clients/s3";

describe("Progress", () => {
  test("given an update, should update progress", () => {
    let first = true;
    const totalBytes = 10000;
    const { getByText } = render(
      <Progress
        cancelled={false}
        handleCancel={() => {}}
        totalBytes={totalBytes}
        upload={
          {
            on: (_, cb: any) => {
              // only mock progress once
              if (first) {
                cb({ loaded: 200, total: totalBytes });
                first = false;
              }
            }
          } as S3.ManagedUpload
        }
      />
    );
    //2%
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("1KB of 10KB uploaded")).toBeInTheDocument();
    expect(getByText("Transferring...")).toBeInTheDocument();
  });

  test("given not cancelled state, user should be able to cancel", () => {
    const mockedCancelFunction = jest.fn(file => {});
    const totalBytes = 10000;
    const { getByText } = render(
      <Progress
        cancelled={false}
        handleCancel={mockedCancelFunction}
        totalBytes={totalBytes}
        upload={{ on: (_, __) => {} } as S3.ManagedUpload}
      />
    );
    fireEvent.click(getByText("Cancel"));
    expect(mockedCancelFunction).toBeCalledWith(true);
  });

  test("given cancelled state, user should be able to resume", () => {
    const mockedCancelFunction = jest.fn(file => {});
    const totalBytes = 10000;
    const { getByText } = render(
      <Progress
        cancelled={true}
        handleCancel={mockedCancelFunction}
        totalBytes={totalBytes}
        upload={{ on: (_, __) => {} } as S3.ManagedUpload}
      />
    );
    fireEvent.click(getByText("Resume"));
    expect(mockedCancelFunction).toBeCalledWith(false);
  });
});
