import React from 'react';
import { useGame } from '../../context/GameContext';
import { PixelAvatar } from '../pixel/PixelAvatar';
import { TeamBadge } from '../common/TeamBadge';
import {
  PixelCrown,
  PixelTrophy,
  PixelSkull,
  PixelCoin,
  PixelSwords,
  PixelMegaphone,
  PixelHourglass,
  PixelPlus,
  PixelStar
} from '../pixel/PixelIcons';

export const HomeScreen: React.FC = () => {
  const {
    state,
    dispatch,
    houseCaptain,
    activeContestants,
    nominatedContestants,
    highestScorer
  } = useGame();

  const completedTasksCount = state.tasks.filter(t => t.status === 'Completed').length;

  // Top 3 Podium
  const topThree = [...activeContestants]
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
    .slice(0, 3);

  const latestAnnouncement = state.announcements[0] || null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome Banner / Header */}
      <div className="pixel-panel-magenta p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-arcade text-xs text-[#FFD51E]">COMMAND OVERVIEW</span>
            <span className="font-arcade text-[10px] px-2 py-0.5 bg-[#14023A] text-[#FFF6E5] border border-[#FFD51E]">
              DAY {state.day.toString().padStart(2, '0')}
            </span>
          </div>
          <h2 className="font-arcade text-lg sm:text-2xl text-[#FFF6E5]">
            TECH HOUSE COMMAND CENTER
          </h2>
          <p className="font-pixel text-xl sm:text-2xl text-[#FFF6E5]/80">
            Monitor contestants, enforce reality rules, and issue executive orders.
          </p>
        </div>

        {/* Quick Day increment */}
        <button
          onClick={() => dispatch({ type: 'NEXT_DAY' })}
          className="pixel-btn-yellow px-4 py-2 text-xs flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <span>ADVANCE TO DAY {state.day + 1}</span>
          <span>▶</span>
        </button>
      </div>

      {/* Row of 4 Headline Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Contestants */}
        <div
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'CONTESTANTS' })}
          className="pixel-panel p-4 cursor-pointer hover:border-[#FFD51E] transition-all"
        >
          <div className="flex items-center justify-between text-[#FFD51E] mb-1">
            <span className="font-arcade text-[10px]">ACTIVE SQUAD</span>
            <span className="font-arcade text-xs">➔</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-arcade text-2xl sm:text-3xl text-[#FFF6E5]">
              {activeContestants.length}
            </span>
            <span className="font-pixel text-lg text-[#FFF6E5]/70">HACKERS</span>
          </div>
          <span className="font-pixel text-base text-[#FFD51E] block mt-1">
            View all contestants
          </span>
        </div>

        {/* Nominees in Danger */}
        <div
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'DANGER_ZONE' })}
          className={`pixel-panel p-4 cursor-pointer transition-all ${
            nominatedContestants.length > 0 ? 'border-4 border-[#FF467A]' : 'hover:border-[#FFD51E]'
          }`}
        >
          <div className="flex items-center justify-between text-[#FF467A] mb-1">
            <div className="flex items-center gap-1.5">
              <PixelSkull size={14} />
              <span className="font-arcade text-[10px]">IN DANGER</span>
            </div>
            <span className="font-arcade text-xs">➔</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-arcade text-2xl sm:text-3xl text-[#FF467A]">
              {nominatedContestants.length}
            </span>
            <span className="font-pixel text-lg text-[#FFF6E5]/70">ON THE BLOCK</span>
          </div>
          <span className="font-pixel text-base text-[#FF467A] block mt-1">
            {nominatedContestants.length > 0 ? 'Eviction risk!' : 'House is safe'}
          </span>
        </div>

        {/* Tasks Completed */}
        <div
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'QUESTS' })}
          className="pixel-panel p-4 cursor-pointer hover:border-[#FFD51E] transition-all"
        >
          <div className="flex items-center justify-between text-[#FFD51E] mb-1">
            <span className="font-arcade text-[10px]">QUESTS DONE</span>
            <span className="font-arcade text-xs">➔</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-arcade text-2xl sm:text-3xl text-[#FFF6E5]">
              {completedTasksCount}
            </span>
            <span className="font-pixel text-lg text-[#FFF6E5]/70">
              / {state.tasks.length}
            </span>
          </div>
          <span className="font-pixel text-base text-[#FFD51E] block mt-1">
            Open quest board
          </span>
        </div>

        {/* Highest Scorer */}
        <div
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'LEADERBOARD' })}
          className="pixel-panel p-4 cursor-pointer hover:border-[#FFD51E] transition-all"
        >
          <div className="flex items-center justify-between text-[#FFD51E] mb-1">
            <span className="font-arcade text-[10px]">HIGH SCORER</span>
            <span className="font-arcade text-xs">➔</span>
          </div>
          <div className="truncate">
            <span className="font-arcade text-base sm:text-lg text-[#FFD51E] block truncate">
              {highestScorer ? highestScorer.name : 'None'}
            </span>
            <div className="flex items-center gap-1 font-pixel text-xl text-[#FFF6E5]">
              <PixelCoin size={14} />
              <span>{highestScorer ? `${highestScorer.points} PTS` : '0 PTS'}</span>
            </div>
          </div>
          <span className="font-pixel text-base text-[#FFD51E] block mt-1">
            View high scores
          </span>
        </div>
      </div>

      {/* Main Section: Current House Captain & Mini Top-3 Podium */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current House Captain Card (5 cols) */}
        <div className="lg:col-span-5 pixel-panel-yellow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#14023A] pb-2">
              <div className="flex items-center gap-2">
                <PixelCrown size={22} />
                <h3 className="font-arcade text-xs sm:text-sm text-[#FFD51E]">
                  CURRENT HOUSE CAPTAIN
                </h3>
              </div>
              <button
                onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'CONTESTANTS' })}
                className="font-arcade text-[9px] text-[#14023A] hover:underline"
              >
                CHANGE ➔
              </button>
            </div>

            {houseCaptain ? (
              <div className="flex items-start gap-4 my-2">
                <div className="p-2 bg-[#14023A] border-4 border-[#FFD51E] shrink-0 shadow-[3px_3px_0_#14023A]">
                  <PixelAvatar
                    seed={houseCaptain.avatarSeed}
                    size={72}
                    isBobbing={true}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-arcade text-base sm:text-lg text-[#FFF6E5] block truncate">
                    {houseCaptain.name}
                  </span>
                  <div className="my-1.5">
                    <TeamBadge team={houseCaptain.team} size="sm" />
                  </div>
                  <div className="flex items-center gap-1 text-[#FFD51E] font-arcade text-xs">
                    <PixelCoin size={14} />
                    <span>{houseCaptain.points} Points</span>
                  </div>
                  {/* Level & XP bar */}
                  <div className="mt-2 bg-[#14023A] p-2 border border-[#AB03A9]">
                    <div className="flex justify-between font-arcade text-[10px] text-[#FFF6E5] mb-1">
                      <span>LV {Math.floor(houseCaptain.points / 50) + 1}</span>
                      <span>{houseCaptain.points % 50} / 50 XP</span>
                    </div>
                    <div className="w-full bg-[#5003C0] h-2 border border-[#14023A]">
                      <div
                        className="bg-[#FFD51E] h-full"
                        style={{ width: `${Math.min(100, ((houseCaptain.points % 50) / 50) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <PixelCrown size={32} className="mx-auto opacity-50 mb-2" />
                <p className="font-pixel text-2xl text-[#FFF6E5]/70">No House Captain Crowned</p>
                <button
                  onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'CONTESTANTS' })}
                  className="pixel-btn-yellow mt-3 px-4 py-2 text-xs"
                >
                  SELECT CAPTAIN
                </button>
              </div>
            )}
          </div>

          {houseCaptain && (
            <div className="mt-4 p-2.5 bg-[#14023A] border-2 border-[#14023A]">
              <p className="font-pixel text-xl text-[#FFF6E5] italic leading-tight">
                "{houseCaptain.bio || 'Reigning supreme in the Tech House code reviews.'}"
              </p>
            </div>
          )}
        </div>

        {/* Mini Top-3 Podium (7 cols) */}
        <div className="lg:col-span-7 pixel-panel p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b-2 border-[#AB03A9] pb-2">
            <div className="flex items-center gap-2">
              <PixelTrophy size={20} />
              <h3 className="font-arcade text-xs sm:text-sm text-[#FFD51E]">
                ARCADE PODIUM · TOP 3
              </h3>
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'LEADERBOARD' })}
              className="font-arcade text-[9px] text-[#FFD51E] hover:underline"
            >
              FULL BOARD ➔
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center my-auto">
            {/* 2nd place */}
            {topThree[1] && (
              <div className="bg-[#14023A] border-2 border-[#AB03A9] p-2 flex flex-col items-center">
                <span className="font-arcade text-xs text-[#FFF6E5] mb-1">#2 SILVER</span>
                <PixelAvatar seed={topThree[1].avatarSeed} size={48} isBobbing={false} />
                <span className="font-arcade text-[10px] text-[#FFF6E5] mt-1.5 truncate w-full">
                  {topThree[1].name}
                </span>
                <span className="font-pixel text-lg text-[#FFD51E]">
                  {topThree[1].points} PTS
                </span>
              </div>
            )}

            {/* 1st place (Prominent) */}
            {topThree[0] && (
              <div className="bg-[#14023A] border-4 border-[#FFD51E] p-3 flex flex-col items-center -mt-2 shadow-[4px_4px_0_#14023A]">
                <div className="flex items-center gap-1 text-[#FFD51E] mb-1">
                  <PixelCrown size={16} />
                  <span className="font-arcade text-xs animate-bounce">1ST GOLD</span>
                </div>
                <PixelAvatar seed={topThree[0].avatarSeed} size={56} isBobbing={true} />
                <span className="font-arcade text-xs text-[#FFD51E] mt-1.5 truncate w-full font-bold">
                  {topThree[0].name}
                </span>
                <span className="font-pixel text-2xl text-[#FFD51E]">
                  {topThree[0].points} PTS
                </span>
              </div>
            )}

            {/* 3rd place */}
            {topThree[2] && (
              <div className="bg-[#14023A] border-2 border-[#AB03A9] p-2 flex flex-col items-center">
                <span className="font-arcade text-xs text-[#FFF6E5] mb-1">#3 BRONZE</span>
                <PixelAvatar seed={topThree[2].avatarSeed} size={48} isBobbing={false} />
                <span className="font-arcade text-[10px] text-[#FFF6E5] mt-1.5 truncate w-full">
                  {topThree[2].name}
                </span>
                <span className="font-pixel text-lg text-[#FFD51E]">
                  {topThree[2].points} PTS
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <span className="font-pixel text-lg text-[#FFF6E5]/70">
              Active house leaderboard based on verified quest & contribution points.
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone Preview & Latest Announcement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Danger Zone Preview */}
        <div className="pixel-panel p-5 border-4 border-[#FF467A]">
          <div className="flex items-center justify-between mb-3 border-b-2 border-[#FF467A] pb-2">
            <div className="flex items-center gap-2">
              <PixelSkull size={18} />
              <h3 className="font-arcade text-xs text-[#FF467A]">
                DANGER ZONE PREVIEW
              </h3>
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'DANGER_ZONE' })}
              className="font-arcade text-[9px] text-[#FF467A] hover:underline"
            >
              GO TO BLOCK ➔
            </button>
          </div>

          {nominatedContestants.length === 0 ? (
            <div className="py-6 text-center">
              <p className="font-pixel text-2xl text-[#FFF6E5]">
                No one is currently nominated for eviction.
              </p>
              <span className="font-pixel text-lg text-[#FFD51E]">
                The house is safe... for now.
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-pixel text-xl text-[#FF467A]">
                {nominatedContestants.length} contestant(s) face potential eviction:
              </p>
              <div className="flex flex-wrap gap-2">
                {nominatedContestants.map(nominee => (
                  <div
                    key={nominee.id}
                    onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'DANGER_ZONE' })}
                    className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-[#14023A] border-2 border-[#FF467A] hover:bg-[#FF467A] hover:text-[#14023A] transition-colors"
                  >
                    <PixelAvatar seed={nominee.avatarSeed} size={28} />
                    <span className="font-arcade text-xs font-bold">
                      {nominee.name}
                    </span>
                    <span className="font-pixel text-lg">({nominee.points} PTS)</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Latest Announcement Card */}
        <div className="pixel-panel p-5">
          <div className="flex items-center justify-between mb-3 border-b-2 border-[#AB03A9] pb-2">
            <div className="flex items-center gap-2">
              <PixelMegaphone size={18} />
              <h3 className="font-arcade text-xs text-[#FFD51E]">
                LATEST BIG BOSS TRANSMISSION
              </h3>
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'BIG_BOSS_MIC' })}
              className="font-arcade text-[9px] text-[#FFD51E] hover:underline"
            >
              BROADCAST ➔
            </button>
          </div>

          {latestAnnouncement ? (
            <div className="bg-[#14023A] p-3 border-2 border-[#AB03A9]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-arcade text-[9px] text-[#FFD51E]">
                  [{latestAnnouncement.type.toUpperCase()}]
                </span>
                <span className="font-pixel text-base text-[#FFF6E5]/60">
                  {latestAnnouncement.timestamp}
                </span>
              </div>
              <p className="font-pixel text-xl text-[#FFF6E5] leading-relaxed">
                "{latestAnnouncement.message}"
              </p>
            </div>
          ) : (
            <p className="font-pixel text-xl text-[#FFF6E5]/70">No announcements broadcasted yet.</p>
          )}
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="pixel-panel-night p-4 border-2 border-[#FFD51E]">
        <span className="font-arcade text-[10px] text-[#FFD51E] block mb-3 uppercase tracking-wider">
          COMMAND QUICK ACTIONS
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'BIG_BOSS_MIC' })}
            className="pixel-btn-yellow p-3 flex items-center justify-center gap-2 text-center"
          >
            <PixelMegaphone size={16} />
            <span className="text-[10px]">BROADCAST</span>
          </button>

          <button
            onClick={() => {
              dispatch({ type: 'START_TIMER', seconds: 120 });
              dispatch({ type: 'SET_SCREEN', screen: 'TIMER' });
            }}
            className="pixel-btn-violet p-3 flex items-center justify-center gap-2 text-center"
          >
            <PixelHourglass size={16} />
            <span className="text-[10px]">START 2M TIMER</span>
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'CONTESTANTS' })}
            className="pixel-btn-magenta p-3 flex items-center justify-center gap-2 text-center"
          >
            <PixelPlus size={16} />
            <span className="text-[10px]">AWARD POINTS</span>
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'DANGER_ZONE' })}
            className="pixel-btn-pink p-3 flex items-center justify-center gap-2 text-center"
          >
            <PixelSkull size={16} />
            <span className="text-[10px]">NOMINATE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
