import React, { useState } from 'react';
import { Contestant } from '../../types';
import { useGame } from '../../context/GameContext';
import { PixelAvatar } from '../pixel/PixelAvatar';
import { TeamBadge } from '../common/TeamBadge';
import {
  PixelCrown,
  PixelShield,
  PixelSkull,
  PixelCoin
} from '../pixel/PixelIcons';

interface ContestantCardProps {
  contestant: Contestant;
  onOpenCustomPoints: (c: Contestant) => void;
  onConfirmEvict: (c: Contestant) => void;
}

export const ContestantCard: React.FC<ContestantCardProps> = ({
  contestant,
  onOpenCustomPoints,
  onConfirmEvict,
}) => {
  const { state, dispatch } = useGame();
  const [tooltip, setTooltip] = useState<string | null>(null);

  const level = Math.floor(contestant.points / 50) + 1;
  const currentLevelXp = contestant.points % 50;
  const xpPercent = Math.min(100, (currentLevelXp / 50) * 100);

  // Floating damage numbers for this contestant
  const popups = state.floatingScores.filter(s => s.contestantId === contestant.id);

  // Status border style
  const getCardBorderStyle = () => {
    if (contestant.isNominated) {
      return 'border-4 border-[#FF467A] shadow-[4px_4px_0_#14023A]';
    }
    if (contestant.isImmune) {
      return 'border-4 border-[#FFD51E] shadow-[4px_4px_0_#14023A]';
    }
    if (contestant.isCaptain) {
      return 'border-4 border-[#FFD51E] shadow-[4px_4px_0_#14023A]';
    }
    return 'border-4 border-[#14023A] shadow-[4px_4px_0_#14023A]';
  };

  const cannotNominateReason = () => {
    if (contestant.isCaptain) return "House Captain cannot be nominated!";
    if (contestant.isImmune) return "Immune contestant cannot be nominated!";
    if (contestant.status === 'Evicted') return "Evicted contestants cannot be nominated!";
    return null;
  };

  const nominationBlockReason = cannotNominateReason();

  return (
    <div className={`relative bg-[#5003C0] p-4 flex flex-col justify-between ${getCardBorderStyle()}`}>
      {/* Floating damage number popups directly over the card */}
      <div className="absolute top-2 right-4 pointer-events-none z-30">
        {popups.map(p => (
          <div
            key={p.id}
            onAnimationEnd={() => dispatch({ type: 'REMOVE_FLOATING_SCORE', id: p.id })}
            className={`font-arcade text-base sm:text-lg animate-damage-float ${
              p.isGain ? 'text-[#FFD51E]' : 'text-[#FF467A]'
            }`}
          >
            {p.isGain ? `+${p.amount}` : `-${p.amount}`}
          </div>
        ))}
      </div>

      <div>
        {/* Top Badges row: Captain / Immunity / Nominated */}
        <div className="flex items-center justify-between mb-3 min-h-[26px]">
          <div className="flex items-center gap-1.5 flex-wrap">
            {contestant.isCaptain && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#FFD51E] text-[#14023A] font-arcade text-[9px] border border-[#14023A]">
                <PixelCrown size={12} />
                CAPTAIN
              </span>
            )}
            {contestant.isImmune && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#5003C0] text-[#FFD51E] font-arcade text-[9px] border-2 border-[#FFD51E]">
                <PixelShield size={12} />
                IMMUNE
              </span>
            )}
            {contestant.isNominated && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#FF467A] text-[#14023A] font-arcade text-[9px] border border-[#14023A] animate-pulse">
                <PixelSkull size={12} />
                NOMINATED
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="font-arcade text-[10px] text-[#FFF6E5]/70">
              LV {level}
            </span>
          </div>
        </div>

        {/* Avatar + Main Info */}
        <div className="flex items-start gap-3 mb-3">
          <div className="shrink-0 p-1.5 bg-[#14023A] border-2 border-[#AB03A9]">
            <PixelAvatar
              seed={contestant.avatarSeed}
              size={56}
              isBobbing={true}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-arcade text-sm text-[#FFF6E5] truncate font-bold">
              {contestant.name}
            </h3>
            <div className="my-1">
              <TeamBadge team={contestant.team} size="sm" />
            </div>

            {/* Points & Coin */}
            <div className="flex items-center gap-1 font-arcade text-xs text-[#FFD51E] mt-1">
              <PixelCoin size={14} />
              <span>{contestant.points} Points</span>
            </div>
          </div>
        </div>

        {/* Bio / Quote */}
        {contestant.bio && (
          <p className="font-pixel text-lg text-[#FFF6E5]/80 leading-none mb-3 italic truncate">
            "{contestant.bio}"
          </p>
        )}

        {/* XP Progress Bar */}
        <div className="bg-[#14023A] p-1.5 border border-[#14023A] mb-3">
          <div className="flex justify-between font-arcade text-[8px] text-[#FFF6E5]/80 mb-0.5">
            <span>XP TO NEXT LEVEL</span>
            <span>{currentLevelXp}/50</span>
          </div>
          <div className="w-full bg-[#5003C0] h-2 border border-[#14023A]">
            <div
              className="bg-[#FFD51E] h-full transition-all"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Point Adjust Buttons */}
        <div className="flex items-center justify-between gap-1 mb-3 bg-[#14023A] p-1 border border-[#AB03A9]">
          <span className="font-arcade text-[8px] text-[#FFF6E5]/70 pl-1">PTS:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch({ type: 'UPDATE_POINTS', contestantId: contestant.id, delta: -10 })}
              className="px-1.5 py-0.5 font-arcade text-[9px] bg-[#FF467A] text-[#14023A] hover:bg-[#ff6591] border border-[#14023A]"
              title="-10 Points"
            >
              -10
            </button>
            <button
              onClick={() => dispatch({ type: 'UPDATE_POINTS', contestantId: contestant.id, delta: -5 })}
              className="px-1.5 py-0.5 font-arcade text-[9px] bg-[#FF467A] text-[#14023A] hover:bg-[#ff6591] border border-[#14023A]"
              title="-5 Points"
            >
              -5
            </button>
            <button
              onClick={() => dispatch({ type: 'UPDATE_POINTS', contestantId: contestant.id, delta: 5 })}
              className="px-1.5 py-0.5 font-arcade text-[9px] bg-[#FFD51E] text-[#14023A] hover:bg-[#ffe054] border border-[#14023A]"
              title="+5 Points"
            >
              +5
            </button>
            <button
              onClick={() => dispatch({ type: 'UPDATE_POINTS', contestantId: contestant.id, delta: 10 })}
              className="px-1.5 py-0.5 font-arcade text-[9px] bg-[#FFD51E] text-[#14023A] hover:bg-[#ffe054] border border-[#14023A]"
              title="+10 Points"
            >
              +10
            </button>
            <button
              onClick={() => onOpenCustomPoints(contestant)}
              className="px-1.5 py-0.5 font-arcade text-[9px] bg-[#AB03A9] text-[#FFF6E5] hover:bg-[#c712c5] border border-[#14023A]"
              title="Custom Points and Reason"
            >
              ...
            </button>
          </div>
        </div>
      </div>

      {/* Row of Icon Action Buttons with tooltips */}
      <div className="pt-2 border-t-2 border-[#14023A]">
        <div className="grid grid-cols-4 gap-1.5">
          {/* Captain button */}
          <button
            onClick={() => dispatch({ type: 'MAKE_CAPTAIN', contestantId: contestant.id })}
            onMouseEnter={() => setTooltip(contestant.isCaptain ? 'Current Captain' : 'Make House Captain')}
            onMouseLeave={() => setTooltip(null)}
            className={`py-1.5 flex flex-col items-center justify-center border-2 border-[#14023A] ${
              contestant.isCaptain
                ? 'bg-[#FFD51E] text-[#14023A]'
                : 'bg-[#14023A] text-[#FFD51E] hover:bg-[#AB03A9]'
            }`}
            aria-label="Make Captain"
          >
            <PixelCrown size={14} />
            <span className="font-arcade text-[7px] mt-0.5">CAPTAIN</span>
          </button>

          {/* Immunity button */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_IMMUNITY', contestantId: contestant.id })}
            onMouseEnter={() => setTooltip(contestant.isImmune ? 'Remove Immunity' : 'Grant Immunity')}
            onMouseLeave={() => setTooltip(null)}
            className={`py-1.5 flex flex-col items-center justify-center border-2 border-[#14023A] ${
              contestant.isImmune
                ? 'bg-[#FFD51E] text-[#14023A]'
                : 'bg-[#14023A] text-[#FFF6E5] hover:bg-[#AB03A9]'
            }`}
            aria-label="Toggle Immunity"
          >
            <PixelShield size={14} />
            <span className="font-arcade text-[7px] mt-0.5">SHIELD</span>
          </button>

          {/* Nominate button */}
          <button
            onClick={() => {
              if (nominationBlockReason) {
                setTooltip(nominationBlockReason);
                return;
              }
              dispatch({ type: 'TOGGLE_NOMINATION', contestantId: contestant.id });
            }}
            onMouseEnter={() => setTooltip(nominationBlockReason || (contestant.isNominated ? 'Un-nominate' : 'Nominate for Eviction'))}
            onMouseLeave={() => setTooltip(null)}
            disabled={Boolean(nominationBlockReason)}
            className={`py-1.5 flex flex-col items-center justify-center border-2 border-[#14023A] ${
              nominationBlockReason
                ? 'opacity-40 cursor-not-allowed bg-[#14023A] text-[#FFF6E5]/40'
                : contestant.isNominated
                ? 'bg-[#FF467A] text-[#14023A]'
                : 'bg-[#14023A] text-[#FF467A] hover:bg-[#AB03A9]'
            }`}
            aria-label="Toggle Nomination"
          >
            <PixelSkull size={14} />
            <span className="font-arcade text-[7px] mt-0.5">BLOCK</span>
          </button>

          {/* Evict button */}
          <button
            onClick={() => onConfirmEvict(contestant)}
            onMouseEnter={() => setTooltip('Evict from Tech House')}
            onMouseLeave={() => setTooltip(null)}
            className="py-1.5 flex flex-col items-center justify-center bg-[#FF467A] text-[#14023A] hover:bg-[#ff6591] border-2 border-[#14023A]"
            aria-label="Evict Contestant"
          >
            <span className="font-arcade text-xs leading-none">✕</span>
            <span className="font-arcade text-[7px] mt-0.5">EVICT</span>
          </button>
        </div>

        {/* Live Hover Tooltip */}
        {tooltip && (
          <div className="mt-2 p-1 bg-[#14023A] border border-[#FFD51E] text-center">
            <span className="font-pixel text-base text-[#FFD51E] block leading-none">
              {tooltip}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
