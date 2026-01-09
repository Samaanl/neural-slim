import { openDB, DBSchema, IDBPDatabase } from "idb";

interface BurnFlowDB extends DBSchema {
  userData: {
    key: string;
    value: {
      id: string;
      startDate: string;
      name?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  dailyLogs: {
    key: string;
    value: {
      id: string;
      date: string;
      ritualCompleted: boolean;
      caloriesBurned: number;
      breathingMinutes: number;
      visualizationDone: boolean;
      metabolismBoostDone: boolean;
      energyScore: number;
      streak: number;
      createdAt: string;
    };
    indexes: { "by-date": string };
  };
  energyHistory: {
    key: string;
    value: {
      id: string;
      date: string;
      score: number;
      streak: number;
      createdAt: string;
    };
    indexes: { "by-date": string };
  };
  streakData: {
    key: string;
    value: {
      id: string;
      currentStreak: number;
      longestStreak: number;
      totalRituals: number;
      totalCaloriesBurned: number;
      lastRitualDate: string;
      badges: string[];
      level: number;
      updatedAt: string;
    };
  };
}

let dbInstance: IDBPDatabase<BurnFlowDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<BurnFlowDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<BurnFlowDB>("burnflow-db-v3", 1, {
    upgrade(db) {
      // User data store
      if (!db.objectStoreNames.contains("userData")) {
        db.createObjectStore("userData", { keyPath: "id" });
      }

      // Daily logs store
      if (!db.objectStoreNames.contains("dailyLogs")) {
        const dailyLogsStore = db.createObjectStore("dailyLogs", {
          keyPath: "id",
        });
        dailyLogsStore.createIndex("by-date", "date");
      }

      // Energy history store
      if (!db.objectStoreNames.contains("energyHistory")) {
        const energyStore = db.createObjectStore("energyHistory", {
          keyPath: "id",
        });
        energyStore.createIndex("by-date", "date");
      }

      // Streak data store
      if (!db.objectStoreNames.contains("streakData")) {
        db.createObjectStore("streakData", { keyPath: "id" });
      }
    },
  });

  return dbInstance;
}

// User data functions
export async function getUserData() {
  const db = await getDB();
  return db.get("userData", "main-user");
}

export async function saveUserData(
  data: Partial<BurnFlowDB["userData"]["value"]>
) {
  const db = await getDB();
  const existing = await db.get("userData", "main-user");
  const now = new Date().toISOString();

  const userData = {
    id: "main-user",
    startDate: existing?.startDate || now,
    name: data.name || existing?.name,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  await db.put("userData", userData);
  return userData;
}

// Initialize user on first visit
export async function initializeUser() {
  const db = await getDB();
  const existing = await db.get("userData", "main-user");

  if (!existing) {
    const now = new Date().toISOString();
    const today = now.split("T")[0];

    const userData = {
      id: "main-user",
      startDate: now,
      createdAt: now,
      updatedAt: now,
    };
    await db.put("userData", userData);

    // Initialize streak data too
    const streakData = {
      id: "main-streak",
      currentStreak: 0,
      longestStreak: 0,
      totalRituals: 0,
      totalCaloriesBurned: 0,
      lastRitualDate: "",
      badges: [],
      level: 1,
      updatedAt: now,
    };
    await db.put("streakData", streakData);

    // Add initial energy entry
    const initialEnergy = {
      id: `energy-${Date.now()}`,
      date: today,
      score: 50,
      streak: 0,
      createdAt: now,
    };
    await db.put("energyHistory", initialEnergy);

    return userData;
  }

  return existing;
}

// Daily log functions
export async function getTodayLog() {
  const db = await getDB();
  const today = new Date().toISOString().split("T")[0];
  return db.getFromIndex("dailyLogs", "by-date", today);
}

export async function saveDailyLog(
  data: Partial<BurnFlowDB["dailyLogs"]["value"]>
) {
  const db = await getDB();
  const today = new Date().toISOString().split("T")[0];
  const existing = await db.getFromIndex("dailyLogs", "by-date", today);
  const now = new Date().toISOString();

  const logData = {
    id: existing?.id || `log-${Date.now()}`,
    date: today,
    ritualCompleted: data.ritualCompleted ?? existing?.ritualCompleted ?? false,
    caloriesBurned: data.caloriesBurned ?? existing?.caloriesBurned ?? 0,
    breathingMinutes: data.breathingMinutes ?? existing?.breathingMinutes ?? 0,
    visualizationDone:
      data.visualizationDone ?? existing?.visualizationDone ?? false,
    metabolismBoostDone:
      data.metabolismBoostDone ?? existing?.metabolismBoostDone ?? false,
    energyScore: data.energyScore ?? existing?.energyScore ?? 50,
    streak: data.streak ?? existing?.streak ?? 0,
    createdAt: existing?.createdAt || now,
  };

  await db.put("dailyLogs", logData);
  return logData;
}

export async function getAllDailyLogs() {
  const db = await getDB();
  return db.getAllFromIndex("dailyLogs", "by-date");
}

// Energy history functions
export async function addEnergyEntry(score: number, streak: number) {
  const db = await getDB();
  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toISOString();

  const existing = await db.getFromIndex("energyHistory", "by-date", today);

  const entry = {
    id: existing?.id || `energy-${Date.now()}`,
    date: today,
    score,
    streak,
    createdAt: existing?.createdAt || now,
  };

  await db.put("energyHistory", entry);
  return entry;
}

export async function getEnergyHistory() {
  const db = await getDB();
  return db.getAllFromIndex("energyHistory", "by-date");
}

// Streak data functions
export async function getStreakData() {
  const db = await getDB();
  return db.get("streakData", "main-streak");
}

export async function updateStreakData(ritualCompleted: boolean = false) {
  const db = await getDB();
  const existing = await db.get("streakData", "main-streak");
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  let currentStreak = existing?.currentStreak || 0;
  let longestStreak = existing?.longestStreak || 0;
  let totalRituals = existing?.totalRituals || 0;
  let badges = existing?.badges || [];
  let level = existing?.level || 1;

  if (ritualCompleted) {
    const lastDate = existing?.lastRitualDate;
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // Only count if not already completed today
    if (lastDate !== today) {
      if (lastDate === yesterdayStr) {
        // Consecutive day
        currentStreak += 1;
      } else {
        // Streak broken, start new
        currentStreak = 1;
      }
      totalRituals += 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    // Badge logic
    if (currentStreak >= 3 && !badges.includes("3-day-warrior"))
      badges.push("3-day-warrior");
    if (currentStreak >= 7 && !badges.includes("week-champion"))
      badges.push("week-champion");
    if (currentStreak >= 14 && !badges.includes("fortnight-master"))
      badges.push("fortnight-master");
    if (currentStreak >= 30 && !badges.includes("monthly-legend"))
      badges.push("monthly-legend");
    if (totalRituals >= 1 && !badges.includes("first-ritual"))
      badges.push("first-ritual");
    if (totalRituals >= 10 && !badges.includes("ritual-adept"))
      badges.push("ritual-adept");
    if (totalRituals >= 50 && !badges.includes("ritual-master"))
      badges.push("ritual-master");

    // Level up every 7 rituals
    level = Math.floor(totalRituals / 7) + 1;

    // Add energy entry for today
    const energyScore = calculateEnergyScore(currentStreak, totalRituals);
    await addEnergyEntry(energyScore, currentStreak);
  }

  const streakData = {
    id: "main-streak",
    currentStreak,
    longestStreak,
    totalRituals,
    totalCaloriesBurned: 0, // Keep for interface but always 0
    lastRitualDate: ritualCompleted ? today : existing?.lastRitualDate || "",
    badges,
    level,
    updatedAt: now.toISOString(),
  };

  await db.put("streakData", streakData);
  return streakData;
}

// Calculate energy score based on streak and total rituals
export function calculateEnergyScore(
  streak: number,
  totalRituals: number
): number {
  // Base score starts at 50
  const baseScore = 50;

  // Streak bonus: +3 per consecutive day, max +30
  const streakBonus = Math.min(streak * 3, 30);

  // Total rituals bonus: +1 per 2 rituals, max +15
  const ritualsBonus = Math.min(Math.floor(totalRituals / 2), 15);

  // Small random variation for naturalness
  const variation = Math.random() * 6 - 3; // -3 to +3

  const score = baseScore + streakBonus + ritualsBonus + variation;

  // Clamp between 20 and 100
  return Math.round(Math.max(20, Math.min(100, score)));
}

// Generate energy history for the graph
export async function generateEnergyHistory() {
  const userData = await getUserData();
  const streakData = await getStreakData();
  const existingHistory = await getEnergyHistory();

  if (!userData) return [];

  // If we have existing history, use it
  if (existingHistory.length > 0) {
    return existingHistory;
  }

  // Generate initial entry for today
  const today = new Date().toISOString().split("T")[0];
  const currentStreak = streakData?.currentStreak || 0;
  const totalRituals = streakData?.totalRituals || 0;

  return [
    {
      date: today,
      score: calculateEnergyScore(currentStreak, totalRituals),
      streak: currentStreak,
    },
  ];
}

// Check if user has been initialized
export async function hasUserData(): Promise<boolean> {
  const userData = await getUserData();
  return userData !== undefined;
}

// Clear all data (for testing)
export async function clearAllData() {
  const db = await getDB();
  await db.clear("userData");
  await db.clear("dailyLogs");
  await db.clear("energyHistory");
  await db.clear("streakData");
}
