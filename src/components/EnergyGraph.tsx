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
import {
  Brain,
  Flame,
  Target,
  Sparkles,
  Sprout,
  Zap,
  Eye,
  Rocket,
  Award,
} from "lucide-react";

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

interface EnergyEntry {
  date: string;
  score: number;
  streak: number;
}

interface EnergyGraphProps {
  data: EnergyEntry[];
  currentStreak: number;
  totalRituals: number;
}

export default function EnergyGraph({
  data,
  currentStreak,
  totalRituals,
}: EnergyGraphProps) {
  // Take last 30 days for the chart
  const displayData = data.slice(-30);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Days completed is the key metric
  const daysCompleted = totalRituals;

  // 90 days is the full transformation journey
  const FULL_JOURNEY_DAYS = 90;
  const daysRemaining = Math.max(FULL_JOURNEY_DAYS - daysCompleted, 0);

  // Progress to full transformation (90 days)
  const habitProgress = Math.min(
    (daysCompleted / FULL_JOURNEY_DAYS) * 100,
    100
  );

  // Get current phase and next milestone
  const getPhaseInfo = () => {
    // Phase 1: Awakening (Days 1-7)
    if (daysCompleted < 7) {
      return {
        phase: 1,
        title: "Awakening Phase",
        icon: Sprout,
        description: `Your subconscious is beginning to listen. ${
          7 - daysCompleted
        } more days to unlock Neural Activation!`,
        nextMilestone: "Neural Activation",
        daysToNext: 7 - daysCompleted,
        color: "gray",
      };
    }
    // Phase 2: Neural Activation (Days 7-21)
    if (daysCompleted < 21) {
      return {
        phase: 2,
        title: "Neural Activation Phase",
        icon: Zap,
        description: `Your brain is creating new pathways! ${
          21 - daysCompleted
        } days until Deep Reprogramming unlocks.`,
        nextMilestone: "Deep Reprogramming",
        daysToNext: 21 - daysCompleted,
        color: "amber",
      };
    }
    // Phase 3: Deep Reprogramming (Days 21-45)
    if (daysCompleted < 45) {
      return {
        phase: 3,
        title: "Deep Reprogramming Phase",
        icon: Brain,
        description: `Neural pathways are strengthening! ${
          45 - daysCompleted
        } days to Subconscious Integration.`,
        nextMilestone: "Subconscious Integration",
        daysToNext: 45 - daysCompleted,
        color: "sky",
      };
    }
    // Phase 4: Subconscious Integration (Days 45-66)
    if (daysCompleted < 66) {
      return {
        phase: 4,
        title: "Subconscious Integration Phase",
        icon: Eye,
        description: `Your unconscious mind is adapting! ${
          66 - daysCompleted
        } days to Automatic Mode.`,
        nextMilestone: "Automatic Mode",
        daysToNext: 66 - daysCompleted,
        color: "teal",
      };
    }
    // Phase 5: Automatic Mode (Days 66-90)
    if (daysCompleted < 90) {
      return {
        phase: 5,
        title: "Automatic Mode Phase",
        icon: Rocket,
        description: `Weight loss is becoming effortless! ${
          90 - daysCompleted
        } days to Full Transformation.`,
        nextMilestone: "Full Transformation",
        daysToNext: 90 - daysCompleted,
        color: "emerald",
      };
    }
    // Phase 6: Full Transformation (90+ days) - but keep them engaged!
    return {
      phase: 6,
      title: "Transformation Complete",
      icon: Award,
      description:
        "You've reprogrammed your mind! Keep going to maintain and deepen your neural pathways. Every day strengthens your results!",
      nextMilestone: "Lifetime Mastery",
      daysToNext: 0,
      color: "emerald",
    };
  };

  const phaseInfo = getPhaseInfo();

  const chartData = {
    labels: displayData.map((d) => formatDate(d.date)),
    datasets: [
      {
        label: "Brain Reprogramming",
        data: displayData.map((d, index) => {
          // Score increases with each day - simulating neural pathway strength
          const baseProgress = ((index + 1) / 90) * 100;
          const streakBonus = d.streak * 1.5;
          return Math.min(baseProgress + streakBonus, 100);
        }),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: displayData.length <= 7 ? 6 : 4,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgb(16, 185, 129)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(16, 185, 129, 0.5)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (context: { label: string }[]) => `Day: ${context[0].label}`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const value = context.parsed?.y ?? 0;
            return `Neural Strength: ${value.toFixed(0)}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9ca3af",
          font: { size: 11 },
          maxRotation: 45,
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          color: "#9ca3af",
          callback: (value: number | string) => `${value}%`,
          stepSize: 25,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          90-Day Neural Transformation
        </h2>
      </div>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
        Complete the full journey to permanently reprogram your subconscious for
        effortless weight loss
      </p>

      {/* Current Phase Banner */}
      <div
        className={`bg-gradient-to-r from-${phaseInfo.color}-50 to-${phaseInfo.color}-100 border border-${phaseInfo.color}-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div>
            <p
              className={`text-${phaseInfo.color}-800 font-bold text-base sm:text-lg flex items-center gap-2`}
            >
              <phaseInfo.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              {phaseInfo.title}
            </p>
            <p
              className={`text-${phaseInfo.color}-700 text-xs sm:text-sm mt-1`}
            >
              {phaseInfo.description}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-gray-500">Phase</p>
            <p
              className={`text-xl sm:text-2xl font-bold text-${phaseInfo.color}-600`}
            >
              {phaseInfo.phase}/6
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        {/* Days Completed */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-emerald-100">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
            {daysCompleted}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
            Days Completed
          </p>
        </div>

        {/* Current Streak */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-orange-100">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-orange-600">
            {currentStreak}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
            Day Streak
          </p>
        </div>

        {/* Days to Next Phase */}
        <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-sky-100">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-sky-600">
            {phaseInfo.daysToNext === 0 ? "✓" : phaseInfo.daysToNext}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
            {phaseInfo.daysToNext === 0 ? "Complete!" : "Days to Next"}
          </p>
        </div>

        {/* Journey Progress */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-purple-100">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600">
            {habitProgress.toFixed(0)}%
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
            Journey Complete
          </p>
        </div>
      </div>

      {/* Progress Bar to 90 Days */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Full Transformation Progress
          </span>
          <span className="text-xs sm:text-sm text-gray-500">
            {daysCompleted}/90 days
          </span>
        </div>
        <div className="h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${habitProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          />
        </div>
        {/* Phase markers */}
        <div className="flex justify-between mt-1 px-0.5 sm:px-1">
          <span className="text-[10px] sm:text-xs text-gray-400">Start</span>
          <span className="text-[10px] sm:text-xs text-gray-400">21d</span>
          <span className="text-[10px] sm:text-xs text-gray-400">45d</span>
          <span className="text-[10px] sm:text-xs text-gray-400">66d</span>
          <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-0.5 sm:gap-1">
            90d <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </span>
        </div>
      </div>

      {/* Next Milestone */}
      {phaseInfo.daysToNext > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-amber-800 font-semibold flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Next Unlock: {phaseInfo.nextMilestone}
              </p>
              <p className="text-amber-700 text-xs sm:text-sm">
                {phaseInfo.daysToNext} days away — keep your streak going!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {displayData.length > 0 && (
        <div className="h-36 sm:h-48 mb-3 sm:mb-4">
          <Line data={chartData} options={options} />
        </div>
      )}

      {/* Explanation */}
      <div className="pt-3 sm:pt-4 border-t border-gray-100">
        <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed">
          <strong className="text-gray-700">The Science:</strong> Research shows
          it takes 66-90 days to form permanent behavioral changes. Each phase
          unlocks deeper levels of subconscious reprogramming. The longer you
          continue, the more automatic and effortless your transformation
          becomes.{" "}
          <strong>Breaking your streak resets your neural progress</strong> —
          consistency is everything!
        </p>
      </div>
    </motion.div>
  );
}
