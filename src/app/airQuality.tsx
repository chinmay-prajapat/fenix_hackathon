import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AirQualityGraph = ({ data }) => {
  const labels = data.o3.map((item) => item.day);

  const chartData = {
    labels,
    datasets: [
      {
        label: "O3 Avg",
        data: data.o3.map((item) => item.avg),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "O3 Max",
        data: data.o3.map((item) => item.max),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
      },
      {
        label: "O3 Min",
        data: data.o3.map((item) => item.min),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
      },
      {
        label: "PM10 Avg",
        data: data.pm10.map((item) => item.avg),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
      },
      {
        label: "PM10 Max",
        data: data.pm10.map((item) => item.max),
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
      },
      {
        label: "PM10 Min",
        data: data.pm10.map((item) => item.min),
        borderColor: "rgba(255,206,86,1)",
        backgroundColor: "rgba(255,206,86,0.2)",
      },
      {
        label: "PM2.5 Avg",
        data: data.pm25.map((item) => item.avg),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "PM2.5 Max",
        data: data.pm25.map((item) => item.max),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
      },
      {
        label: "PM2.5 Min",
        data: data.pm25.map((item) => item.min),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Air Quality Over Time",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default AirQualityGraph;
