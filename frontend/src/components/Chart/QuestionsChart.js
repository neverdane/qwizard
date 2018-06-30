import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import theme from "../../theme";
import { DateTime } from "luxon";

export const defaultOptions = {
  chart: {
    type: "spline",
    margin: [30, 20, 100, 20],
    backgroundColor: "transparent",
    height: "200px"
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
