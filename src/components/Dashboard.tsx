"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Share2,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  HelpCircle,
  Brain,
  X,
  Sparkles,
  Zap,
  Target,
  Heart,
} from "lucide-react";
import EnergyGraph from "./EnergyGraph";
import StatsCards from "./StatsCards";
import BadgesDisplay from "./BadgesDisplay";
import RitualFlow from "./RitualFlow";
import { useApp } from "@/lib/context";

export default function Dashboard() {
  const {
    userData,
    streakData,
    todayLog,
    energyHistory,
    completeRitual,
    refreshData,
  } = useApp();
  const [showRitual, setShowRitual] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleCompleteRitual = async () => {
    await completeRitual();
  };

  const handleCloseRitual = () => {
    setShowRitual(false);
    refreshData();
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const ritualCompleted = todayLog?.ritualCompleted || false;

  const tips = [
    "Your subconscious mind doesn't distinguish between real and imagined experiences — visualization creates the same neural patterns as actual weight loss.",
    "The affirmations you read during tapping bypass your conscious mind's resistance and embed directly into your unconscious programming.",
    "Each tap creates a kinesthetic anchor, linking the physical sensation to the affirmation. Your body remembers what your mind forgets.",
    "After 21 consecutive days, your Reticular Activating System (RAS) will automatically filter for opportunities aligned with your weight loss goal.",
    "The breathing exercises lower cortisol (stress hormone), which directly reduces belly fat storage and increases metabolic efficiency.",
    "Your parasympathetic nervous system activation during the ritual puts your body in 'rest and digest' mode — optimal for fat metabolism.",
    "Consistency is neuroplasticity in action. Each ritual strengthens the neural pathways that support effortless weight management.",
    "The psychosomatic connection means your beliefs physically alter your hormone levels, metabolic rate, and cellular processes.",
    "Your unconscious mind processes 11 million bits of information per second — it's working on your goals even when you're not thinking about them.",
    "The tap-and-affirm technique is based on neuro-linguistic programming (NLP) — the same methods used by elite athletes and executives.",
  ];

  return (
    <>
      <AnimatePresence>
        {showRitual && (
          <RitualFlow
            onComplete={handleCompleteRitual}
            onClose={handleCloseRitual}
          />
        )}
      </AnimatePresence>

      {/* How It Works Modal */}
      <AnimatePresence>
        {showHowItWorks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowHowItWorks(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    The Science Behind NeuralSlim
                  </h2>
                </div>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Neuroplasticity & Subconscious Reprogramming
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Your brain forms new neural pathways through repetitive
                        actions. The tap-and-affirm technique creates
                        <strong> neuro-associative conditioning</strong> —
                        linking the physical action with positive affirmations,
                        encoding them directly into your subconscious mind.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        The Psychosomatic Connection
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        The mind-body connection is scientifically documented.
                        When your unconscious mind accepts a belief, your{" "}
                        <strong>autonomic nervous system</strong> adjusts
                        physiological processes — including metabolic rate,
                        cortisol levels, and hormonal balance — without
                        conscious effort.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Kinesthetic Anchoring
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        The tapping action serves as a{" "}
                        <strong>kinesthetic anchor</strong> — a technique used
                        in neuro-linguistic programming (NLP). This physical
                        motion &quot;locks in&quot; the affirmations, making
                        them more accessible to your subconscious throughout the
                        day.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Parasympathetic Activation
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        The breathing exercises activate your{" "}
                        <strong>parasympathetic nervous system</strong>,
                        reducing cortisol (the stress hormone linked to weight
                        gain) and putting your body in an optimal state for fat
                        metabolism.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Reticular Activating System (RAS)
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Daily rituals program your <strong>RAS</strong> — the
                        brain&apos;s filtering system — to notice opportunities
                        and make choices aligned with your weight loss goals.
                        Your subconscious starts working toward your goal 24/7,
                        even when you&apos;re not thinking about it.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-emerald-800 text-sm leading-relaxed">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    <strong>The Key:</strong> Consistency. Each ritual
                    reinforces neural pathways, making the subconscious
                    programming stronger. After 21 days, these patterns become
                    automatic — your body works toward weight loss without
                    conscious effort.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/img.png"
                alt="NeuralSlim Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-contain"
              />
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                NeuralSlim
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowHowItWorks(true)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors text-xs sm:text-sm"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">How it works</span>
              </button>
              {streakData && streakData.currentStreak > 0 && (
                <div className="flex items-center gap-1.5 sm:gap-2 bg-orange-50 border border-orange-200 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-orange-500" />
                  <span className="text-orange-700 font-medium text-xs sm:text-sm">
                    {streakData.currentStreak} day{streakData.currentStreak > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-100 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <span className="text-gray-600 text-xs sm:text-sm font-medium">
                  Lvl {streakData?.level || 1}
                </span>
              </div>
            </div>
          </div>
        </header>
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <span className="text-gray-600 text-sm font-medium">
                  Level {streakData?.level || 1}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {greeting()}
              {userData?.name ? `, ${userData.name}` : ""}!
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              {ritualCompleted
                ? "Great job! You've completed today's ritual. Come back tomorrow!"
                : "Ready for your Daily Metabolic Ritual?"}
            </p>
          </motion.div>

          {/* Daily Ritual Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`mb-6 sm:mb-8 rounded-xl sm:rounded-2xl p-4 sm:p-6 border ${
              ritualCompleted
                ? "bg-emerald-50 border-emerald-200"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center ${
                    ritualCompleted
                      ? "bg-emerald-100"
                      : "bg-gradient-to-br from-emerald-500 to-teal-600"
                  }`}
                >
                  {ritualCompleted ? (
                    <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                  ) : (
                    <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {ritualCompleted
                      ? "Ritual Complete!"
                      : "Daily Metabolic Ritual"}
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {ritualCompleted
                      ? "Your neural pathways are strengthening!"
                      : "2-minute ritual to reprogram your mind"}
                  </p>
                </div>
              </div>

              {!ritualCompleted && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowRitual(true)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Start Ritual <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </motion.button>
              )}

              {ritualCompleted && (
                <div className="flex items-center gap-4">
                  <div className="text-center px-4">
                    <p className="text-xl sm:text-2xl font-bold text-emerald-600">
                      ✓ Done
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">Today</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="mb-6 sm:mb-8">
            <StatsCards
              currentStreak={streakData?.currentStreak || 0}
              longestStreak={streakData?.longestStreak || 0}
              totalRituals={streakData?.totalRituals || 0}
              level={streakData?.level || 1}
            />
          </div>

          {/* Energy Graph */}
          <div className="mb-6 sm:mb-8">
            <EnergyGraph
              data={energyHistory}
              currentStreak={streakData?.currentStreak || 0}
              totalRituals={streakData?.totalRituals || 0}
            />
          </div>

          {/* Badges */}
          <div className="mb-6 sm:mb-8">
            <BadgesDisplay badges={streakData?.badges || []} />
          </div>

          {/* Daily Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                  Subconscious Insight
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                  {tips[Math.floor(Math.random() * tips.length)]}
                </p>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 mt-8 sm:mt-12 py-4 sm:py-6 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2">
              <img
                src="/img.png"
                alt="NeuralSlim Logo"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-contain"
              />
              <span className="font-semibold text-gray-600 text-sm sm:text-base">NeuralSlim</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "NeuralSlim",
                      text: "Lose weight with neural reprogramming - just 2 minutes a day!",
                      url: window.location.href,
                    });
                  }
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <p className="text-gray-400 text-xs sm:text-sm">
                Your Daily Wellness Companion
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
