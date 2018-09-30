import React from "react";
import theme from "../../theme/index";
import uuid from "uuid-v4";
import StreamLines from "./StreamLines";

const radius = 20;
const horizontalGap = 20;
const verticalGap = 20;
const width = 1920;
const height = 280;
const logoCircleWidth = 240;

const lines = [
  {
    animation: {
      direction: "right",
      duration: "11s"
    },
    paths: [
      { width: 100 },
      { width: 200 },
      { width: 0 },
      { width: 100 },
      { width: 300 },
      { width: 200 },
      { width: 100 },
      { width: 200 },
      { width: 100 },
      { width: 20 }
    ]
  },
  {
    animation: {
      direction: "left",
      duration: "12s"
    },
    paths: [
      { width: 100 },
      { width: 200 },
      { width: 0 },
      { width: 100 },
      { width: 300 },
      { width: 200 },
      { width: 100 },
      { width: 200 },
      { width: 100 },
      { width: 20 }
    ]
  },
  {
    animation: {
      direction: "right",
      duration: "14s"
    },
    paths: [
      { width: 100 },
      { width: 200 },
      { width: 0 },
      { width: 100 },
      { width: 300 },
      { width: 200 },
      { width: 100 },
      { width: 200 },
      { width: 100 },
      { width: 20 }
    ]
  },
  {
    animation: {
      direction: "left",
      duration: "15s"
    },
    paths: [
      { width: 100 },
      { width: 200 },
      { width: 0 },
      { width: 100 },
      { width: 300 },
      { width: 200 },
      { width: 100 },
      { width: 200 },
      { width: 100 },
      { width: 20 }
    ]
  },
  {
    animation: {
      direction: "right",
      duration: "13s"
    },
    paths: [
      { width: 100 },
      { width: 200 },
      { width: 0 },
      { width: 100 },
      { width: 300 },
      { width: 200 },
      { width: 100 },
      { width: 200 },
      { width: 100 },
      { width: 20 }
    ]
  }
];

export default props => {
  let yOffset = 0;
  const streamId = uuid();

  return (
    <svg
      viewBox={`0 0 ${width * 2} ${height}`}
      fill={theme.colors.transparentGrey}
      {...props}
    >
      <defs>
        <mask id={`stream-no-circle-mask-${streamId}`}>
          <rect width={width} height={height} fill="white" />
          <circle
            cx={props.position === "right" ? 0 : width}
            cy={height / 2}
            r={logoCircleWidth}
            fill="black"
          />
        </mask>
        <mask id={`stream-gradient-mask-${streamId}`}>
          <svg
            viewBox={`0 0 ${width * 2} ${height}`}
            fill={theme.colors.transparentGrey}
          >
            <defs>
              <mask id={`stream-mask-${streamId}`}>
                <rect x="0" y="0" width={width} height={height} fill="#fff" />
              </mask>
            </defs>
            <StreamLines
              mask={`url(#stream-mask-${streamId})`}
              lines={lines}
              width={width}
              horizontalGap={horizontalGap}
              verticalGap={verticalGap}
              radius={radius}
            />
          </svg>
        </mask>
        <linearGradient id={`stream-gradient-${streamId}`}>
          <stop
            stopColor={
              props.position === "right"
                ? theme.colors.primary
                : theme.colors.transparentGrey
            }
            offset="0%"
          />
          <stop
            stopColor={
              props.position === "right"
                ? theme.colors.transparentGrey
                : theme.colors.primary
            }
            offset="100%"
          />
        </linearGradient>
      </defs>
      <svg mask={`url(#stream-gradient-mask-${streamId})`}>
        <rect
          mask={`url(#stream-no-circle-mask-${streamId})`}
          width={width}
          height={height}
          fill={`url(#stream-gradient-${streamId})`}
        />
      </svg>
    </svg>
  );
};
