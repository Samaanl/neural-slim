"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getUserData,
  getStreakData,
  updateStreakData,
  getTodayLog,
  saveDailyLog,
  generateEnergyHistory,
  initializeUser,
  hasUserData,
} from "./db";

interface UserData {
  startDate: string;
  name?: string;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalRituals: number;
  totalCaloriesBurned: number;
  lastRitualDate: string;
  badges: string[];
  level: number;
}

interface DailyLog {
  ritualCompleted: boolean;
  caloriesBurned: number;
  breathingMinutes: number;
  visualizationDone: boolean;
  metabolismBoostDone: boolean;
  energyScore: number;
  streak: number;
}

interface EnergyEntry {
  date: string;
  score: number;
  streak: number;
}

interface AppContextType {
  isLoading: boolean;
  hasData: boolean;
  userData: UserData | null;
  streakData: StreakData | null;
  todayLog: DailyLog | null;
  energyHistory: EnergyEntry[];
  initUser: () => Promise<void>;
  completeRitual: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null);
  const [energyHistory, setEnergyHistory] = useState<EnergyEntry[]>([]);

  const loadData = async () => {
    try {
      const exists = await hasUserData();
      setHasData(exists);

      if (exists) {
        const user = await getUserData();
        if (user) {
          setUserData({
            startDate: user.startDate,
            name: user.name,
          });
        }

        const streak = await getStreakData();
        if (streak) {
          setStreakData({
            currentStreak: streak.currentStreak,
            longestStreak: streak.longestStreak,
            totalRituals: streak.totalRituals,
            totalCaloriesBurned: streak.totalCaloriesBurned,
            lastRitualDate: streak.lastRitualDate,
            badges: streak.badges,
            level: streak.level,
          });
        }

        const log = await getTodayLog();
        if (log) {
          setTodayLog({
            ritualCompleted: log.ritualCompleted,
            caloriesBurned: log.caloriesBurned,
            breathingMinutes: log.breathingMinutes,
            visualizationDone: log.visualizationDone,
            metabolismBoostDone: log.metabolismBoostDone,
            energyScore: log.energyScore,
            streak: log.streak,
          });
        }

        const history = await generateEnergyHistory();
        setEnergyHistory(history);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const initUser = async () => {
    await initializeUser();
    await loadData();
  };

  const completeRitual = async () => {
    // Initialize user if not already done
    await initializeUser();

    const streak = await updateStreakData(true);
    await saveDailyLog({
      ritualCompleted: true,
      caloriesBurned: 0,
      breathingMinutes: 5,
      visualizationDone: true,
      metabolismBoostDone: true,
      energyScore: streak.level * 10 + streak.currentStreak * 3,
      streak: streak.currentStreak,
    });
    await loadData();
  };

  const refreshData = async () => {
    await loadData();
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        hasData,
        userData,
        streakData,
        todayLog,
        energyHistory,
        initUser,
        completeRitual,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
