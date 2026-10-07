import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PixelAvatar } from '../pixel/PixelAvatar';
import { TeamBadge } from '../common/TeamBadge';
import { Contestant } from '../../types';
import {
  PixelSkull,
  PixelCoin,
  PixelPlus
} from '../pixel/PixelIcons';

export const DangerZoneScreen: React.FC = () => {
  const { nominatedContestants, activeContestants, dispatch } = useGame();
  const [selectedToNominate, setSelectedToNominate] = useState('');
  const [nominationReason, setNominationReason] = useState('');
  const [evictTarget, setEvictTarget] = useState<Contestant | null>(null);

  // Eligible to be nominated: not evicted, not immune, not captain, not already nominated
  const eligibleContestants = activeContestants.filter(
    c => !c.isNominated && !c.isImmune && !c.isCaptain
  );

  const handleNominateFromDropdown = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedToNominate) return;
    dispatch({
      type: 'TOGGLE_NOMINATION',
      contestantId: selectedToNominate,
      reason: nominationReason.trim() || undefined
    });
    setSelectedToNominate('');
    setNominationReason('');
  };

  const handleExecuteEvict = () => {
    if (!evictTarget) return;
    dispatch({ type: 'EVICT_CONTESTANT', contestantId: evictTarget.id });
    setEvictTarget(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Danger Zone Stepped Pulsing Frame Header */}
      <div className="pixel-panel-pink animate-danger-pulse p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-1 bg-[#14023A] px-3 py-1 border border-[#FF467A]">
              <PixelSkull size={18} />
              <span className="font-arcade text-xs text-[#FF467A]">
                THE EVICTION BLOCK
              </span>
              <PixelSkull size={18} />
            </div>
            <h2 className="font-arcade text-2xl sm:text-3xl text-[#FFF6E5]">
              DANGER ZONE
            </h2>
            <p className="font-pixel text-xl text-[#FFF6E5]/90">
              Contestants on the block face immediate elimination. Save a hacker or execute the eviction order.
            </p>
          </div>

          <div className="bg-[#14023A] border-4 border-[#FF467A] p-3 text-center shrink-0">
            <span className="font-arcade text-[10px] text-[#FF467A] block">
              NOMINEE COUNT
            </span>
            <span className="font-arcade text-3xl text-[#FF467A]">
              {nominatedContestants.length}
            </span>
          </div>
        </div>
      </div>

      {/* Nominate Contestant Form */}
      <div className="pixel-panel p-5 border-2 border-[#FF467A]">
        <h3 className="font-arcade text-xs text-[#FFD51E] mb-3 flex items-center gap-2">
          <PixelPlus size={16} />
          <span>PUT CONTESTANT ON THE BLOCK</span>
        </h3>

        {eligibleContestants.length === 0 ? (
          <p className="font-pixel text-xl text-[#FFF6E5]/70">
            No eligible contestants available (remaining contestants are Captains, Immune, or already nominated).
          </p>
        ) : (
          <form onSubmit={handleNominateFromDropdown} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-5">
              <label className="font-arcade text-[10px] text-[#FFF6E5] block mb-1">
                SELECT CONTESTANT:
              </label>
              <select
                value={selectedToNominate}
                onChange={(e) => setSelectedToNominate(e.target.value)}
                required
                className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#AB03A9] px-3 py-2 font-pixel text-xl focus:border-[#FFD51E]"
              >
                <option value="">-- Choose eligible hacker --</option>
                {eligibleContestants.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.team} - {c.points} pts)
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-4">
              <label className="font-arcade text-[10px] text-[#FFF6E5] block mb-1">
                NOMINATION REASON:
              </label>
              <input
                type="text"
                placeholder="e.g. Failed code review..."
                value={nominationReason}
                onChange={(e) => setNominationReason(e.target.value)}
                className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#AB03A9] px-3 py-2 font-pixel text-xl"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={!selectedToNominate}
                className="pixel-btn-pink w-full py-2.5 text-xs font-bold disabled:opacity-40"
              >
                NOMINATE NOW ▶
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Nominated Contestants Cards */}
      {nominatedContestants.length === 0 ? (
        <div className="pixel-panel p-16 text-center border-4 border-[#5003C0]">
          <PixelSkull size={48} className="mx-auto mb-3 opacity-60 text-[#FF467A]" />
          <h3 className="font-arcade text-lg text-[#FFF6E5] mb-2">
            No one is in danger... yet.
          </h3>
          <p className="font-pixel text-2xl text-[#FFD51E]">
            The house is suspiciously calm. Big Boss expects drama soon.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-arcade text-xs text-[#FF467A]">
            CONTESTANTS FACING EVICTION:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nominatedContestants.map(nominee => (
              <div
                key={nominee.id}
                className="pixel-panel-night p-5 border-4 border-[#FF467A] flex flex-col justify-between shadow-[4px_4px_0_#14023A]"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-[#14023A] border-2 border-[#FF467A]">
                        <PixelAvatar
                          seed={nominee.avatarSeed}
                          size={64}
                          isBobbing={true}
                        />
                      </div>
                      <div>
                        <h4 className="font-arcade text-base text-[#FFF6E5] font-bold">
                          {nominee.name}
                        </h4>
                        <div className="my-1">
                          <TeamBadge team={nominee.team} size="sm" />
                        </div>
                        <div className="flex items-center gap-1 font-arcade text-xs text-[#FFD51E]">
                          <PixelCoin size={14} />
                          <span>{nominee.points} Points</span>
                        </div>
                      </div>
                    </div>

                    <span className="font-arcade text-[9px] px-2 py-1 bg-[#FF467A] text-[#14023A] font-bold">
                      IN DANGER
                    </span>
                  </div>

                  <p className="font-pixel text-xl text-[#FFF6E5]/80 italic my-2">
                    "{nominee.bio || 'Standing on the eviction block awaiting Big Boss decision.'}"
                  </p>
                </div>

                {/* Actions: SAVE vs EVICT */}
                <div className="pt-3 border-t-2 border-[#FF467A] flex gap-3 mt-4">
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_NOMINATION', contestantId: nominee.id })}
                    className="pixel-btn-yellow flex-1 py-2 text-xs font-bold"
                  >
                    SAVE CONTESTANT
                  </button>

                  <button
                    onClick={() => setEvictTarget(nominee)}
                    className="pixel-btn-pink flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <PixelSkull size={14} />
                    <span>EVICT NOW!</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {evictTarget && (
        <div className="fixed inset-0 z-50 bg-[#14023A]/85 flex items-center justify-center p-4">
          <div className="pixel-panel-pink max-w-md w-full p-6 text-center shadow-[8px_8px_0_#14023A]">
            <div className="inline-flex items-center gap-2 mb-2">
              <PixelSkull size={24} />
              <h3 className="font-arcade text-base text-[#FF467A]">
                EVICTION NOTICE
              </h3>
              <PixelSkull size={24} />
            </div>

            <p className="font-pixel text-2xl text-[#FFF6E5] my-4 leading-normal">
              Execute immediate eviction of <strong className="text-[#FFD51E]">{evictTarget.name}</strong> from the Tech House?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleExecuteEvict}
                className="pixel-btn-pink px-6 py-2.5 text-xs font-bold"
              >
                EXECUTE EVICTION ▶
              </button>
              <button
                onClick={() => setEvictTarget(null)}
                className="pixel-btn-violet px-4 py-2.5 text-xs"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
