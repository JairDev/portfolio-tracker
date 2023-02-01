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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function LineChart<T>({
  priceChartData,
  chartValueClassName,
}: {
  priceChartData: Array<T>;
  chartValueClassName: string;
}) {
  const chartData = {
    //@ts-ignore
    labels: priceChartData?.map((row) => row[0]),
    datasets: [
      {
        label: "",
        //@ts-ignore
        data: priceChartData?.map((row) => row[1]),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        pointBackgroundColor: "none",
        pointRadius: 0,

        pointBorderWidth: 0,
        borderColor: chartValueClassName,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      {chartData && (
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: false,
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
