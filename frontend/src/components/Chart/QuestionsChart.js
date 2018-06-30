import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import theme from "../../theme";
import { DateTime } from "luxon";
import { Flex } from "grid-styled";
import styled from "styled-components";

export const QuestionsChartContainer = Flex.extend`
  flex-direction: column;
  border-bottom: 0.05em solid rgba(255, 255, 255, 0.05);
  padding: 1em;
`;

export const QuestionsChartTitle = styled.span`
  color: rgba(255, 255, 255, 0.25);
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8em;
  margin: 1em 0 0;
`;

const defaultOptions = {
  title: {
    text:null
  },
  chart: {
    type: "spline",
    margin: [10, 10, 10, 10],
    backgroundColor: "transparent",
    height: "95px"
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, .2)",
    style: {
      fontFamily: theme.text.fonts.primary,
      color: "white"
    },
    formatter: function() {
      return `${DateTime.fromMillis(this.x).toFormat("DD")}<br>${
        this.y
      } questions`;
    }
  },
  xAxis: {
    visible: false
  },
  yAxis: {
    visible: false
  },
  plotOptions: {
    spline: {
      color: theme.colors.primary,
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 2
        }
      },
      marker: {
        enabled: false
      }
    }
  }
};

export default ({ options = {}, series = [], ...otherProps }) => (
  <HighchartsReact
    highcharts={Highcharts}
    options={{
      ...defaultOptions,
      ...options,
      series: series.map(serie => ({
        ...serie,
        data: serie.data.map((value, index) => ({
          ...value,
          marker: {
            enabled: index === serie.data.length - 1
          }
        })),
        color: {
          linearGradient: [0, 0, 0, 70],
          stops: [[0.5, theme.colors.primary], [1, theme.colors.red]]
        }
      }))
    }}
    {...otherProps}
  />
);
