export type TeamName = "Frontend Falcons" | "Backend Bears" | "DevOps Dragons" | "AI Aliens";

export type ContestantStatus = "Active" | "Nominated" | "Immune" | "Evicted";

export interface Contestant {
  id: string;
  name: string;
  team: TeamName;
  points: number;
  status: ContestantStatus;
  isCaptain: boolean;
  isImmune: boolean;
  isNominated: boolean;
  avatarSeed: number;
  bio?: string;
  evictedAtDay?: number;
}

export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // contestant ID or "Whole House"
  points: number;
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
}

export type AnnouncementType = "Info" | "Warning" | "Twist" | "Eviction Notice";

export interface Announcement {
  id: string;
  message: string;
  type: AnnouncementType;
  timestamp: string;
  day: number;
}

export type LogCategory = 
  | "points" 
  | "nomination" 
  | "immunity" 
  | "captain" 
  | "eviction" 
  | "quest" 
  | "announcement" 
  | "system";

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  day: number;
  action: string;
  details: string;
  category: LogCategory;
}

export interface TimerState {
  isRunning: boolean;
  initialSeconds: number;
  remainingSeconds: number;
  linkedTaskId?: string;
}

export type ScreenType = 
  | "HOME" 
  | "CONTESTANTS" 
  | "LEADERBOARD" 
  | "QUESTS" 
  | "DANGER_ZONE" 
  | "TIMER" 
  | "BIG_BOSS_MIC" 
  | "STATS" 
  | "EVICTED_HALL";

export interface FloatingScore {
  id: string;
  contestantId: string;
  amount: number;
  isGain: boolean;
}

export interface AppState {
  day: number;
  contestants: Contestant[];
  tasks: Task[];
  announcements: Announcement[];
  activityLog: ActivityLogEntry[];
  activeAnnouncement: Announcement | null;
  timer: TimerState;
  muted: boolean;
  ttsEnabled: boolean;
  scanlines: boolean;
  screenShake: boolean;
  currentScreen: ScreenType;
  evictionOverlay: { contestant: Contestant } | null;
  questCompleteBanner: { title: string; points: number; assignedName: string } | null;
  floatingScores: FloatingScore[];
}
