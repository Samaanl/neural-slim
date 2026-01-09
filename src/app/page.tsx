"use client";

import { useState, useEffect } from "react";
import { AppProvider, useApp } from "@/lib/context";
import LandingHero from "@/components/LandingHero";
import Dashboard from "@/components/Dashboard";

type AppState = "loading" | "landing" | "dashboard";

function AppContent() {
  const { isLoading, hasData, initUser } = useApp();
  const [appState, setAppState] = useState<AppState>("loading");

  useEffect(() => {
    if (!isLoading) {
      if (hasData) {
        setAppState("dashboard");
      } else {
        setAppState("landing");
      }
    }
  }, [isLoading, hasData]);

  const handleStartFromLanding = async () => {
    // Initialize user automatically when they click start - no forms!
    await initUser();
    setAppState("dashboard");
  };

  if (appState === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🔥</div>
          <p className="text-gray-400">Loading your journey...</p>
        </div>
      </div>
    );
  }

  if (appState === "landing") {
    return <LandingHero onStart={handleStartFromLanding} />;
  }

  return <Dashboard />;
}

export default function HomePage() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
