/**
 * BIG BOSS COMMAND CENTER: Tech House Pixel Edition
 * 16-Bit Retro Pixel Arcade Control Dashboard for Reality TV Show
 */

import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { HudBar } from './components/hud/HudBar';
import { Sidebar } from './components/nav/Sidebar';
import { HomeScreen } from './components/screens/HomeScreen';
import { ContestantsScreen } from './components/screens/ContestantsScreen';
import { LeaderboardScreen } from './components/screens/LeaderboardScreen';
import { QuestBoardScreen } from './components/screens/QuestBoardScreen';
import { DangerZoneScreen } from './components/screens/DangerZoneScreen';
import { TimerScreen } from './components/screens/TimerScreen';
import { BigBossMicScreen } from './components/screens/BigBossMicScreen';
import { StatsScreen } from './components/screens/StatsScreen';
import { EvictedHallScreen } from './components/screens/EvictedHallScreen';
import { DialogueBanner } from './components/common/DialogueBanner';
import { EvictionOverlay } from './components/common/EvictionOverlay';
import { QuestCompleteBanner } from './components/common/QuestCompleteBanner';
import { ActivityDrawer } from './components/common/ActivityDrawer';

const AppContent: React.FC = () => {
  const { state } = useGame();
  const [isLogOpen, setIsLogOpen] = useState(false);

  // Screen router
  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case 'HOME':
        return <HomeScreen />;
      case 'CONTESTANTS':
        return <ContestantsScreen />;
      case 'LEADERBOARD':
        return <LeaderboardScreen />;
      case 'QUESTS':
        return <QuestBoardScreen />;
      case 'DANGER_ZONE':
        return <DangerZoneScreen />;
      case 'TIMER':
        return <TimerScreen />;
      case 'BIG_BOSS_MIC':
        return <BigBossMicScreen />;
      case 'STATS':
        return <StatsScreen />;
      case 'EVICTED_HALL':
        return <EvictedHallScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col relative text-[#FFF6E5] ${state.screenShake ? 'animate-shake' : ''}`}>
      {/* Optional CRT Scanline Overlay */}
      {state.scanlines && (
        <div className="fixed inset-0 pointer-events-none z-50 crt-overlay opacity-75" />
      )}

      {/* Top HUD Bar */}
      <HudBar onOpenLog={() => setIsLogOpen(true)} />

      {/* Main Body: Sidebar + Active Screen Viewport */}
      <div className="flex-1 flex min-h-[calc(100vh-62px)] pb-16 md:pb-6">
        <Sidebar />

        {/* Viewport frame with generous spacing */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* Keyed wrapper for crisp screen transition */}
          <div key={state.currentScreen} className="transition-opacity duration-150">
            {renderCurrentScreen()}
          </div>
        </main>
      </div>

      {/* Global Overlays & Modals */}
      <DialogueBanner />
      <EvictionOverlay />
      <QuestCompleteBanner />
      <ActivityDrawer isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
