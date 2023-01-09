import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ chartData }) {
  console.log("chart", chartData);

  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      {chartData && (
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: false,
                // text: "Users Gained between 2016-2020",
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                display: false,
              },

              y: {
                display: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}
