import React from "react";
import { Spinner } from "../../Elements/spinner/spinner";
import S3 from "aws-sdk/clients/s3";
import { getFileSize } from "../../../utils/size";
import { Button } from "../../Elements/button/button";

import "./progress.scss";

type Props = {
  cancelled: boolean;
  upload: S3.ManagedUpload;
  totalBytes: number;
  handleCancel(cancel: boolean): void;
};

export const Progress: React.FC<Props> = ({
  upload,
  cancelled,
  totalBytes,
  handleCancel
}) => {
  const [progress, setProgress] = React.useState(0);
  const total = getFileSize(totalBytes);
  const transferred = getFileSize((totalBytes / 100) * progress);

  upload.on("httpUploadProgress", evt =>
    setProgress((evt.loaded * 100) / evt.total)
  );

  return (
    <>
      <div className="progress">
        <div className="progress--spinner">
          <Spinner progress={progress} cancelled={cancelled} />
          <span className="progress--percentage">
            {Math.round(progress)}
            <span>%</span>
          </span>
        </div>
        <div className="progress--meta">
          <h3>{!cancelled ? "Transferring..." : "Cancelled"}</h3>
          <p>{`${transferred} of ${total} uploaded`}</p>
        </div>
      </div>
      <div className="controls">
        <Button
          type="button"
          mode="outline"
          onClick={() => handleCancel(!cancelled)}
        >
          {cancelled ? "Resume" : "Cancel"}
        </Button>
      </div>
    </>
  );
};
