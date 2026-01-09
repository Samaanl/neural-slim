"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Target, User, ArrowRight, ArrowLeft } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (data: {
    currentWeight: number;
    goalWeight: number;
    height: number;
    age: number;
    gender: "male" | "female" | "other";
    name?: string;
  }) => void;
}

type Step = "weight" | "goal" | "details" | "name";

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<Step>("weight");
  const [currentWeight, setCurrentWeight] = useState<string>("");
  const [goalWeight, setGoalWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female" | "other">("other");
  const [name, setName] = useState<string>("");

  const handleNext = () => {
    if (step === "weight" && currentWeight) {
      setStep("goal");
    } else if (step === "goal" && goalWeight) {
      setStep("details");
    } else if (step === "details" && height && age) {
      setStep("name");
    } else if (step === "name") {
      onComplete({
        currentWeight: parseFloat(currentWeight),
        goalWeight: parseFloat(goalWeight),
        height: parseFloat(height),
        age: parseInt(age),
        gender,
        name: name || undefined,
      });
    }
  };

  const handleBack = () => {
    if (step === "goal") setStep("weight");
    else if (step === "details") setStep("goal");
    else if (step === "name") setStep("details");
  };

  const canProceed = () => {
    switch (step) {
      case "weight":
        return currentWeight && parseFloat(currentWeight) > 0;
      case "goal":
        return (
          goalWeight &&
          parseFloat(goalWeight) > 0 &&
          parseFloat(goalWeight) < parseFloat(currentWeight)
        );
      case "details":
        return height && age && parseFloat(height) > 0 && parseInt(age) > 0;
      case "name":
        return true;
    }
  };

  const stepIndex = ["weight", "goal", "details", "name"].indexOf(step);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {["weight", "goal", "details", "name"].map((s, i) => (
            <div
              key={s}
              className={`h-1 sm:h-1.5 w-10 sm:w-12 rounded-full transition-colors ${
                stepIndex >= i ? "bg-emerald-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Weight Step */}
          {step === "weight" && (
            <motion.div
              key="weight"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                What&apos;s your current weight?
              </h2>
              <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
                This helps us track your progress
              </p>

              <div className="relative mb-6 sm:mb-8">
                <input
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="180"
                  className="w-full text-center text-3xl sm:text-4xl font-bold bg-white border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3 sm:py-4 px-6 text-gray-900 placeholder-gray-300 focus:outline-none transition-colors"
                  autoFocus
                />
                <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg font-medium">
                  lbs
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
              >
                Continue <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* Goal Step */}
          {step === "goal" && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                What&apos;s your goal weight?
              </h2>
              <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
                Dream big! We&apos;ll help you get there
              </p>

              <div className="relative mb-4">
                <input
                  type="number"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                  placeholder="150"
                  className="w-full text-center text-3xl sm:text-4xl font-bold bg-white border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3 sm:py-4 px-6 text-gray-900 placeholder-gray-300 focus:outline-none transition-colors"
                  autoFocus
                />
                <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg font-medium">
                  lbs
                </span>
              </div>

              {goalWeight &&
                parseFloat(currentWeight) &&
                parseFloat(goalWeight) < parseFloat(currentWeight) && (
                  <p className="text-emerald-600 mb-5 sm:mb-6 font-medium text-sm sm:text-base">
                    That&apos;s{" "}
                    {(
                      parseFloat(currentWeight) - parseFloat(goalWeight)
                    ).toFixed(0)}{" "}
                    lbs to lose — totally achievable!
                  </p>
                )}

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleBack}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                >
                  Continue <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Details Step */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <User className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                A few more details
              </h2>
              <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
                This helps personalize your experience
              </p>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="relative">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height (e.g., 68)"
                    className="w-full text-center text-lg sm:text-xl font-semibold bg-white border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-2.5 sm:py-3 px-6 text-gray-900 placeholder-gray-300 focus:outline-none transition-colors"
                  />
                  <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm">
                    inches
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age (e.g., 30)"
                    className="w-full text-center text-lg sm:text-xl font-semibold bg-white border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-2.5 sm:py-3 px-6 text-gray-900 placeholder-gray-300 focus:outline-none transition-colors"
                  />
                  <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm">
                    years
                  </span>
                </div>

                <div className="flex gap-2">
                  {(["male", "female", "other"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 sm:py-3 rounded-xl font-medium transition-all border-2 text-sm sm:text-base ${
                        gender === g
                          ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleBack}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                >
                  Continue <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Name Step */}
          {step === "name" && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <User className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                What should we call you?
              </h2>
              <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
                Optional, but we&apos;d love to personalize your experience
              </p>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full text-center text-xl sm:text-2xl font-semibold bg-white border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3 sm:py-4 px-6 text-gray-900 placeholder-gray-300 focus:outline-none transition-colors mb-6 sm:mb-8"
                autoFocus
              />

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleBack}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleNext}
                  className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                >
                  Start My Journey{" "}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
