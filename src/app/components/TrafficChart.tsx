// TrafficChart.js

import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { TrafficData } from "../types/trafficData";
import { Chart, registerables, ChartOptions } from "chart.js";

Chart.register(...registerables);
const TrafficChart = ({ weekDayData }: { weekDayData: TrafficData[] }) => {
  // Extracting data for chart
  const labels = weekDayData.map((day) => day.UpdateWeekDay);
  const jamsCountData = weekDayData.map((day) => parseInt(day.JamsCount));
  const jamsLengthData = weekDayData.map((day) => parseFloat(day.JamsLength));
  const trafficIndexData = weekDayData.map((day) =>
    parseInt(day.TrafficIndexLive)
  );
  // Data object for Chart.js
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Jams Count",
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.8)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: jamsCountData,
      },
      {
        label: "Jams Length",
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.8)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: jamsLengthData,
      },

      {
        label: "Traffic Index Live",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: trafficIndexData,
      },
    ],
  };

  // Options for Chart.js
  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
      x: {
        type: "category",
        labels: labels,
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default TrafficChart;
