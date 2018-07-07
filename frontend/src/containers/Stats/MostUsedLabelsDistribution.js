import React from "react";
import { StatsContainer, StatsTitle } from "../../components/Stats/Stats";
import HorizontalBars from "../../components/Chart/HorizontalBars";

export default props => {
  const labels = [
    {
      name: "Histoire",
      count: 425
    },
    {
      name: "Géographie",
      count: 203
    },
    {
      name: "Peinture",
      count: 178
    },
    {
      name: "Cinéma",
      count: 113
    }
  ];

  return (
    <StatsContainer titlePosition="topLeft" {...props}>
      <StatsTitle>Most Used Labels</StatsTitle>
      <HorizontalBars data={labels} total={1050} />
    </StatsContainer>
  );
};
