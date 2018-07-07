import React from "react";
import { StatsContainer, StatsTitle } from "../../components/Stats/Stats";
import PercentPie from "../../components/Chart/PercentPie";

export default props => {
  return (
    <StatsContainer direction="row-reverse" {...props}>
      <PercentPie value={32} />
      <StatsTitle>
        Correct answers<br />this last month
      </StatsTitle>
    </StatsContainer>
  );
};
