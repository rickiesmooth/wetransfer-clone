import React from "react";

import { TransferForm } from "../transfer-form/transfer-form";
import { Progress } from "../progress/progress";
import { Done } from "../done/done";

import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";

import "./transfer.scss";

AWS.config.region = "eu-central-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "eu-central-1:3174cb9e-4244-4185-8ec1-8416179d3ab9"
});

enum Routes {
  TransferForm,
  Progress,
  Done
}

export const Transfer: React.FC = () => {
  const [file, setFile] = React.useState();
  const [route, setRoute] = React.useState(Routes.TransferForm);
  const [cancelled, setCancelled] = React.useState(false);
  const [link, setLink] = React.useState();

  // upload is the cached request object
  const upload = React.useMemo(() => {
    const id = new Date().getTime() / 1000;
    const getUpload = () =>
      new S3().upload({
        Body: file,
        Bucket: "you-transfer",
        ContentType: file!.type,
        Key: `${file.name}-${id}.${file.type}}`
      });
    if (file && route === Routes.Progress) {
      return getUpload();
    }
  }, [file, route]);

  React.useEffect(handleCancelOrResume, [cancelled, upload]);
  function handleCancelOrResume() {
    if (upload) {
      cancelled ? upload.abort() : upload.send(handleUploadCb);
    }
  }

  function handleUploadCb(error: Error, data: unknown) {
    if (error) {
      console.error(error.message);
    } else {
      const link = (data as { Location: string }).Location;
      setLink(link);
      // show spinner even when upload is very fast
      setTimeout(() => setRoute(Routes.Done), 500);
    }
  }

  return (
    <div className="container">
      {route === Routes.TransferForm && (
        <TransferForm
          onSubmit={() => setRoute(Routes.Progress)}
          onFileUpload={uploadedFile => setFile(uploadedFile)}
          file={file}
        />
      )}
      {route === Routes.Progress && (
        <Progress
          upload={upload!}
          handleCancel={setCancelled}
          cancelled={cancelled}
          totalBytes={file.size}
        />
      )}
      {route === Routes.Done && <Done link={link} />}
    </div>
  );
};
