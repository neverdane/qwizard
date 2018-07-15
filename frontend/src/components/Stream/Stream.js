import React from "react";
import theme from "../../theme/index";
import uuid from "uuid-v4";

const radius = 20;
const horizontalGap = 20;
const verticalGap = 20;
const width = 1920;
const height = 280;
const logoCircleWidth = 240;

const lines = [
  {
    direction: "right",
    duration: "5s",
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
    direction: "left",
    duration: "6s",
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
    direction: "right",
    duration: "8s",
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
    direction: "left",
    duration: "8s",
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
    direction: "right",
    duration: "7s",
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

const StreamLine = ({ paths, direction, duration, y }) => {
  let offset = 0;
  const linesPaths = [...paths, ...paths];
  return (
    <svg y={y}>
      {linesPaths.map(linePath => {
        const lineWidth = linePath.width;
        const totalWidth = lineWidth + 2 * radius;
        offset += totalWidth + horizontalGap;

        return (
          <path
            d={`M${radius +
              offset -
              totalWidth},0 h${lineWidth} a${radius},${radius} 0 0 1 ${radius},${radius} a${radius},${radius} 0 0 1 -${radius},${radius} h-${lineWidth} a${radius},${radius} 0 0 1 -${radius},-${radius} a${radius},${radius} 0 0 1 ${radius},-${radius} z`}
          />
        );
      })}
      <animate
        attributeName="x"
        from={direction === "left" ? 0 : -width}
        to={direction === "left" ? -width : 0}
        dur={duration}
        fill="remove"
        repeatCount="indefinite"
      />
    </svg>
  );
};

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
            <svg mask={`url(#stream-mask-${streamId})`}>
              {lines.map(line => {
                yOffset += radius * 2 + verticalGap;

                return (
                  <StreamLine
                    {...line}
                    y={yOffset - (radius * 2 + verticalGap)}
                  />
                );
              })}
            </svg>
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
