import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { PixelAvatar } from '../pixel/PixelAvatar';
import { PixelSkull } from '../pixel/PixelIcons';

export const EvictionOverlay: React.FC = () => {
  const { state, dispatch } = useGame();
  const eviction = state.evictionOverlay;

  useEffect(() => {
    if (!eviction) return;

    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_EVICTION_OVERLAY' });
    }, 4500);

    return () => clearTimeout(timer);
  }, [eviction, dispatch]);

  if (!eviction) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#14023A]/90 flex items-center justify-center p-4 select-none">
      <div className="pixel-panel-pink max-w-lg w-full p-6 text-center animate-shake relative shadow-[8px_8px_0_#14023A]">
        <div className="inline-flex items-center justify-center gap-2 mb-3 bg-[#14023A] px-4 py-1 border-2 border-[#FF467A]">
          <PixelSkull size={24} />
          <h2 className="font-arcade text-lg sm:text-xl text-[#FF467A] tracking-wider">
            GAME OVER · EVICTED
          </h2>
          <PixelSkull size={24} />
        </div>

        <div className="my-6 flex justify-center">
          <div className="border-4 border-[#14023A] bg-[#14023A] p-2 inline-block shadow-[4px_4px_0_#14023A]">
            <PixelAvatar
              seed={eviction.contestant.avatarSeed}
              size={112}
              isGrayscale={true}
              isBobbing={false}
            />
          </div>
        </div>

        <h3 className="font-arcade text-xl sm:text-2xl text-[#FFF6E5] mb-2">
          {eviction.contestant.name}
        </h3>
        <p className="font-pixel text-2xl text-[#FFD51E] mb-4">
          TEAM: {eviction.contestant.team.toUpperCase()}
        </p>

        <div className="bg-[#14023A] border-2 border-[#AB03A9] p-3 mb-6">
          <p className="font-pixel text-xl text-[#FFF6E5]">
            "Pack your IDE and commit your final changes. You have been eliminated from the Tech House."
          </p>
        </div>

        <button
          onClick={() => dispatch({ type: 'CLEAR_EVICTION_OVERLAY' })}
          className="pixel-btn-pink px-6 py-2.5 text-xs font-arcade"
        >
          CONTINUE GAME ▶
        </button>
      </div>
    </div>
  );
};
