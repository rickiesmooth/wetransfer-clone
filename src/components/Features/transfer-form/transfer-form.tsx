import React from "react";
import plusIcon from "./plus.svg";
import { getFileSize } from "../../../utils/size";
import { Input } from "../../Elements/input/input";
import { Button } from "../../Elements/button/button";

import "./transfer-form.scss";

type Props = {
  onSubmit(): void;
  onFileUpload(file: File): void;
  file?: File;
};

export const TransferForm: React.FC<Props> = ({
  onSubmit,
  onFileUpload,
  file
}) => (
  <form className="transfer-form" onSubmit={onSubmit}>
    <div className="transfer-form--top">
      {!file ? (
        <UploadLabel onFileUpload={onFileUpload} />
      ) : (
        <UploadedFile file={file} />
      )}
    </div>
    <Input type="email" placeholder="Email to" />
    <Input type="email" placeholder="Your email" />
    <div className="controls">
      <Button disabled={!file} type="submit">
        Transfer
      </Button>
    </div>
  </form>
);

const UploadLabel: React.FC<{ onFileUpload: Props["onFileUpload"] }> = ({
  onFileUpload
}) => (
  <label className="upload-label">
    <img
      width={32}
      src={plusIcon}
      className="upload-label--icon"
      alt="upload-file"
    />
    <h2>Add your files</h2>
    <input
      type="file"
      name="file"
      id="file"
      data-testid="file-upload"
      onChange={({ currentTarget }) => {
        if (currentTarget && currentTarget.files) {
          const file = currentTarget.files[0];
          onFileUpload(file);
        }
      }}
      style={{ display: "none", visibility: "hidden" }}
      required={true}
    />
  </label>
);

const UploadedFile: React.FC<{ file: File }> = ({
  file: { name, size, type }
}) => (
  <div className={"uploaded-file"}>
    <h3 className={"uploaded-file--title"}>{name}</h3>
    <h4 className={"uploaded-file--meta"}>{`${getFileSize(
      size
    )} * ${type}`}</h4>
  </div>
);
