import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { PixelStar, PixelCoin } from '../pixel/PixelIcons';
import { PixelConfetti } from '../pixel/PixelConfetti';

export const QuestCompleteBanner: React.FC = () => {
  const { state, dispatch } = useGame();
  const banner = state.questCompleteBanner;

  useEffect(() => {
    if (!banner) return;
    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_QUEST_BANNER' });
    }, 4000);
    return () => clearTimeout(timer);
  }, [banner, dispatch]);

  if (!banner) return null;

  return (
    <>
      <PixelConfetti onComplete={() => {}} durationMs={3500} />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md pointer-events-auto">
        <div className="pixel-panel-yellow p-4 text-center shadow-[6px_6px_0_#14023A] animate-bounce">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PixelStar size={20} />
            <span className="font-arcade text-sm sm:text-base text-[#FFD51E]">
              ★ QUEST COMPLETE! ★
            </span>
            <PixelStar size={20} />
          </div>

          <h3 className="font-arcade text-xs text-[#FFF6E5] truncate mb-2">
            {banner.title}
          </h3>

          <div className="inline-flex items-center gap-2 bg-[#14023A] border-2 border-[#FFD51E] px-3 py-1">
            <span className="font-pixel text-xl text-[#FFF6E5]">
              REWARD:
            </span>
            <div className="flex items-center gap-1 font-arcade text-xs text-[#FFD51E]">
              <PixelCoin size={14} />
              +{banner.points} PTS
            </div>
            <span className="font-pixel text-lg text-[#FFF6E5]/80">
              → {banner.assignedName}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
