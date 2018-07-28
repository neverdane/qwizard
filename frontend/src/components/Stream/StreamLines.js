import React from "react";
import StreamLine from "./StreamLine";

export default ({
  lines,
  radius = 20,
  horizontalGap = 20,
  verticalGap = 20,
  width = 1920,
  ...props
}) => {
  let yOffset = 0;
  return (
    <svg {...props}>
      {lines.map(({ paths, animation }) => {
        yOffset += radius * 2 + verticalGap;

        return (
          <StreamLine
            paths={animation ? [...paths, ...paths] : paths}
            y={yOffset - (radius * 2 + verticalGap)}
            horizontalGap={horizontalGap}
            radius={radius}
          >
            {animation && (
              <animate
                attributeName="x"
                from={animation.direction === "left" ? 0 : -width}
                to={animation.direction === "left" ? -width : 0}
                dur={animation.duration}
                fill="remove"
                repeatCount="indefinite"
              />
            )}
          </StreamLine>
        );
      })}
    </svg>
  );
};
