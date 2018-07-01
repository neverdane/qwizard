import React from "react";
import { StatsContainer, StatsTitle } from "../../components/Stats/Stats";
import PercentPie from "../../components/Chart/PercentPie";

export default () => {
  return (
    <StatsContainer direction="row">
      <PercentPie value={67} />
      <StatsTitle>
        Covered questions<br />this last month
      </StatsTitle>
    </StatsContainer>
  );
};
