"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Wind,
  Target,
  Zap,
  CheckCircle,
  X,
  ArrowRight,
  Flame,
  Brain,
  Sparkles,
} from "lucide-react";

interface RitualFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

type RitualStep =
  | "intro"
  | "breathing"
  | "visualization"
  | "metabolism"
  | "complete";

// Affirmations for subconscious reprogramming
const AFFIRMATIONS = [
  "My metabolism is accelerating",
  "I release excess weight effortlessly",
  "My body burns fat naturally",
  "I am becoming lighter each day",
  "My cells are energized and active",
  "Weight loss flows to me easily",
  "I trust my body's wisdom",
  "My subconscious supports my goals",
  "Every cell is optimized for fat burning",
  "I am aligned with my ideal weight",
  "My neural pathways are rewiring",
  "Transformation is happening now",
  "I embody my healthiest self",
  "My metabolism works for me 24/7",
  "I release what no longer serves me",
  "My body responds to my intentions",
  "Success is encoded in my mind",
  "I activate my fat-burning potential",
  "My subconscious is reprogramming",
  "I am becoming who I want to be",
  "Every tap deepens the connection",
  "My mind and body are synchronized",
  "The transformation is already happening",
  "I unlock my body's hidden power",
  "My intentions manifest as reality",
  "I am rewiring my metabolism",
  "Deep change is occurring within me",
  "My unconscious mind is listening",
  "I program success into every cell",
  "My reality shifts with each intention",
];

export default function RitualFlow({ onComplete, onClose }: RitualFlowProps) {
  const [step, setStep] = useState<RitualStep>("intro");
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">(
    "inhale"
  );
  const [breathCount, setBreathCount] = useState(0);
  const [timer, setTimer] = useState(4);
  const [metabolismProgress, setMetabolismProgress] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [breathingComplete, setBreathingComplete] = useState(false);

  // Breathing exercise logic
  useEffect(() => {
    if (step !== "breathing" || breathingComplete) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (breathPhase === "inhale") {
            setBreathPhase("hold");
            return 7;
          } else if (breathPhase === "hold") {
            setBreathPhase("exhale");
            return 8;
          } else {
            // End of exhale - increment breath count
            setBreathCount((prevCount) => {
              const newCount = prevCount + 1;
              // Check if we've completed 3 full breaths
              if (newCount >= 3) {
                setBreathingComplete(true);
              }
              return newCount;
            });
            setBreathPhase("inhale");
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, breathPhase, breathingComplete]);

  // Check if breathing complete - move to next step
  useEffect(() => {
    if (breathingComplete && step === "breathing") {
      const timeout = setTimeout(() => setStep("visualization"), 1000);
      return () => clearTimeout(timeout);
    }
  }, [breathingComplete, step]);

  // Metabolism activation - now requires more taps and shows affirmations
  const handleMetabolismPulse = useCallback(() => {
    if (step !== "metabolism") return;

    setPulseCount((p) => p + 1);
    // Slower progress - needs about 25-30 taps
    setMetabolismProgress((prev) => Math.min(prev + 3.5, 100));

    // Show random affirmation
    const randomAffirmation =
      AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
    setCurrentAffirmation(randomAffirmation);
    setShowAffirmation(true);

    // Hide affirmation after enough time to read it
    setTimeout(() => setShowAffirmation(false), 2000);

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [step]);

  // Check metabolism complete
  useEffect(() => {
    if (metabolismProgress >= 100) {
      setTimeout(() => {
        setStep("complete");
        onComplete();
      }, 800);
    }
  }, [metabolismProgress, onComplete]);

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
    }
  };

  const getBreathColor = () => {
    switch (breathPhase) {
      case "inhale":
        return "from-sky-400 to-cyan-500";
      case "hold":
        return "from-emerald-400 to-teal-500";
      case "exhale":
        return "from-teal-400 to-emerald-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-y-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </button>

      <AnimatePresence mode="wait">
        {/* Intro Step */}
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center px-4 sm:px-6 max-w-md py-8 sm:py-0"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Subconscious Activation Ritual
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-5 sm:mb-6 leading-relaxed">
              This 2-minute neurometabolic protocol uses{" "}
              <span className="text-emerald-600 font-medium">
                affirmation anchoring
              </span>{" "}
              to reprogram your subconscious mind for effortless weight loss.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
              <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
                <strong>How it works:</strong> Tapping while reading
                affirmations creates a
                <span className="font-medium"> neuro-associative bond</span>.
                Your unconscious mind absorbs these patterns, triggering
                metabolic responses without conscious effort.
              </p>
            </div>

            {/* Steps preview */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              {[
                { icon: Wind, label: "Breathe" },
                { icon: Target, label: "Focus" },
                { icon: Zap, label: "Activate" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 sm:gap-2"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep("breathing")}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-base sm:text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              Begin Ritual <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Breathing Step */}
        {step === "breathing" && (
          <motion.div
            key="breathing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-4 sm:px-6 max-w-md"
          >
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <p className="text-gray-500 font-medium text-sm sm:text-base">
                Step 1 of 3
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Oxygen Activation
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Deep breathing increases metabolic rate
            </p>

            {/* Breathing circle */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-6 sm:mb-8">
              <motion.div
                animate={{
                  scale:
                    breathPhase === "inhale"
                      ? 1.2
                      : breathPhase === "hold"
                      ? 1.2
                      : 0.85,
                }}
                transition={{
                  duration:
                    breathPhase === "inhale"
                      ? 4
                      : breathPhase === "hold"
                      ? 0.5
                      : 8,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${getBreathColor()} opacity-20`}
              />
              <motion.div
                animate={{
                  scale:
                    breathPhase === "inhale"
                      ? 1.1
                      : breathPhase === "hold"
                      ? 1.1
                      : 0.9,
                }}
                transition={{
                  duration:
                    breathPhase === "inhale"
                      ? 4
                      : breathPhase === "hold"
                      ? 0.5
                      : 8,
                  ease: "easeInOut",
                }}
                className={`absolute inset-6 rounded-full bg-gradient-to-br ${getBreathColor()} opacity-40`}
              />
              <motion.div
                animate={{
                  scale:
                    breathPhase === "inhale"
                      ? 1.05
                      : breathPhase === "hold"
                      ? 1.05
                      : 0.95,
                }}
                transition={{
                  duration:
                    breathPhase === "inhale"
                      ? 4
                      : breathPhase === "hold"
                      ? 0.5
                      : 8,
                  ease: "easeInOut",
                }}
                className={`absolute inset-8 sm:inset-12 rounded-full bg-gradient-to-br ${getBreathColor()} flex items-center justify-center shadow-lg`}
              >
                <div className="text-center text-white">
                  <p className="text-3xl sm:text-4xl font-bold">{timer}</p>
                  <p className="text-xs sm:text-sm opacity-90">
                    {getBreathInstruction()}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    breathCount >= i ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              {breathCount}/3 breaths completed
            </p>
          </motion.div>
        )}

        {/* Visualization Step */}
        {step === "visualization" && (
          <motion.div
            key="visualization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-4 sm:px-6 max-w-md"
          >
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <p className="text-gray-500 font-medium text-sm sm:text-base">
                Step 2 of 3
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Neural Pathway Activation
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Visualize your transformation
            </p>

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px rgba(16, 185, 129, 0.2)",
                  "0 0 60px rgba(16, 185, 129, 0.4)",
                  "0 0 30px rgba(16, 185, 129, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
            >
              <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </motion.div>

            <p className="text-gray-600 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
              &ldquo;Close your eyes. See yourself at your goal weight. Feel the
              <span className="text-emerald-600 font-medium"> energy</span>, the
              <span className="text-emerald-600 font-medium"> confidence</span>,
              the
              <span className="text-emerald-600 font-medium"> vitality</span>
              ...&rdquo;
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 mb-6 sm:mb-8">
              <p className="text-gray-500 text-xs sm:text-sm">
                <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
                This visualization creates new synaptic connections, priming
                your autonomic nervous system for metabolic optimization.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep("metabolism")}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-base sm:text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              I Can See It <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Metabolism Activation Step */}
        {step === "metabolism" && (
          <motion.div
            key="metabolism"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-4 sm:px-6 max-w-md"
          >
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <p className="text-gray-500 font-medium text-sm sm:text-base">
                Step 3 of 3
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Subconscious Reprogramming
            </h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Tap and read each affirmation aloud or silently
            </p>

            {/* Instruction box */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <p className="text-amber-800 text-xs sm:text-sm">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
                Say the words as you tap — this anchors them in your unconscious
              </p>
            </div>

            {/* Affirmation display */}
            <div className="h-14 sm:h-16 mb-3 sm:mb-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {showAffirmation && currentAffirmation && (
                  <motion.p
                    key={currentAffirmation + pulseCount}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="text-lg sm:text-xl font-semibold text-emerald-600 px-3 sm:px-4"
                  >
                    &ldquo;{currentAffirmation}&rdquo;
                  </motion.p>
                )}
                {!showAffirmation && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 italic text-sm sm:text-base"
                  >
                    Tap the button to reveal affirmation...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Tap zone */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleMetabolismPulse}
              className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-5 sm:mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/30 active:shadow-emerald-500/50"
            >
              {pulseCount > 0 && (
                <motion.div
                  key={pulseCount}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-emerald-400"
                />
              )}
              <div className="text-center z-10">
                <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-1.5 sm:mb-2" />
                <span className="text-white font-bold text-base sm:text-lg">
                  TAP!
                </span>
              </div>
            </motion.button>

            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden mb-3 sm:mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metabolismProgress}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              />
            </div>

            <div className="flex justify-center text-xs sm:text-sm px-4 max-w-xs mx-auto">
              <span className="text-gray-500">
                {pulseCount} taps • {metabolismProgress.toFixed(0)}% complete
              </span>
            </div>
          </motion.div>
        )}

        {/* Complete Step */}
        {step === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-4 sm:px-6 max-w-md py-8 sm:py-0"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 bg-emerald-100 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Subconscious Activated!
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-2">
              You completed{" "}
              <span className="text-emerald-600 font-bold">
                {pulseCount} neural activations
              </span>{" "}
              — your subconscious is now primed for transformation.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-5 sm:mb-6">
              <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" />
                Your unconscious mind has absorbed today&apos;s programming.
                Over the next 24 hours, your body will work on weight
                optimization <strong>without you even thinking about it</strong>
                .
              </p>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8">
              Return tomorrow to reinforce your neural pathways and maintain
              your transformation streak!
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-base sm:text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              View My Progress <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
