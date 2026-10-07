import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PixelAvatar } from '../pixel/PixelAvatar';
import { TeamBadge } from '../common/TeamBadge';
import {
  PixelCrown,
  PixelTrophy,
  PixelStar,
  PixelCoin
} from '../pixel/PixelIcons';
import { TeamName } from '../../types';

export const LeaderboardScreen: React.FC = () => {
  const { activeContestants } = useGame();
  const [selectedTeam, setSelectedTeam] = useState<TeamName | 'All'>('All');

  // Sorted by points descending, ties broken alphabetically
  const filtered = activeContestants.filter(c => {
    return selectedTeam === 'All' || c.team === selectedTeam;
  });

  const sortedLeaderboard = [...filtered].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.name.localeCompare(b.name);
  });

  const maxPoints = Math.max(...activeContestants.map(c => c.points), 100);

  const getRankMedal = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1 text-[#FFD51E]">
          <PixelCrown size={16} />
          <span className="font-arcade text-xs animate-bounce font-bold">1ST</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center gap-1 text-[#FFF6E5]">
          <PixelTrophy size={14} />
          <span className="font-arcade text-xs">2ND</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center gap-1 text-[#FFD51E]">
          <PixelStar size={14} />
          <span className="font-arcade text-xs">3RD</span>
        </div>
      );
    }
    return (
      <span className="font-arcade text-xs text-[#FFF6E5]/70">
        #{rank}
      </span>
    );
  };

  const teams: (TeamName | 'All')[] = [
    'All',
    'Frontend Falcons',
    'Backend Bears',
    'DevOps Dragons',
    'AI Aliens'
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Arcade Header */}
      <div className="pixel-panel-magenta p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PixelTrophy size={20} />
            <span className="font-arcade text-xs text-[#FFD51E]">ARCADE HALL OF FAME</span>
          </div>
          <h2 className="font-arcade text-xl sm:text-2xl text-[#FFF6E5]">
            HIGH SCORES & LEADERBOARD
          </h2>
          <p className="font-pixel text-xl text-[#FFF6E5]/80">
            Real-time standings of all active house contestants. Ties broken alphabetically.
          </p>
        </div>

        {/* Arcade Cabinet Badge */}
        <div className="bg-[#14023A] border-2 border-[#FFD51E] px-3 py-1.5 font-arcade text-xs text-[#FFD51E] text-center shrink-0">
          TOP SCORE: {sortedLeaderboard[0]?.points || 0} PTS
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="pixel-panel p-3 flex flex-wrap items-center gap-1.5">
        <span className="font-arcade text-[10px] text-[#FFD51E] mr-2">
          FILTER:
        </span>
        {teams.map(t => (
          <button
            key={t}
            onClick={() => setSelectedTeam(t)}
            className={`font-arcade text-[10px] px-3 py-1.5 border-2 transition-all ${
              selectedTeam === t
                ? 'bg-[#FFD51E] text-[#14023A] border-[#14023A] font-bold shadow-[2px_2px_0_#14023A]'
                : 'bg-[#14023A] text-[#FFF6E5] border-[#AB03A9] hover:bg-[#AB03A9]'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Arcade High Score Table */}
      <div className="pixel-panel p-4 sm:p-6 space-y-3">
        {/* Table Header Row */}
        <div className="grid grid-cols-12 gap-2 text-[#FFD51E] font-arcade text-[10px] pb-2 border-b-2 border-[#AB03A9] px-3">
          <div className="col-span-2 sm:col-span-1">RANK</div>
          <div className="col-span-6 sm:col-span-4">CONTESTANT</div>
          <div className="hidden sm:block sm:col-span-3">TEAM</div>
          <div className="col-span-4 sm:col-span-4 text-right">POINTS & PROGRESS</div>
        </div>

        {/* Rows */}
        {sortedLeaderboard.length === 0 ? (
          <div className="text-center py-10 font-pixel text-2xl text-[#FFF6E5]/70">
            No contestants found in this squad.
          </div>
        ) : (
          sortedLeaderboard.map((contestant, index) => {
            const rank = index + 1;
            const progressPercent = Math.max(5, (contestant.points / maxPoints) * 100);
            const isFirst = rank === 1;

            return (
              <div
                key={contestant.id}
                className={`grid grid-cols-12 gap-2 items-center p-3 border-2 transition-all ${
                  isFirst
                    ? 'bg-[#14023A] border-4 border-[#FFD51E] shadow-[4px_4px_0_#14023A]'
                    : rank <= 3
                    ? 'bg-[#14023A] border-2 border-[#AB03A9] shadow-[2px_2px_0_#5003C0]'
                    : 'bg-[#5003C0] border-[#14023A]'
                }`}
              >
                {/* Rank column */}
                <div className="col-span-2 sm:col-span-1 flex items-center">
                  {getRankMedal(rank)}
                </div>

                {/* Contestant column */}
                <div className="col-span-6 sm:col-span-4 flex items-center gap-3 min-w-0">
                  <div className="shrink-0 p-1 bg-[#14023A] border border-[#AB03A9]">
                    <PixelAvatar
                      seed={contestant.avatarSeed}
                      size={36}
                      isBobbing={isFirst}
                    />
                  </div>
                  <div className="min-w-0 truncate">
                    <span className={`font-arcade text-xs truncate block ${
                      isFirst ? 'text-[#FFD51E] font-bold' : 'text-[#FFF6E5]'
                    }`}>
                      {contestant.name}
                    </span>
                    <div className="sm:hidden mt-0.5">
                      <TeamBadge team={contestant.team} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Team column */}
                <div className="hidden sm:block sm:col-span-3">
                  <TeamBadge team={contestant.team} size="sm" />
                </div>

                {/* Points & Progress Bar */}
                <div className="col-span-4 sm:col-span-4 text-right flex flex-col justify-center">
                  <div className="flex items-center justify-end gap-1 font-arcade text-xs text-[#FFD51E] mb-1">
                    <PixelCoin size={14} />
                    <span className="font-bold">{contestant.points} PTS</span>
                  </div>

                  {/* Pixel progress bar */}
                  <div className="w-full bg-[#14023A] h-3 border border-[#14023A] p-0.5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isFirst ? 'bg-[#FFD51E]' : rank <= 3 ? 'bg-[#AB03A9]' : 'bg-[#FF467A]'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
