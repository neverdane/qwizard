import React from "react";
import {
  StatsContainer,
  StatsFloatingContent,
  StatsTitle
} from "../../components/Stats/Stats";
import Number from "../../components/Chart/Number";
import TotalQuestionsEvolution from "./TotalQuestionsEvolution";

export default props => (
  <StatsContainer padded={false} bordered={false} backgroundMode="dark" direction='none' {...props}>
    <TotalQuestionsEvolution />
    <StatsFloatingContent>
      <Number value={1450} />
      <StatsTitle>Total Questions</StatsTitle>
    </StatsFloatingContent>
  </StatsContainer>
);
