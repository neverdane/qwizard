import React from "react";
import { DateTime } from "luxon";
import QuestionsChart, {
  QuestionsChartContainer,
  QuestionsChartTitle
} from "../../components/Chart/QuestionsChart";

export default () => {
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
    <QuestionsChartContainer>
      <QuestionsChart series={[{ data }]} />
      <QuestionsChartTitle>Asked Questions</QuestionsChartTitle>
    </QuestionsChartContainer>
  );
};
