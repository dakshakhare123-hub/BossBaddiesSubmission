import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Contestant } from '../../types';
import { PixelAvatar } from '../pixel/PixelAvatar';
import { TeamBadge } from '../common/TeamBadge';
import { PixelSkull } from '../pixel/PixelIcons';

export const EvictedHallScreen: React.FC = () => {
  const { evictedContestants, dispatch } = useGame();
  const [restoreTarget, setRestoreTarget] = useState<Contestant | null>(null);

  const handleExecuteRestore = () => {
    if (!restoreTarget) return;
    dispatch({ type: 'RESTORE_CONTESTANT', contestantId: restoreTarget.id });
    setRestoreTarget(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pixel-panel-magenta p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PixelSkull size={20} />
            <span className="font-arcade text-xs text-[#FF467A]">THE TECH GRAVEYARD</span>
          </div>
          <h2 className="font-arcade text-xl sm:text-2xl text-[#FFF6E5]">
            EVICTED HALL
          </h2>
          <p className="font-pixel text-xl text-[#FFF6E5]/80">
            Contestants eliminated from the Tech House. Sprites rendered in 16-bit monochrome memory.
          </p>
        </div>

        <div className="bg-[#14023A] border-2 border-[#FF467A] px-3 py-1.5 font-arcade text-xs text-[#FF467A] text-center shrink-0">
          EVICTED COUNT: {evictedContestants.length}
        </div>
      </div>

      {/* Evicted List */}
      {evictedContestants.length === 0 ? (
        <div className="pixel-panel p-16 text-center">
          <PixelSkull size={48} className="mx-auto mb-3 opacity-40 text-[#FF467A]" />
          <h3 className="font-arcade text-lg text-[#FFF6E5] mb-2">
            The Graveyard is empty!
          </h3>
          <p className="font-pixel text-2xl text-[#FFD51E]">
            No contestants have been eliminated yet. All 10 original hackers are still coding.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {evictedContestants.map(evictee => (
            <div
              key={evictee.id}
              className="pixel-panel-night p-5 border-4 border-[#14023A] opacity-90 flex flex-col justify-between shadow-[4px_4px_0_#14023A]"
            >
              <div>
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-1 bg-[#14023A] border-2 border-[#FFF6E5]/30 shrink-0">
                    <PixelAvatar
                      seed={evictee.avatarSeed}
                      size={64}
                      isGrayscale={true}
                      isBobbing={false}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="font-arcade text-[9px] px-1.5 py-0.5 bg-[#FF467A] text-[#14023A] font-bold inline-block mb-1">
                      EVICTED ON DAY {evictee.evictedAtDay || 1}
                    </span>
                    <h3 className="font-arcade text-base text-[#FFF6E5] truncate font-bold">
                      {evictee.name}
                    </h3>
                    <div className="my-1">
                      <TeamBadge team={evictee.team} size="sm" />
                    </div>
                    <span className="font-pixel text-xl text-[#FFD51E]">
                      Final Score: {evictee.points} PTS
                    </span>
                  </div>
                </div>

                <p className="font-pixel text-xl text-[#FFF6E5]/60 italic mb-4">
                  "{evictee.bio || 'Exited the Tech House after elimination.'}"
                </p>
              </div>

              {/* Bring back button */}
              <div className="pt-3 border-t-2 border-[#5003C0]">
                <button
                  onClick={() => setRestoreTarget(evictee)}
                  className="pixel-btn-yellow w-full py-2 text-xs flex items-center justify-center gap-2"
                >
                  <span>BRING BACK TO HOUSE ↺</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal for Restore */}
      {restoreTarget && (
        <div className="fixed inset-0 z-50 bg-[#14023A]/85 flex items-center justify-center p-4">
          <div className="pixel-panel-yellow max-w-md w-full p-6 text-center shadow-[8px_8px_0_#14023A]">
            <h3 className="font-arcade text-base text-[#FFD51E] mb-2">
              REVIVE CONTESTANT?
            </h3>
            <p className="font-pixel text-2xl text-[#FFF6E5] my-4 leading-normal">
              Restore <strong className="text-[#FFD51E]">{restoreTarget.name}</strong> from the evicted graveyard back to active status?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleExecuteRestore}
                className="pixel-btn-yellow px-6 py-2.5 text-xs font-bold"
              >
                YES, REVIVE HACKER ▶
              </button>
              <button
                onClick={() => setRestoreTarget(null)}
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
