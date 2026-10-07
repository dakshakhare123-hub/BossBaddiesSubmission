import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { PixelAvatar } from '../pixel/PixelAvatar';
import { PixelMegaphone } from '../pixel/PixelIcons';

export const DialogueBanner: React.FC = () => {
  const { state, dispatch } = useGame();
  const announcement = state.activeAnnouncement;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!announcement) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    const fullText = announcement.message;
    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex += 2; // quick typewriter speed
      if (charIndex >= fullText.length) {
        setDisplayedText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(fullText.slice(0, charIndex));
      }
    }, 25);

    // Auto-dismiss after 8 seconds
    const dismissTimer = setTimeout(() => {
      dispatch({ type: 'DISMISS_ACTIVE_ANNOUNCEMENT' });
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(dismissTimer);
    };
  }, [announcement, dispatch]);

  if (!announcement) return null;

  const getTypeBadge = () => {
    switch (announcement.type) {
      case 'Warning':
        return 'bg-[#FF467A] text-[#14023A]';
      case 'Twist':
        return 'bg-[#FFD51E] text-[#14023A]';
      case 'Eviction Notice':
        return 'bg-[#FF467A] text-[#14023A] animate-pulse';
      case 'Info':
      default:
        return 'bg-[#AB03A9] text-[#FFF6E5]';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-24 md:right-24 z-40">
      <div className="pixel-panel-yellow p-4 md:p-5 relative shadow-[6px_6px_0_#14023A]">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b-2 border-[#14023A] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <PixelMegaphone size={18} />
            <span className="font-arcade text-xs text-[#FFD51E]">BIG BOSS TRANSMISSION</span>
            <span className={`font-arcade text-[10px] px-2 py-0.5 border border-[#14023A] ${getTypeBadge()}`}>
              {announcement.type.toUpperCase()}
            </span>
            <span className="font-pixel text-base text-[#FFF6E5]/70 hidden sm:inline">
              · {announcement.timestamp}
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: 'DISMISS_ACTIVE_ANNOUNCEMENT' })}
            className="font-arcade text-[10px] px-2 py-1 bg-[#14023A] text-[#FFF6E5] hover:bg-[#FF467A] hover:text-[#14023A] border border-[#FFD51E]"
            aria-label="Dismiss Announcement"
          >
            [X] ESC
          </button>
        </div>

        {/* Content body with Big Boss Avatar & typewriter text */}
        <div className="flex items-start gap-4">
          <div className="shrink-0 border-2 border-[#FFD51E] bg-[#14023A] p-1">
            <PixelAvatar seed={999} size={56} isBigBoss={true} isBobbing={true} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-pixel text-xl sm:text-2xl text-[#FFF6E5] leading-snug tracking-wide">
              {displayedText}
              {isTyping && <span className="inline-block w-2.5 h-5 bg-[#FFD51E] ml-1 align-middle animate-pulse" />}
            </p>
          </div>

          {/* Blinking prompt */}
          {!isTyping && (
            <div className="shrink-0 self-end">
              <span className="font-arcade text-base text-[#FFD51E] animate-bounce">
                ▼
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
