import React from 'react';
import { useGame } from '../../context/GameContext';
import { ScreenType } from '../../types';
import {
  PixelCrown,
  PixelTrophy,
  PixelSwords,
  PixelSkull,
  PixelHourglass,
  PixelMegaphone,
  PixelStar,
  PixelUser
} from '../pixel/PixelIcons';

interface NavItem {
  id: ScreenType;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { state, dispatch, nominatedContestants, evictedContestants } = useGame();

  const navItems: NavItem[] = [
    {
      id: 'HOME',
      label: 'HOME',
      shortLabel: 'HOME',
      icon: <PixelStar size={16} />
    },
    {
      id: 'CONTESTANTS',
      label: 'CONTESTANTS',
      shortLabel: 'SQUAD',
      icon: <PixelUser size={16} />
    },
    {
      id: 'LEADERBOARD',
      label: 'LEADERBOARD',
      shortLabel: 'RANKS',
      icon: <PixelTrophy size={16} />
    },
    {
      id: 'QUESTS',
      label: 'QUESTS (TASKS)',
      shortLabel: 'QUESTS',
      icon: <PixelSwords size={16} />
    },
    {
      id: 'DANGER_ZONE',
      label: 'DANGER ZONE',
      shortLabel: 'DANGER',
      icon: <PixelSkull size={16} />
    },
    {
      id: 'TIMER',
      label: 'TIMER',
      shortLabel: 'TIMER',
      icon: <PixelHourglass size={16} />
    },
    {
      id: 'BIG_BOSS_MIC',
      label: 'BIG BOSS MIC',
      shortLabel: 'MIC',
      icon: <PixelMegaphone size={16} />
    },
    {
      id: 'STATS',
      label: 'STATS',
      shortLabel: 'STATS',
      icon: <PixelCrown size={16} />
    },
    {
      id: 'EVICTED_HALL',
      label: 'EVICTED HALL',
      shortLabel: 'EVICTED',
      icon: <PixelSkull size={16} />
    }
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar (Left fixed) */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-[#5003C0] border-r-4 border-[#14023A] shadow-[4px_0_0_#14023A] min-h-[calc(100vh-62px)] p-4 select-none">
        <div className="mb-4 pb-3 border-b-2 border-[#AB03A9]">
          <span className="font-arcade text-[10px] text-[#FFD51E] tracking-widest block uppercase">
            CONTROL MENU
          </span>
          <span className="font-pixel text-lg text-[#FFF6E5]/70">
            Tech House v16-bit
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = state.currentScreen === item.id;
            const isDanger = item.id === 'DANGER_ZONE' && nominatedContestants.length > 0;
            const isEvicted = item.id === 'EVICTED_HALL' && evictedContestants.length > 0;

            return (
              <button
                key={item.id}
                onClick={() => dispatch({ type: 'SET_SCREEN', screen: item.id })}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 font-arcade text-xs border-2 transition-all ${
                  isActive
                    ? 'bg-[#FFD51E] text-[#14023A] border-[#14023A] shadow-[3px_3px_0_#14023A] font-bold'
                    : 'bg-[#14023A] text-[#FFF6E5] border-[#AB03A9] hover:bg-[#AB03A9] shadow-[2px_2px_0_#14023A]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-[#14023A]' : 'text-[#FFD51E]'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Badges */}
                  {isDanger && (
                    <span className="font-arcade text-[9px] px-1.5 py-0.5 bg-[#FF467A] text-[#14023A] animate-pulse border border-[#14023A]">
                      {nominatedContestants.length}
                    </span>
                  )}
                  {isEvicted && (
                    <span className="font-arcade text-[9px] px-1.5 py-0.5 bg-[#14023A] text-[#FFF6E5] border border-[#AB03A9]">
                      {evictedContestants.length}
                    </span>
                  )}
                  {isActive && (
                    <span className="font-arcade text-xs text-[#14023A] ml-1">
                      ▶
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Big Boss Status Card at bottom of sidebar */}
        <div className="mt-auto pt-4 border-t-2 border-[#AB03A9]">
          <div className="p-3 bg-[#14023A] border-2 border-[#FFD51E]">
            <span className="font-arcade text-[9px] text-[#FFD51E] block mb-1">
              SYSTEM STATUS
            </span>
            <p className="font-pixel text-lg text-[#FFF6E5] leading-none mb-1">
              Big Boss is online.
            </p>
            <span className="font-pixel text-base text-[#FF467A]">
              Reality House active.
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14023A] border-t-4 border-[#AB03A9] px-1 py-1 flex items-center justify-around overflow-x-auto shadow-[0_-4px_0_#14023A]">
        {navItems.map((item) => {
          const isActive = state.currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: item.id })}
              className={`flex flex-col items-center justify-center p-1.5 min-w-[54px] border ${
                isActive
                  ? 'bg-[#FFD51E] text-[#14023A] border-[#14023A]'
                  : 'text-[#FFF6E5] border-transparent hover:bg-[#5003C0]'
              }`}
            >
              <div className="scale-90">{item.icon}</div>
              <span className="font-arcade text-[8px] mt-0.5 truncate max-w-[50px]">
                {item.shortLabel}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
