"use client";

import { motion } from "framer-motion";
import {
  Sword,
  Crown,
  Target,
  Star,
  Sparkles,
  Award,
  Zap,
  Lock,
  Brain,
  Flame,
  Trophy,
  Rocket,
  Gem,
} from "lucide-react";

interface BadgesDisplayProps {
  badges: string[];
}

const BADGE_INFO: Record<
  string,
  {
    icon: typeof Sword;
    title: string;
    description: string;
    color: string;
    funFact: string;
  }
> = {
  "3-day-warrior": {
    icon: Sword,
    title: "Mind Warrior",
    description: "3 days of neural activation",
    color: "text-orange-600 bg-orange-50",
    funFact: "Your subconscious is taking notice!",
  },
  "week-champion": {
    icon: Crown,
    title: "Habit Royalty",
    description: "7 days of consistent ritual",
    color: "text-amber-600 bg-amber-50",
    funFact: "New neural pathways are forming!",
  },
  "fortnight-master": {
    icon: Brain,
    title: "Mindset Master",
    description: "14 days of reprogramming",
    color: "text-emerald-600 bg-emerald-50",
    funFact: "Your unconscious is fully aligned!",
  },
  "monthly-legend": {
    icon: Gem,
    title: "Transformation Legend",
    description: "30 days of dedication",
    color: "text-teal-600 bg-teal-50",
    funFact: "You've rewritten your mental blueprint!",
  },
  "ritual-adept": {
    icon: Sparkles,
    title: "Manifestation Adept",
    description: "10 total activations",
    color: "text-sky-600 bg-sky-50",
    funFact: "Your intentions are gaining power!",
  },
  "ritual-master": {
    icon: Trophy,
    title: "Subconscious Sage",
    description: "50 total activations",
    color: "text-indigo-600 bg-indigo-50",
    funFact: "Master-level mind programming!",
  },
  "calorie-crusher": {
    icon: Zap,
    title: "Energy Alchemist",
    description: "5,000+ calories transformed",
    color: "text-rose-600 bg-rose-50",
    funFact: "Your body is a calorie-burning machine!",
  },
  "first-ritual": {
    icon: Rocket,
    title: "The Awakening",
    description: "Complete your first ritual",
    color: "text-purple-600 bg-purple-50",
    funFact: "Your transformation journey begins!",
  },
  "streak-phoenix": {
    icon: Flame,
    title: "Streak Phoenix",
    description: "Recover after breaking streak",
    color: "text-red-600 bg-red-50",
    funFact: "Rising from the ashes, stronger!",
  },
  "century-tapper": {
    icon: Target,
    title: "Centurion Tapper",
    description: "100+ total affirmation taps",
    color: "text-cyan-600 bg-cyan-50",
    funFact: "100 intentions sent to the universe!",
  },
};

export default function BadgesDisplay({ badges }: BadgesDisplayProps) {
  const unlockedSet = new Set(badges);
  const unlockedCount = Object.keys(BADGE_INFO).filter((key) =>
    unlockedSet.has(key)
  ).length;
  const totalCount = Object.keys(BADGE_INFO).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Achievements
            </h2>
            <p className="text-sm text-gray-500">
              {unlockedCount}/{totalCount} unlocked
            </p>
          </div>
        </div>
        {unlockedCount > 0 && (
          <div className="flex items-center gap-1 text-amber-600">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">
              Level {Math.floor(unlockedCount / 2) + 1}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {Object.entries(BADGE_INFO).map(([key, badge]) => {
          const isUnlocked = unlockedSet.has(key);
          const IconComponent = badge.icon;
          const colorClasses = badge.color.split(" ");

          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`group relative p-4 rounded-xl text-center transition-all border cursor-pointer ${
                isUnlocked
                  ? "bg-white border-gray-200 shadow-sm hover:shadow-md"
                  : "bg-gray-50 border-gray-100 opacity-60 hover:opacity-80"
              }`}
            >
              {/* Fun fact tooltip on hover */}
              {isUnlocked && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {badge.funFact}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}

              <div
                className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isUnlocked ? colorClasses[1] : "bg-gray-100"
                }`}
              >
                {isUnlocked ? (
                  <IconComponent className={`w-6 h-6 ${colorClasses[0]}`} />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <p
                className={`text-sm font-medium ${
                  isUnlocked ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {badge.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
