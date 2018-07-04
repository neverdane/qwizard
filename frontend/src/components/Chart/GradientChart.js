import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const defaultOptions = {
  title: {
    text:null
  },
  chart: {
    type: "area",
    margin: [-30, -3, 0, 0],
    backgroundColor: "transparent",
    height: "130px"
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xAxis: {
    visible: false
  },
  yAxis: {
    visible: false
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, 'rgba(255, 255, 255, 0.2)'],
          [1, 'rgba(255, 255, 255, 0)']
        ]
      },
      color: '',
      lineWidth: 0,
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
      series: series
    }}
    {...otherProps}
  />
);
