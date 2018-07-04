import React from "react";
import { DateTime } from "luxon";
import QuestionsChart from "../../components/Chart/QuestionsChart";
import { StatsContainer, StatsTitle } from "../../components/Stats/Stats";
import GradientChart from "../../components/Chart/GradientChart";

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
    56,
    56,
    79,
    85,
    103,
    157,
    160,
    184,
    224,
    274,
    336,
    374,
    374,
    400,
    420,
    450,
    535,
    646,
    694
  ].map((value, index) => ({
    x: dates[index],
    y: value
  }));

  return <GradientChart series={[{ data }]} />;
};
