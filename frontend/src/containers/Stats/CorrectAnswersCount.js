import React from "react";
import { StatsContainer, StatsTitle } from "../../components/Stats/Stats";
import PercentPie from "../../components/Chart/PercentPie";

export default () => {
  return (
    <StatsContainer direction="row-reverse">
      <PercentPie value={32} />
      <StatsTitle>
        Correct answers<br />this last month
      </StatsTitle>
    </StatsContainer>
  );
};
