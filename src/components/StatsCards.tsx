"use client";

import { motion } from "framer-motion";
import { Flame, Target, Calendar, Trophy } from "lucide-react";

interface StatsCardsProps {
  currentStreak: number;
  longestStreak: number;
  totalRituals: number;
  level: number;
}

export default function StatsCards({
  currentStreak,
  longestStreak,
  totalRituals,
  level,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Current Streak",
      value: currentStreak,
      suffix: " days",
      icon: Flame,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Best Streak",
      value: longestStreak,
      suffix: " days",
      icon: Target,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Total Rituals",
      value: totalRituals,
      suffix: "",
      icon: Calendar,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Your Level",
      value: level,
      suffix: "",
      icon: Trophy,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {stat.value}
            {stat.suffix}
          </p>
          <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
