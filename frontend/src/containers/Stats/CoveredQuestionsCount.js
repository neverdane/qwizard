import React from "react";
import { StatsContainer, StatsTitle } from "../../components/Stats/Stats";
import PercentPie from "../../components/Chart/PercentPie";

export default props => {
  return (
    <StatsContainer direction="row" {...props}>
      <PercentPie value={67} />
      <StatsTitle>
        Covered questions<br />this last month
      </StatsTitle>
    </StatsContainer>
  );
};
