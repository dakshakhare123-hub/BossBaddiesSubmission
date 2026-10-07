import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import {
  AppState,
  Contestant,
  Task,
  Announcement,
  ActivityLogEntry,
  ScreenType,
  TeamName,
  ContestantStatus,
  FloatingScore
} from '../types';
import { SoundFX } from '../utils/audio';

const STORAGE_KEY = 'big_boss_pixel_state_v1';

// Seed Contestants (10 contestants across 4 teams, 1 starting captain)
export const SEED_CONTESTANTS: Contestant[] = [
  {
    id: 'c-1',
    name: 'Debug Dave',
    team: 'Frontend Falcons',
    points: 125,
    status: 'Active',
    isCaptain: true,
    isImmune: false,
    isNominated: false,
    avatarSeed: 101,
    bio: 'Refuses to use console.log; breakpoints only.'
  },
  {
    id: 'c-2',
    name: 'Syntax Sara',
    team: 'Frontend Falcons',
    points: 160,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 102,
    bio: 'Formats code with strict ESLint in her sleep.'
  },
  {
    id: 'c-3',
    name: 'Null Pointer Nick',
    team: 'Backend Bears',
    points: 85,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 103,
    bio: 'Cannot read properties of undefined.'
  },
  {
    id: 'c-4',
    name: 'Git Guru Gita',
    team: 'DevOps Dragons',
    points: 195,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 104,
    bio: 'Rebased production onto main without a conflict.'
  },
  {
    id: 'c-5',
    name: 'Stack Overflow Sam',
    team: 'Backend Bears',
    points: 70,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 105,
    bio: 'Copy-pasting answers from 2012 with pride.'
  },
  {
    id: 'c-6',
    name: 'Kernel Kiran',
    team: 'DevOps Dragons',
    points: 140,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 106,
    bio: 'Compiles custom Linux kernels for his smart toaster.'
  },
  {
    id: 'c-7',
    name: 'Pixel Priya',
    team: 'Frontend Falcons',
    points: 110,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 107,
    bio: 'Obsessed with sub-pixel antialiasing and CSS grids.'
  },
  {
    id: 'c-8',
    name: 'Cache Chandan',
    team: 'Backend Bears',
    points: 95,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 108,
    bio: 'Two hard things: cache invalidation and waking up.'
  },
  {
    id: 'c-9',
    name: 'Bit Bhavna',
    team: 'AI Aliens',
    points: 175,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 109,
    bio: 'Shifts registers for breakfast, trains models for lunch.'
  },
  {
    id: 'c-10',
    name: 'Lambda Leo',
    team: 'AI Aliens',
    points: 130,
    status: 'Active',
    isCaptain: false,
    isImmune: false,
    isNominated: false,
    avatarSeed: 110,
    bio: 'Pure functions only; zero side-effects allowed in the house.'
  }
];

export const SEED_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Hotfix Production Crash',
    description: 'Resolve the memory leak taking down the live streaming server before the eviction vote.',
    assignedTo: 'Git Guru Gita',
    points: 35,
    status: 'In Progress',
    createdAt: 'Day 01 - 09:30'
  },
  {
    id: 'task-2',
    title: 'Pixel-Perfect UI Sprint',
    description: 'Align every button with 4px borders and zero border-radius for the Big Boss inspection.',
    assignedTo: 'Pixel Priya',
    points: 25,
    status: 'Pending',
    createdAt: 'Day 01 - 11:00'
  },
  {
    id: 'task-3',
    title: 'House Cleaning Hackathon',
    description: 'Clean up the node_modules folder across the entire tech mansion.',
    assignedTo: 'Whole House',
    points: 20,
    status: 'Pending',
    createdAt: 'Day 01 - 13:15'
  }
];

export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    message: 'ATTENTION CONTESTANTS: Big Boss is now watching the Tech House. Today Debug Dave rules as House Captain. Ship cleanly or prepare for eviction!',
    type: 'Info',
    timestamp: 'Day 01 · 08:00',
    day: 1
  }
];

export const SEED_LOG: ActivityLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '08:00:00',
    day: 1,
    action: 'HOUSE INITIALIZED',
    details: 'Season 1 of Tech House launched with 10 contestants.',
    category: 'system'
  },
  {
    id: 'log-2',
    timestamp: '08:05:00',
    day: 1,
    action: 'CAPTAIN CROWNED',
    details: 'Debug Dave was appointed House Captain.',
    category: 'captain'
  }
];

const INITIAL_STATE: AppState = {
  day: 1,
  contestants: SEED_CONTESTANTS,
  tasks: SEED_TASKS,
  announcements: SEED_ANNOUNCEMENTS,
  activityLog: SEED_LOG,
  activeAnnouncement: SEED_ANNOUNCEMENTS[0],
  timer: {
    isRunning: false,
    initialSeconds: 180,
    remainingSeconds: 180
  },
  muted: false,
  ttsEnabled: false,
  scanlines: true,
  screenShake: false,
  currentScreen: 'HOME',
  evictionOverlay: null,
  questCompleteBanner: null,
  floatingScores: []
};

// Action types
type Action =
  | { type: 'SET_SCREEN'; screen: ScreenType }
  | { type: 'NEXT_DAY' }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'TOGGLE_TTS' }
  | { type: 'TOGGLE_SCANLINES' }
  | { type: 'SET_SCREEN_SHAKE'; shake: boolean }
  | { type: 'DISMISS_ACTIVE_ANNOUNCEMENT' }
  | { type: 'CLEAR_EVICTION_OVERLAY' }
  | { type: 'CLEAR_QUEST_BANNER' }
  | { type: 'REMOVE_FLOATING_SCORE'; id: string }
  | { type: 'RESET_HOUSE' }
  | { type: 'ADD_CONTESTANT'; contestant: Omit<Contestant, 'id' | 'points' | 'status' | 'isCaptain' | 'isImmune' | 'isNominated' | 'avatarSeed'> }
  | { type: 'UPDATE_POINTS'; contestantId: string; delta: number; reason?: string }
  | { type: 'MAKE_CAPTAIN'; contestantId: string }
  | { type: 'TOGGLE_IMMUNITY'; contestantId: string }
  | { type: 'TOGGLE_NOMINATION'; contestantId: string; reason?: string }
  | { type: 'EVICT_CONTESTANT'; contestantId: string }
  | { type: 'RESTORE_CONTESTANT'; contestantId: string }
  | { type: 'CREATE_TASK'; task: Omit<Task, 'id' | 'status' | 'createdAt'> }
  | { type: 'UPDATE_TASK_STATUS'; taskId: string; status: Task['status'] }
  | { type: 'COMPLETE_TASK'; taskId: string }
  | { type: 'DELETE_TASK'; taskId: string }
  | { type: 'BROADCAST_ANNOUNCEMENT'; message: string; announcementType: Announcement['type'] }
  | { type: 'START_TIMER'; seconds?: number; taskId?: string }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'RESET_TIMER'; seconds?: number }
  | { type: 'TICK_TIMER' }
  | { type: 'CLEAR_ACTIVITY_LOG' };

// Status helper
function deriveStatus(c: { isEvicted?: boolean; isImmune: boolean; isNominated: boolean }): ContestantStatus {
  if (c.isEvicted) return 'Evicted';
  if (c.isImmune) return 'Immune';
  if (c.isNominated) return 'Nominated';
  return 'Active';
}

function gameReducer(state: AppState, action: Action): AppState {
  const getTimestamp = () => new Date().toLocaleTimeString('en-US', { hour12: false });

  switch (action.type) {
    case 'SET_SCREEN':
      SoundFX.playButtonClick(state.muted);
      return { ...state, currentScreen: action.screen };

    case 'NEXT_DAY': {
      const nextDay = state.day + 1;
      SoundFX.playButtonClick(state.muted);
      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: nextDay,
        action: `DAY ADVANCED`,
        details: `Day ${nextDay} has dawned upon the Tech House!`,
        category: 'system'
      };
      return {
        ...state,
        day: nextDay,
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'TOGGLE_MUTE':
      return { ...state, muted: !state.muted };

    case 'TOGGLE_TTS':
      return { ...state, ttsEnabled: !state.ttsEnabled };

    case 'TOGGLE_SCANLINES':
      return { ...state, scanlines: !state.scanlines };

    case 'SET_SCREEN_SHAKE':
      return { ...state, screenShake: action.shake };

    case 'DISMISS_ACTIVE_ANNOUNCEMENT':
      return { ...state, activeAnnouncement: null };

    case 'CLEAR_EVICTION_OVERLAY':
      return { ...state, evictionOverlay: null };

    case 'CLEAR_QUEST_BANNER':
      return { ...state, questCompleteBanner: null };

    case 'REMOVE_FLOATING_SCORE':
      return {
        ...state,
        floatingScores: state.floatingScores.filter(s => s.id !== action.id)
      };

    case 'RESET_HOUSE': {
      SoundFX.playButtonClick(state.muted);
      localStorage.removeItem(STORAGE_KEY);
      return {
        ...INITIAL_STATE,
        muted: state.muted,
        scanlines: state.scanlines,
        ttsEnabled: state.ttsEnabled
      };
    }

    case 'ADD_CONTESTANT': {
      SoundFX.playPointsGained(state.muted);
      const newId = `c-${Date.now()}`;
      const newContestant: Contestant = {
        id: newId,
        name: action.contestant.name.trim(),
        team: action.contestant.team,
        points: 50,
        status: 'Active',
        isCaptain: false,
        isImmune: false,
        isNominated: false,
        avatarSeed: Math.floor(Math.random() * 9999) + 1,
        bio: action.contestant.bio || 'New wild-card recruit to the Tech House.'
      };
      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: 'NEW RECRUIT',
        details: `${newContestant.name} joined ${newContestant.team}.`,
        category: 'system'
      };
      return {
        ...state,
        contestants: [...state.contestants, newContestant],
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'UPDATE_POINTS': {
      const target = state.contestants.find(c => c.id === action.contestantId);
      if (!target || target.status === 'Evicted') return state;

      const newPoints = Math.max(0, target.points + action.delta);
      const actualDelta = newPoints - target.points;

      if (actualDelta > 0) {
        SoundFX.playPointsGained(state.muted);
      } else if (actualDelta < 0) {
        SoundFX.playPointsLost(state.muted);
      }

      // Add floating score popup
      const newScorePopup: FloatingScore = {
        id: `fs-${Date.now()}-${Math.random()}`,
        contestantId: action.contestantId,
        amount: Math.abs(action.delta),
        isGain: action.delta > 0
      };

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: action.delta >= 0 ? `+${action.delta} PTS` : `${action.delta} PTS`,
        details: `${target.name} ${action.delta >= 0 ? 'awarded' : 'penalized'} ${Math.abs(action.delta)} points${action.reason ? ` (${action.reason})` : ''}. Total: ${newPoints}`,
        category: 'points'
      };

      return {
        ...state,
        contestants: state.contestants.map(c =>
          c.id === action.contestantId ? { ...c, points: newPoints } : c
        ),
        activityLog: [logEntry, ...state.activityLog],
        floatingScores: [...state.floatingScores, newScorePopup]
      };
    }

    case 'MAKE_CAPTAIN': {
      const target = state.contestants.find(c => c.id === action.contestantId);
      if (!target || target.status === 'Evicted') return state;

      SoundFX.playImmunity(state.muted);

      // Only one captain at a time; captain cannot be nominated
      const updated = state.contestants.map(c => {
        if (c.id === action.contestantId) {
          return {
            ...c,
            isCaptain: true,
            isNominated: false,
            status: deriveStatus({ isImmune: c.isImmune, isNominated: false })
          };
        }
        return {
          ...c,
          isCaptain: false
        };
      });

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: 'NEW HOUSE CAPTAIN',
        details: `${target.name} received the Captain's Crown!`,
        category: 'captain'
      };

      return {
        ...state,
        contestants: updated,
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'TOGGLE_IMMUNITY': {
      const target = state.contestants.find(c => c.id === action.contestantId);
      if (!target || target.status === 'Evicted') return state;

      const nextImmune = !target.isImmune;
      if (nextImmune) {
        SoundFX.playImmunity(state.muted);
      } else {
        SoundFX.playButtonClick(state.muted);
      }

      // If granting immunity, clear nomination automatically
      const updatedContestants = state.contestants.map(c => {
        if (c.id === action.contestantId) {
          const isNominated = nextImmune ? false : c.isNominated;
          return {
            ...c,
            isImmune: nextImmune,
            isNominated,
            status: deriveStatus({ isImmune: nextImmune, isNominated })
          };
        }
        return c;
      });

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: nextImmune ? 'IMMUNITY GRANTED' : 'IMMUNITY REVOKED',
        details: nextImmune
          ? `${target.name} is now protected from eviction! Any nomination was cleared.`
          : `${target.name} lost immunity protection.`,
        category: 'immunity'
      };

      return {
        ...state,
        contestants: updatedContestants,
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'TOGGLE_NOMINATION': {
      const target = state.contestants.find(c => c.id === action.contestantId);
      if (!target || target.status === 'Evicted' || target.isCaptain || target.isImmune) {
        return state;
      }

      const nextNominated = !target.isNominated;
      if (nextNominated) {
        SoundFX.playNomination(state.muted);
      } else {
        SoundFX.playButtonClick(state.muted);
      }

      const updatedContestants = state.contestants.map(c => {
        if (c.id === action.contestantId) {
          return {
            ...c,
            isNominated: nextNominated,
            status: deriveStatus({ isImmune: c.isImmune, isNominated: nextNominated })
          };
        }
        return c;
      });

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: nextNominated ? 'NOMINATED FOR EVICTION' : 'NOMINATION SAVED',
        details: nextNominated
          ? `${target.name} was placed on the eviction block!${action.reason ? ` Reason: ${action.reason}` : ''}`
          : `${target.name} was saved from the nomination block.`,
        category: 'nomination'
      };

      return {
        ...state,
        contestants: updatedContestants,
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'EVICT_CONTESTANT': {
      const target = state.contestants.find(c => c.id === action.contestantId);
      if (!target || target.status === 'Evicted') return state;

      SoundFX.playEviction(state.muted);

      // Evicting clears all flags and captaincy
      const updatedContestants = state.contestants.map(c => {
        if (c.id === action.contestantId) {
          return {
            ...c,
            status: 'Evicted' as ContestantStatus,
            isCaptain: false,
            isImmune: false,
            isNominated: false,
            evictedAtDay: state.day
          };
        }
        return c;
      });

      const autoAnnouncement: Announcement = {
        id: `ann-${Date.now()}`,
        message: `GAME OVER: ${target.name} has been EVICTED from the Tech House! The code review was brutal.`,
        type: 'Eviction Notice',
        timestamp: `Day ${state.day.toString().padStart(2, '0')} · ${getTimestamp().slice(0, 5)}`,
        day: state.day
      };

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: 'CONTESTANT EVICTED',
        details: `${target.name} has been evicted from the house.`,
        category: 'eviction'
      };

      return {
        ...state,
        screenShake: true,
        evictionOverlay: { contestant: target },
        announcements: [autoAnnouncement, ...state.announcements],
        activeAnnouncement: autoAnnouncement,
        contestants: updatedContestants,
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'RESTORE_CONTESTANT': {
      const target = state.contestants.find(c => c.id === action.contestantId);
      if (!target || target.status !== 'Evicted') return state;

      SoundFX.playImmunity(state.muted);

      const updatedContestants = state.contestants.map(c => {
        if (c.id === action.contestantId) {
          return {
            ...c,
            status: 'Active' as ContestantStatus,
            isCaptain: false,
            isImmune: false,
            isNominated: false,
            evictedAtDay: undefined
          };
        }
        return c;
      });

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: 'CONTESTANT RESTORED',
        details: `${target.name} returned from the tech graveyard back to the House!`,
        category: 'system'
      };

      return {
        ...state,
        contestants: updatedContestants,
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'CREATE_TASK': {
      SoundFX.playButtonClick(state.muted);
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: action.task.title.trim(),
        description: action.task.description.trim(),
        assignedTo: action.task.assignedTo,
        points: action.task.points,
        status: 'Pending',
        createdAt: `Day ${state.day.toString().padStart(2, '0')} - ${getTimestamp().slice(0, 5)}`
      };

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: 'QUEST POSTED',
        details: `"${newTask.title}" posted (${newTask.points} pts) -> ${newTask.assignedTo}.`,
        category: 'quest'
      };

      return {
        ...state,
        tasks: [newTask, ...state.tasks],
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'UPDATE_TASK_STATUS': {
      SoundFX.playButtonClick(state.muted);
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.taskId ? { ...t, status: action.status } : t
        )
      };
    }

    case 'COMPLETE_TASK': {
      const task = state.tasks.find(t => t.id === action.taskId);
      if (!task || task.status === 'Completed') return state;

      SoundFX.playQuestComplete(state.muted);

      // Award points automatically to assigned contestant or Whole House
      const updatedContestants = state.contestants.map(c => {
        if (c.status === 'Evicted') return c;
        if (task.assignedTo === 'Whole House' || task.assignedTo === c.name || task.assignedTo === c.id) {
          return { ...c, points: c.points + task.points };
        }
        return c;
      });

      const updatedTasks = state.tasks.map(t =>
        t.id === action.taskId
          ? {
              ...t,
              status: 'Completed' as const,
              completedAt: `Day ${state.day.toString().padStart(2, '0')} - ${getTimestamp().slice(0, 5)}`
            }
          : t
      );

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: 'QUEST COMPLETED!',
        details: `"${task.title}" completed! Awarded +${task.points} pts to ${task.assignedTo}.`,
        category: 'quest'
      };

      return {
        ...state,
        tasks: updatedTasks,
        contestants: updatedContestants,
        questCompleteBanner: {
          title: task.title,
          points: task.points,
          assignedName: task.assignedTo
        },
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'DELETE_TASK': {
      SoundFX.playButtonClick(state.muted);
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.taskId)
      };
    }

    case 'BROADCAST_ANNOUNCEMENT': {
      SoundFX.playAnnouncement(state.muted);
      const newAnn: Announcement = {
        id: `ann-${Date.now()}`,
        message: action.message.trim(),
        type: action.announcementType,
        timestamp: `Day ${state.day.toString().padStart(2, '0')} · ${getTimestamp().slice(0, 5)}`,
        day: state.day
      };

      const logEntry: ActivityLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: getTimestamp(),
        day: state.day,
        action: `BROADCAST [${action.announcementType.toUpperCase()}]`,
        details: newAnn.message,
        category: 'announcement'
      };

      // TTS if enabled
      if (state.ttsEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(action.message);
          utterance.rate = 1.0;
          utterance.pitch = 0.85; // slightly lower robotic/authority pitch
          window.speechSynthesis.speak(utterance);
        } catch {}
      }

      return {
        ...state,
        announcements: [newAnn, ...state.announcements],
        activeAnnouncement: newAnn,
        activityLog: [logEntry, ...state.activityLog]
      };
    }

    case 'START_TIMER': {
      SoundFX.playButtonClick(state.muted);
      const secs = action.seconds ?? state.timer.remainingSeconds;
      return {
        ...state,
        timer: {
          isRunning: true,
          initialSeconds: secs,
          remainingSeconds: secs,
          linkedTaskId: action.taskId
        }
      };
    }

    case 'PAUSE_TIMER': {
      SoundFX.playButtonClick(state.muted);
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false
        }
      };
    }

    case 'RESUME_TIMER': {
      SoundFX.playButtonClick(state.muted);
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: true
        }
      };
    }

    case 'RESET_TIMER': {
      SoundFX.playButtonClick(state.muted);
      const secs = action.seconds ?? state.timer.initialSeconds;
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          remainingSeconds: secs
        }
      };
    }

    case 'TICK_TIMER': {
      if (!state.timer.isRunning) return state;
      const nextRemaining = state.timer.remainingSeconds - 1;

      if (nextRemaining <= 0) {
        SoundFX.playTimerEnd(state.muted);
        const autoAnn: Announcement = {
          id: `ann-${Date.now()}`,
          message: "TIME'S UP! The arcade clock has run out. Drop your keyboards immediately!",
          type: 'Warning',
          timestamp: `Day ${state.day.toString().padStart(2, '0')} · ${getTimestamp().slice(0, 5)}`,
          day: state.day
        };
        const logEntry: ActivityLogEntry = {
          id: `log-${Date.now()}`,
          timestamp: getTimestamp(),
          day: state.day,
          action: "TIMER EXPIRED",
          details: "Countdown reached 00:00! House alarm sounded.",
          category: 'system'
        };

        return {
          ...state,
          timer: {
            ...state.timer,
            isRunning: false,
            remainingSeconds: 0
          },
          announcements: [autoAnn, ...state.announcements],
          activeAnnouncement: autoAnn,
          activityLog: [logEntry, ...state.activityLog]
        };
      }

      return {
        ...state,
        timer: {
          ...state.timer,
          remainingSeconds: nextRemaining
        }
      };
    }

    case 'CLEAR_ACTIVITY_LOG':
      return { ...state, activityLog: [] };

    default:
      return state;
  }
}

// Context definition
interface GameContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // Helper getters
  activeContestants: Contestant[];
  evictedContestants: Contestant[];
  nominatedContestants: Contestant[];
  houseCaptain: Contestant | null;
  highestScorer: Contestant | null;
  lowestScorer: Contestant | null;
  totalPoints: number;
  averagePoints: number;
  teamStats: { team: TeamName; points: number; count: number }[];
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, (init) => {
    if (typeof window === 'undefined') return init;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...init,
          ...parsed,
          // ensure runtime fields aren't stuck
          screenShake: false,
          evictionOverlay: null,
          questCompleteBanner: null,
          floatingScores: []
        };
      }
    } catch {
      // Ignore parse errors and use init
    }
    return init;
  });

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      const toSave = {
        day: state.day,
        contestants: state.contestants,
        tasks: state.tasks,
        announcements: state.announcements,
        activityLog: state.activityLog,
        muted: state.muted,
        ttsEnabled: state.ttsEnabled,
        scanlines: state.scanlines,
        currentScreen: state.currentScreen
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {}
  }, [
    state.day,
    state.contestants,
    state.tasks,
    state.announcements,
    state.activityLog,
    state.muted,
    state.ttsEnabled,
    state.scanlines,
    state.currentScreen
  ]);

  // Master Timer Tick Interval
  useEffect(() => {
    if (!state.timer.isRunning) return;
    const interval = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.timer.isRunning]);

  // Screen shake reset
  useEffect(() => {
    if (state.screenShake) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_SCREEN_SHAKE', shake: false });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [state.screenShake]);

  // Computed properties
  const activeContestants = state.contestants.filter(c => c.status !== 'Evicted');
  const evictedContestants = state.contestants.filter(c => c.status === 'Evicted');
  const nominatedContestants = state.contestants.filter(c => c.isNominated && c.status !== 'Evicted');
  const houseCaptain = state.contestants.find(c => c.isCaptain && c.status !== 'Evicted') || null;

  const sortedByPoints = [...activeContestants].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.name.localeCompare(b.name);
  });
  const highestScorer = sortedByPoints[0] || null;
  const lowestScorer = sortedByPoints[sortedByPoints.length - 1] || null;

  const totalPoints = activeContestants.reduce((acc, c) => acc + c.points, 0);
  const averagePoints = activeContestants.length > 0 ? Math.round(totalPoints / activeContestants.length) : 0;

  const teams: TeamName[] = ["Frontend Falcons", "Backend Bears", "DevOps Dragons", "AI Aliens"];
  const teamStats = teams.map(t => {
    const members = activeContestants.filter(c => c.team === t);
    const pts = members.reduce((sum, c) => sum + c.points, 0);
    return {
      team: t,
      points: pts,
      count: members.length
    };
  });

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        activeContestants,
        evictedContestants,
        nominatedContestants,
        houseCaptain,
        highestScorer,
        lowestScorer,
        totalPoints,
        averagePoints,
        teamStats
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextValue => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
