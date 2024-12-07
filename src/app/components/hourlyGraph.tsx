import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { WeatherData } from "../types/hourlyData";

const HourlyWeatherChart = ({ hourlyData }: { hourlyData: WeatherData[] }) => {
  const formattedData = hourlyData.map((data) => ({
    time: moment(data.DateTime).format("HH:mm"),
    temperature: data.Temperature.Value,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={200}
      style={{ paddingRight: 30, paddingTop: 10 }}
    >
      <LineChart style={{ color: "#fff" }} data={formattedData}>
        <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
        <XAxis stroke="#fff" dataKey="time" />
        <YAxis stroke="#fff" fill="#fff" />
        <Tooltip
          contentStyle={{
            background: "rgb(0, 0, 0, 0.3)",
            border: "none",
            borderRadius: 20,
          }}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HourlyWeatherChart;
