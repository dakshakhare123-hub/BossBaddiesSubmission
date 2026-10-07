import React from 'react';
import { useGame } from '../../context/GameContext';
import { TeamBadge } from '../common/TeamBadge';
import { PixelAvatar } from '../pixel/PixelAvatar';
import {
  PixelCrown,
  PixelCoin,
  PixelSkull,
  PixelShield,
  PixelSwords,
  PixelTrophy,
  PixelStar
} from '../pixel/PixelIcons';

export const StatsScreen: React.FC = () => {
  const {
    state,
    activeContestants,
    evictedContestants,
    nominatedContestants,
    houseCaptain,
    highestScorer,
    lowestScorer,
    totalPoints,
    averagePoints,
    teamStats
  } = useGame();

  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = state.tasks.filter(t => t.status === 'Pending').length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const immuneContestants = activeContestants.filter(c => c.isImmune);
  const maxTeamPoints = Math.max(...teamStats.map(t => t.points), 50);

  // Distinct palette colors for each team bar chart
  const getTeamBarColor = (teamName: string) => {
    switch (teamName) {
      case 'Frontend Falcons':
        return 'bg-[#FFD51E]'; // Sunshine Yellow
      case 'Backend Bears':
        return 'bg-[#FFF6E5]'; // Off-White
      case 'DevOps Dragons':
        return 'bg-[#FF467A]'; // Hot Pink
      case 'AI Aliens':
        return 'bg-[#AB03A9]'; // Magenta
      default:
        return 'bg-[#5003C0]';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-8">
      {/* 1. Header Banner */}
      <div className="pixel-panel-magenta p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PixelTrophy size={20} />
            <span className="font-arcade text-xs text-[#FFD51E] tracking-wider">
              TELEMETRY ARCHIVE
            </span>
          </div>
          <h2 className="font-arcade text-xl sm:text-2xl text-[#FFF6E5] leading-tight">
            BIG BOSS HOUSE METRICS
          </h2>
          <p className="font-pixel text-2xl text-[#FFF6E5]/80 mt-1">
            Real-time status report of contestants, quests, governance, and squad standings.
          </p>
        </div>

        <div className="bg-[#14023A] border-4 border-[#FFD51E] px-4 py-2 text-center shrink-0 self-start sm:self-auto shadow-[3px_3px_0_#14023A]">
          <span className="font-arcade text-[10px] text-[#FFD51E] block mb-0.5">
            HOUSE CYCLE
          </span>
          <span className="font-arcade text-base text-[#FFF6E5]">
            DAY {state.day.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* 2. Core Vitals: 4 Spacious Metric Blocks */}
      <div className="pixel-panel p-6">
        <h3 className="font-arcade text-xs text-[#FFD51E] mb-4 pb-2 border-b-2 border-[#AB03A9] flex items-center gap-2">
          <PixelStar size={16} />
          <span>VITAL HOUSE COUNTERS</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Hackers */}
          <div className="bg-[#14023A] border-3 border-[#FFD51E] p-4 text-center flex flex-col justify-between">
            <span className="font-pixel text-xl text-[#FFD51E] block mb-2">
              ACTIVE IN HOUSE
            </span>
            <div className="font-arcade text-3xl sm:text-4xl text-[#FFD51E] my-1">
              {activeContestants.length}
            </div>
            <span className="font-pixel text-lg text-[#FFF6E5]/70 block mt-2">
              {state.contestants.length} TOTAL RECRUITS
            </span>
          </div>

          {/* Evicted */}
          <div className="bg-[#14023A] border-3 border-[#FF467A] p-4 text-center flex flex-col justify-between">
            <span className="font-pixel text-xl text-[#FF467A] block mb-2">
              EVICTED TO GRAVEYARD
            </span>
            <div className="font-arcade text-3xl sm:text-4xl text-[#FF467A] my-1">
              {evictedContestants.length}
            </div>
            <span className="font-pixel text-lg text-[#FFF6E5]/70 block mt-2">
              ELIMINATED CODERS
            </span>
          </div>

          {/* Total Points */}
          <div className="bg-[#14023A] border-3 border-[#AB03A9] p-4 text-center flex flex-col justify-between">
            <span className="font-pixel text-xl text-[#FFF6E5] block mb-2">
              TOTAL HOUSE POINTS
            </span>
            <div className="font-arcade text-3xl sm:text-4xl text-[#FFF6E5] my-1">
              {totalPoints}
            </div>
            <span className="font-pixel text-lg text-[#FFD51E] block mt-2">
              ACTIVE POOL POINTS
            </span>
          </div>

          {/* Average Points */}
          <div className="bg-[#14023A] border-3 border-[#14023A] p-4 text-center flex flex-col justify-between">
            <span className="font-pixel text-xl text-[#FFF6E5] block mb-2">
              AVERAGE SCORE
            </span>
            <div className="font-arcade text-3xl sm:text-4xl text-[#FFF6E5] my-1">
              {averagePoints}
            </div>
            <span className="font-pixel text-lg text-[#FFF6E5]/70 block mt-2">
              PTS PER ACTIVE HACKER
            </span>
          </div>
        </div>
      </div>

      {/* 3. Governance Roster: 3 Clean Cards */}
      <div className="pixel-panel p-6">
        <h3 className="font-arcade text-xs text-[#FFD51E] mb-4 pb-2 border-b-2 border-[#AB03A9] flex items-center gap-2">
          <PixelCrown size={16} />
          <span>HOUSE GOVERNANCE & SECURITY</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Captain */}
          <div className="bg-[#14023A] border-4 border-[#FFD51E] p-5 flex flex-col justify-between shadow-[4px_4px_0_#14023A]">
            <div>
              <div className="flex items-center justify-between mb-3 border-b-2 border-[#5003C0] pb-2">
                <span className="font-arcade text-xs text-[#FFD51E] flex items-center gap-1.5">
                  <PixelCrown size={16} />
                  <span>HOUSE CAPTAIN</span>
                </span>
                <span className="font-arcade text-[9px] px-2 py-0.5 bg-[#FFD51E] text-[#14023A] font-bold">
                  REIGNING
                </span>
              </div>

              {houseCaptain ? (
                <div className="flex items-center gap-3 my-2">
                  <div className="p-1 bg-[#14023A] border-2 border-[#FFD51E] shrink-0">
                    <PixelAvatar seed={houseCaptain.avatarSeed} size={44} isBobbing={true} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-arcade text-[13px] text-[#FFF6E5] truncate font-bold">
                      {houseCaptain.name}
                    </h4>
                    <div className="mt-1">
                      <TeamBadge team={houseCaptain.team} size="sm" style={{ fontSize: '5px' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="font-pixel text-2xl text-[#FFF6E5]/60 py-3">
                  No House Captain currently crowned.
                </p>
              )}
            </div>

            <div className="mt-4 pt-2 border-t-2 border-[#5003C0] flex items-center justify-between">
              <span className="font-pixel text-lg text-[#FFF6E5]/70">CAPTAIN POINTS</span>
              <span className="font-arcade text-xs text-[#FFD51E]">
                {houseCaptain ? `${houseCaptain.points} PTS` : '0 PTS'}
              </span>
            </div>
          </div>

          {/* Nominees on the Block */}
          <div className="bg-[#14023A] border-4 border-[#FF467A] p-5 flex flex-col justify-between shadow-[4px_4px_0_#14023A]">
            <div>
              <div className="flex items-center justify-between mb-3 border-b-2 border-[#5003C0] pb-2">
                <span className="font-arcade text-xs text-[#FF467A] flex items-center gap-1.5">
                  <PixelSkull size={16} />
                  <span>NOMINEES</span>
                </span>
                <span className="font-arcade text-[9px] px-2 py-0.5 bg-[#FF467A] text-[#14023A] font-bold">
                  ON THE BLOCK
                </span>
              </div>

              <div className="my-2">
                <div className="font-arcade text-[21px] text-[#FF467A]">
                  {nominatedContestants.length} IN DANGER
                </div>
                <p className="font-pixel text-xl text-[#FFF6E5]/70 mt-1">
                  {nominatedContestants.length > 0
                    ? `${nominatedContestants.map(c => c.name).join(', ')}`
                    : 'The house is calm. Zero active nominations.'}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t-2 border-[#5003C0] flex items-center justify-between">
              <span className="font-pixel text-lg text-[#FFF6E5]/70">STATUS</span>
              <span className="font-arcade text-[10px] text-[#FF467A]">
                {nominatedContestants.length > 0 ? 'RISK ACTIVE' : 'SECURE'}
              </span>
            </div>
          </div>

          {/* Immunity Shield */}
          <div className="bg-[#14023A] border-4 border-[#AB03A9] p-5 flex flex-col justify-between shadow-[4px_4px_0_#14023A]">
            <div>
              <div className="flex items-center justify-between mb-3 border-b-2 border-[#5003C0] pb-2">
                <span className="font-arcade text-xs text-[#FFF6E5] flex items-center gap-1.5">
                  <PixelShield size={16} />
                  <span>IMMUNITY</span>
                </span>
                <span className="font-arcade text-[9px] px-2 py-0.5 bg-[#AB03A9] text-[#FFF6E5] font-bold">
                  PROTECTED
                </span>
              </div>

              <div className="my-2">
                <div className="font-arcade text-[16px] text-[#FFD51E]">
                  {immuneContestants.length} SHIELDED
                </div>
                <p className="font-pixel text-xl text-[#FFF6E5]/70 mt-1">
                  {immuneContestants.length > 0
                    ? `${immuneContestants.map(c => c.name).join(', ')} protected.`
                    : 'No contestant holds immunity shield.'}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t-2 border-[#5003C0] flex items-center justify-between">
              <span className="font-pixel text-lg text-[#FFF6E5]/70">DEFENSE LEVEL</span>
              <span className="font-arcade text-[10px] text-[#FFD51E]">
                {immuneContestants.length > 0 ? 'ARMORED' : 'NONE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Leaderboard Extremes: Highest vs Lowest Scorer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Scorer */}
        <div className="pixel-panel p-6 border-4 border-[#FFD51E]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#14023A]">
            <div className="flex items-center gap-2">
              <PixelCrown size={18} />
              <span className="font-arcade text-xs text-[#FFD51E]">TOP SCORING HACKER</span>
            </div>
            <span className="font-arcade text-[10px] bg-[#FFD51E] text-[#14023A] px-2.5 py-0.5 font-bold">
              1ST GOLD
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-1.5 bg-[#14023A] border-3 border-[#FFD51E] shrink-0">
              <PixelAvatar
                seed={highestScorer ? highestScorer.avatarSeed : 0}
                size={56}
                isBobbing={true}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-arcade text-base sm:text-lg text-[#FFF6E5] truncate font-bold">
                {highestScorer ? highestScorer.name : 'N/A'}
              </h4>
              <div className="my-1">
                {highestScorer && <TeamBadge team={highestScorer.team} size="sm" />}
              </div>
              <div className="flex items-center gap-1.5 font-arcade text-sm text-[#FFD51E] mt-1">
                <PixelCoin size={16} />
                <span>{highestScorer ? highestScorer.points : 0} POINTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lowest Scorer */}
        <div className="pixel-panel p-6 border-4 border-[#FF467A]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#14023A]">
            <div className="flex items-center gap-2">
              <PixelSkull size={18} />
              <span className="font-arcade text-xs text-[#FF467A]">CUT-LINE HACKER</span>
            </div>
            <span className="font-arcade text-[10px] bg-[#FF467A] text-[#14023A] px-2.5 py-0.5 font-bold">
              AT RISK
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-1.5 bg-[#14023A] border-3 border-[#FF467A] shrink-0">
              <PixelAvatar
                seed={lowestScorer ? lowestScorer.avatarSeed : 0}
                size={56}
                isBobbing={false}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-arcade text-base sm:text-lg text-[#FFF6E5] truncate font-bold">
                {lowestScorer ? lowestScorer.name : 'N/A'}
              </h4>
              <div className="my-1">
                {lowestScorer && <TeamBadge team={lowestScorer.team} size="sm" />}
              </div>
              <div className="flex items-center gap-1.5 font-arcade text-sm text-[#FF467A] mt-1">
                <PixelCoin size={16} />
                <span>{lowestScorer ? lowestScorer.points : 0} POINTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Quest Board Progress Bar Terminal */}
      <div className="pixel-panel p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b-2 border-[#AB03A9]">
          <div className="flex items-center gap-2">
            <PixelSwords size={18} />
            <h3 className="font-arcade text-xs text-[#FFD51E]">
              QUEST & TASK COMPLETION
            </h3>
          </div>
          <div className="font-arcade text-sm text-[#FFD51E]">
            {taskCompletionRate}% RATIO
          </div>
        </div>

        {/* Chunky Pixel Progress Bar */}
        <div className="w-full bg-[#14023A] h-6 border-4 border-[#14023A] p-0.5 mb-6 shadow-[2px_2px_0_#14023A]">
          <div
            className="bg-[#FFD51E] h-full transition-all duration-300"
            style={{ width: `${taskCompletionRate}%` }}
          />
        </div>

        {/* 3 Metric Inset Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#14023A] border-2 border-[#AB03A9] p-4 text-center">
            <span className="font-pixel text-xl text-[#FFD51E] block mb-1">
              COMPLETED QUESTS
            </span>
            <div className="font-arcade text-2xl text-[#FFD51E]">
              {completedTasks}
            </div>
          </div>

          <div className="bg-[#14023A] border-2 border-[#AB03A9] p-4 text-center">
            <span className="font-pixel text-xl text-[#FFF6E5]/80 block mb-1">
              PENDING QUESTS
            </span>
            <div className="font-arcade text-2xl text-[#FFF6E5]">
              {pendingTasks}
            </div>
          </div>

          <div className="bg-[#14023A] border-2 border-[#AB03A9] p-4 text-center">
            <span className="font-pixel text-xl text-[#FFF6E5]/80 block mb-1">
              TOTAL POSTED
            </span>
            <div className="font-arcade text-2xl text-[#FFF6E5]">
              {totalTasks}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Team Squad Standings (Bar Chart) */}
      <div className="pixel-panel p-6">
        <h3 className="font-arcade text-xs sm:text-sm text-[#FFD51E] mb-6 pb-2 border-b-2 border-[#AB03A9]">
          SQUAD LEADERBOARD · PIXEL STANDINGS
        </h3>

        <div className="space-y-6">
          {teamStats.map(stat => {
            const barWidth = maxTeamPoints > 0 ? Math.max(8, (stat.points / maxTeamPoints) * 100) : 0;
            const barColor = getTeamBarColor(stat.team);

            return (
              <div key={stat.team} className="bg-[#14023A] border-2 border-[#5003C0] p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <TeamBadge team={stat.team} size="md" />
                    <span className="font-pixel text-2xl text-[#FFF6E5]/70">
                      ({stat.count} ACTIVE CODERS)
                    </span>
                  </div>

                  <div className="font-arcade text-sm text-[#FFD51E]">
                    {stat.points} POINTS
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#5003C0] h-6 border-2 border-[#14023A] p-0.5">
                  <div
                    className={`${barColor} h-full transition-all duration-500`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
