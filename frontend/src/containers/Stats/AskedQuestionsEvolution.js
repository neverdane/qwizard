import React from "react";
import { DateTime } from "luxon";
import QuestionsChart from "../../components/Chart/QuestionsChart";
import { StatsContainer, StatsTitle } from "../../components/Stats/Stats";

export default props => {
  const dates = [...Array(30).keys()].reverse().map(numberOfDays => {
    return DateTime.local()
      .minus({ days: numberOfDays })
      .valueOf();
  });

  const data = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    15,
    35,
    13,
    25,
    26,
    16,
    37,
    57,
    0,
    34,
    24,
    14,
    36,
    24,
    34,
    0,
    2,
    0,
    35,
    46,
    24
  ].map((value, index) => ({
    x: dates[index],
    y: value
  }));

  return (
    <StatsContainer {...props}>
      <QuestionsChart series={[{ data }]} />
      <StatsTitle>Asked Questions</StatsTitle>
    </StatsContainer>
  );
};
