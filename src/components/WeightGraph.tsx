"use client";

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
  Filler,
} from "chart.js";
import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeightEntry {
  date: string;
  weight: number;
  projected: number;
}

interface WeightGraphProps {
  data: WeightEntry[];
  startWeight: number;
  goalWeight: number;
}

export default function WeightGraph({
  data,
  startWeight,
  goalWeight,
}: WeightGraphProps) {
  // Take last 14 days or all data if less
  const displayData = data.slice(-14);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const chartData = {
    labels: displayData.map((d) => formatDate(d.date)),
    datasets: [
      {
        label: "Your Weight",
        data: displayData.map((d) => d.weight),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(16, 185, 129)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Goal Path",
        data: displayData.map((d) => d.projected),
        borderColor: "rgba(20, 184, 166, 0.5)",
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#6b7280",
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(16, 185, 129, 0.5)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const value = context.parsed?.y ?? 0;
            return `${context.dataset.label}: ${value.toFixed(1)} lbs`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        min: goalWeight - 5,
        max: startWeight + 5,
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          color: "#6b7280",
          callback: (value: number | string) => `${value} lbs`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  const currentWeight =
    displayData.length > 0
      ? displayData[displayData.length - 1].weight
      : startWeight;
  const totalLost = startWeight - currentWeight;
  const percentToGoal = (totalLost / (startWeight - goalWeight)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Weight Progress
            </h2>
          </div>
          <p className="text-gray-500 text-sm">
            Your journey to {goalWeight} lbs
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-emerald-600">
            {currentWeight.toFixed(1)} lbs
          </p>
          <p className="text-emerald-500 text-sm font-medium flex items-center justify-end gap-1">
            <TrendingDown className="w-4 h-4" /> {totalLost.toFixed(1)} lbs lost
          </p>
        </div>
      </div>

      {/* Progress to goal */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Progress to goal</span>
          <span className="text-emerald-600 font-medium">
            {Math.min(percentToGoal, 100).toFixed(0)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentToGoal, 100)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-400">{startWeight} lbs (start)</span>
          <span className="text-emerald-500">{goalWeight} lbs (goal)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
}
