import React from "react";

export default ({
  paths,
  radius = 20,
  horizontalGap = 20,
  children,
  ...props
}) => {
  let offset = -horizontalGap;
  return (
    <svg {...props}>
      {paths.map(linePath => {
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
      {children}
    </svg>
  );
};
