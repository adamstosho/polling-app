"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ChartData as ChartJSData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartData {
  name: string;
  votes: number;
  percentage: string;
}

interface ChartsProps {
  chartData: ChartData[];
}

export function BarChartComponent({ chartData }: ChartsProps) {
  const data: ChartJSData<"bar"> = {
    labels: chartData.map((d) => d.name),
    datasets: [
      {
        label: "Votes",
        data: chartData.map((d) => d.votes),
        backgroundColor: [
          "#8b5cf6",
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderRadius: 4,
      },
    ],
  };
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Votes: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280", font: { size: 12 } },
      },
      y: {
        ticks: { color: "#6b7280", font: { size: 12 } },
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} style={{ height: "100%" }} />;
}

export function PieChartComponent({ chartData }: ChartsProps) {
  const data: ChartJSData<"pie"> = {
    labels: chartData.map((d) => d.name),
    datasets: [
      {
        label: "Votes",
        data: chartData.map((d) => d.votes),
        backgroundColor: [
          "#8b5cf6",
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };
  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = chartData.reduce((sum, d) => sum + d.votes, 0);
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} votes (${percent}%)`;
          },
        },
      },
    },
  };
  return <Pie data={data} options={options} style={{ height: "100%" }} />;
} 