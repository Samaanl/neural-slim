"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Flame,
  TrendingDown,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Zap,
  Heart,
  Target,
  BarChart3,
  Shield,
} from "lucide-react";

interface LandingHeroProps {
  onStart: () => void;
}

export default function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0">
        <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <img
              src="/img.png"
              alt="NeuralSlim Logo"
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span className="text-xl font-bold text-gray-900">NeuralSlim</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-gray-600">
            <Link
              href="#how-it-works"
              className="hover:text-emerald-600 transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-emerald-600 transition-colors text-sm font-medium"
            >
              Success Stories
            </Link>
            <Link
              href="#science"
              className="hover:text-emerald-600 transition-colors text-sm font-medium"
            >
              The Science
            </Link>
          </div>
          <button
            onClick={onStart}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-24">
        <div className="text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full text-sm text-emerald-700 mb-8"
          >
            <Users className="w-4 h-4" />
            <span>Trusted by 50,000+ users worldwide</span>
            <div className="flex items-center gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
          >
            Transform Your Body with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Just 2 Minutes a Day
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Our neuroscience-backed Subconscious Reprogramming Protocol unlocks
            your body&apos;s natural fat-burning potential. Tap, affirm, and let
            your unconscious mind do the work.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              { icon: Clock, text: "2 min/day" },
              { icon: Shield, text: "Science-backed" },
              { icon: Zap, text: "Instant results" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm"
              >
                <item.icon className="w-4 h-4 text-emerald-600" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="group relative px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
            >
              <span className="flex items-center gap-2">
                Start Your Free Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            <p className="text-gray-500 text-sm mt-4 flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No signup
                required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% free
              </span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-12 md:gap-20 mt-16 text-center"
          >
            {[
              { value: "2M+", label: "Calories Burned", icon: Flame },
              { value: "50K+", label: "Active Users", icon: Users },
              { value: "4.9", label: "User Rating", icon: Star },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <stat.icon className="w-5 h-5 text-emerald-600 mb-2" />
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Demo Graph Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl shadow-gray-200/50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Your Progress</p>
                  <p className="text-gray-900 font-semibold">
                    Weight Loss Journey
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">-12 lbs</p>
                <p className="text-gray-500 text-sm">in 30 days</p>
              </div>
            </div>

            {/* Fake chart */}
            <div className="h-40 relative">
              <svg viewBox="0 0 400 120" className="w-full h-full">
                {[0, 30, 60, 90, 120].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="400"
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                ))}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.8 }}
                  d="M 0 30 Q 50 32, 100 38 T 200 55 T 300 75 T 400 95"
                  fill="none"
                  stroke="url(#chartGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                  d="M 0 30 Q 50 32, 100 38 T 200 55 T 300 75 T 400 95 L 400 120 L 0 120 Z"
                  fill="url(#areaGradient)"
                />
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <linearGradient
                    id="areaGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative z-10 max-w-6xl mx-auto px-6 py-24"
      >
        <div className="text-center mb-16">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Neurometabolic Protocol
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Subconscious Reprogramming Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our 3-step protocol uses neuroscientific principles to rewire your
            unconscious mind for effortless weight management
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Parasympathetic Breathing",
              description:
                "4-7-8 breathing activates your vagus nerve, lowering cortisol and shifting your autonomic nervous system into fat-burning mode",
              step: "01",
            },
            {
              icon: Target,
              title: "Neural Visualization",
              description:
                "Mental imagery creates new synaptic connections, priming your Reticular Activating System to filter for weight loss opportunities",
              step: "02",
            },
            {
              icon: Zap,
              title: "Affirmation Anchoring",
              description:
                "Tap-and-affirm technique bypasses conscious resistance, embedding intentions directly into your subconscious through kinesthetic conditioning",
              step: "03",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-100 transition-all group"
            >
              <span className="absolute top-6 right-6 text-5xl font-bold text-gray-100 group-hover:text-emerald-100 transition-colors">
                {item.step}
              </span>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Success Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real People, Real Results
            </h2>
            <p className="text-gray-600">
              Join thousands who have transformed their lives with NeuralSlim
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Mitchell",
                location: "Los Angeles, CA",
                lost: "18 lbs",
                quote:
                  "I was super skeptical at first - how can tapping and affirmations help me lose weight? But after doing it for just 2 weeks, something clicked. My cravings started disappearing on their own. By day 30, my mind was automatically making healthier choices without me even trying!",
                initials: "SM",
              },
              {
                name: "Michael Thompson",
                location: "Austin, TX",
                lost: "24 lbs",
                quote:
                  "The affirmations felt silly at first, not gonna lie. But I stuck with it for a few days and something shifted in my subconscious. I stopped reaching for late-night snacks automatically. It's like my brain got reprogrammed. 2 months later, down 24 lbs without a single gym visit!",
                initials: "MT",
              },
              {
                name: "Jennifer Kim",
                location: "Miami, FL",
                lost: "15 lbs",
                quote:
                  "After 30 days of the daily ritual, my mind just... started doing the work for me. I'd find myself choosing salads over pizza without even thinking about it. The subconscious reprogramming is REAL. Thought it was placebo but my scale doesn't lie!",
                initials: "JK",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    -{testimonial.lost}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex mt-4 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section
        id="science"
        className="relative z-10 max-w-4xl mx-auto px-6 py-24"
      >
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8" />
            <h2 className="text-2xl md:text-3xl font-bold">
              The Neuroscience of Transformation
            </h2>
          </div>
          <p className="text-emerald-100 mb-8 leading-relaxed">
            NeuralSlim uses evidence-based techniques from neuroplasticity
            research, neuro-linguistic programming (NLP), and psychosomatic
            medicine to create lasting change through your subconscious mind.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Heart,
                title: "Parasympathetic Activation",
                desc: "Controlled breathing activates your vagus nerve, shifting from 'fight or flight' to 'rest and digest' — reducing cortisol and optimizing fat metabolism.",
              },
              {
                icon: Target,
                title: "Subconscious Reprogramming",
                desc: "Affirmations paired with kinesthetic tapping bypass conscious resistance, embedding directly into your unconscious mind through neuro-associative conditioning.",
              },
              {
                icon: BarChart3,
                title: "Reticular Activating System",
                desc: "Daily rituals program your RAS — the brain's attention filter — to unconsciously notice opportunities and make choices aligned with your weight goals.",
              },
              {
                icon: Zap,
                title: "Psychosomatic Response",
                desc: "The mind-body connection is bidirectional. Beliefs held in the subconscious directly influence hormonal balance, metabolic rate, and autonomic processes.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-emerald-100 text-sm text-center">
              <strong className="text-white">The Key Insight:</strong> Your
              unconscious mind controls 95% of your behavior. By programming it
              correctly, weight loss becomes automatic — your body works toward
              your goal without conscious effort.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Start Your Transformation?
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Join 50,000+ people achieving their weight loss goals the smarter way
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-lg shadow-lg shadow-emerald-500/25 inline-flex items-center gap-2"
        >
          Start Now — It&apos;s Free <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/img.png"
              alt="NeuralSlim Logo"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="font-semibold text-gray-700">NeuralSlim</span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            Results are simulated for motivational purposes. This is a wellness
            tool, not a medical device.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <Link href="#" className="hover:text-gray-700">
              Privacy
            </Link>
            <Link href="#" className="hover:text-gray-700">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
