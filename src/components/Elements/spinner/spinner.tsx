import React from "react";
import "./spinner.scss";

const dashOffset = 502.655;

const spinnerBackgroundProps = {
  r: "80",
  cx: "85",
  cy: "85",
  fill: "transparent",
  strokeDasharray: dashOffset,
  stroke: "rgb(232, 235, 237)",
  strokeDashoffset: "0",
  strokeWidth: "10"
};

const spinnerForgroundProps = {
  ...spinnerBackgroundProps,
  stroke: "rgb(64, 159, 255)"
};

type Props = {
  progress: number;
  cancelled: boolean;
};

export const Spinner: React.FC<Props> = ({ cancelled, progress }) => {
  const offset = dashOffset - (dashOffset / 100) * Math.floor(progress);
  return (
    <svg
      height="170"
      width="170"
      shapeRendering="geometricPrecision"
      viewBox="0 0 170 170"
      className="spinner"
    >
      <circle className="spinner--background" {...spinnerBackgroundProps} />
      <circle
        className={`spinner--foreground ${!cancelled ? "spinner--rotate" : ""}`}
        {...spinnerForgroundProps}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
