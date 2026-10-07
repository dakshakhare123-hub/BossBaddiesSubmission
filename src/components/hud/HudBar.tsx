import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import {
  PixelCrown,
  PixelHourglass
} from '../pixel/PixelIcons';
import { PixelAvatar } from '../pixel/PixelAvatar';

interface HudBarProps {
  onOpenLog: () => void;
}

export const HudBar: React.FC<HudBarProps> = ({ onOpenLog }) => {
  const { state, dispatch, houseCaptain } = useGame();
  const [clockTime, setClockTime] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#14023A] border-b-4 border-[#AB03A9] shadow-[0_4px_0_#14023A] px-3 sm:px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Logo & Live Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'HOME' })}>
              <div className="w-8 h-8 bg-[#5003C0] border-2 border-[#FFD51E] flex items-center justify-center">
                <PixelAvatar seed={999} size={28} isBigBoss={true} />
              </div>
              <div>
                <h1 className="font-arcade text-xs sm:text-sm text-[#FFD51E] tracking-tight leading-none">
                  BIG BOSS
                </h1>
                <span className="font-arcade text-[9px] text-[#FF467A] block mt-0.5">
                  COMMAND CENTER
                </span>
              </div>
            </div>

            {/* LIVE blinker */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-[#5003C0] border border-[#FF467A]">
              <span className="w-2.5 h-2.5 bg-[#FF467A] animate-blink-live inline-block" />
              <span className="font-arcade text-[10px] text-[#FF467A] tracking-wider">LIVE</span>
            </div>

            {/* DAY Counter */}
            <div className="flex items-center gap-1 bg-[#5003C0] border-2 border-[#14023A] px-2 py-1">
              <span className="font-arcade text-xs text-[#FFF6E5]">
                DAY {state.day.toString().padStart(2, '0')}
              </span>
              <button
                onClick={() => dispatch({ type: 'NEXT_DAY' })}
                className="font-arcade text-[9px] px-1.5 py-0.5 bg-[#FFD51E] text-[#14023A] hover:bg-[#ffe054] ml-1 border border-[#14023A]"
                title="Advance to next day"
              >
                +1 ▶
              </button>
            </div>
          </div>

          {/* Middle: Live Clock & Captain mini badge & Timer widget */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live real-time clock */}
            <div className="hidden lg:flex items-center font-arcade text-xs text-[#FFF6E5]/80 bg-[#14023A] px-2 py-1 border border-[#5003C0]">
              <span>{clockTime || '00:00:00'}</span>
            </div>

            {/* Mini Captain Badge */}
            {houseCaptain ? (
              <div
                onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'HOME' })}
                className="cursor-pointer flex items-center gap-1.5 px-2 py-1 bg-[#5003C0] border-2 border-[#FFD51E] shadow-[2px_2px_0_#14023A]"
                title={`Current House Captain: ${houseCaptain.name}`}
              >
                <PixelCrown size={14} />
                <span className="font-arcade text-[10px] text-[#FFD51E] truncate max-w-[100px] sm:max-w-none">
                  {houseCaptain.name}
                </span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[#5003C0]/40 border border-[#FFF6E5]/30 text-[#FFF6E5]/60 font-arcade text-[9px]">
                NO CAPTAIN
              </div>
            )}

            {/* Persistent Mini Timer Widget */}
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'TIMER' })}
              className={`flex items-center gap-1.5 px-2 py-1 border-2 border-[#14023A] shadow-[2px_2px_0_#14023A] ${
                state.timer.remainingSeconds <= 10 && state.timer.isRunning
                  ? 'bg-[#FF467A] text-[#14023A] animate-pulse'
                  : state.timer.remainingSeconds <= 30 && state.timer.isRunning
                  ? 'bg-[#FFD51E] text-[#14023A]'
                  : state.timer.isRunning
                  ? 'bg-[#AB03A9] text-[#FFF6E5]'
                  : 'bg-[#5003C0] text-[#FFF6E5]'
              }`}
              title="Click to open Timer screen"
            >
              <PixelHourglass size={14} />
              <span className="font-arcade text-[11px]">
                {formatTimer(state.timer.remainingSeconds)}
              </span>
              {state.timer.isRunning && (
                <span className="w-1.5 h-1.5 bg-[#FFD51E] animate-ping ml-0.5 inline-block" />
              )}
            </button>
          </div>

          {/* Right: Controls & Log */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* CRT Toggle */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SCANLINES' })}
              className={`font-arcade text-[9px] px-2 py-1 border border-[#14023A] hidden md:inline-block ${
                state.scanlines
                  ? 'bg-[#5003C0] text-[#FFD51E]'
                  : 'bg-[#14023A] text-[#FFF6E5]/60'
              }`}
              title="Toggle CRT Scanline Overlay"
            >
              CRT: {state.scanlines ? 'ON' : 'OFF'}
            </button>

            {/* Audio Mute */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_MUTE' })}
              className={`font-arcade text-[9px] px-2 py-1 border border-[#14023A] ${
                state.muted
                  ? 'bg-[#FF467A] text-[#14023A]'
                  : 'bg-[#5003C0] text-[#FFF6E5]'
              }`}
              title={state.muted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            >
              SFX: {state.muted ? 'MUTED' : 'ON'}
            </button>

            {/* Activity Log Drawer Button */}
            <button
              onClick={onOpenLog}
              className="font-arcade text-[10px] px-2.5 py-1 bg-[#FFD51E] text-[#14023A] hover:bg-[#ffe054] border-2 border-[#14023A] shadow-[2px_2px_0_#14023A]"
            >
              LOG
            </button>

            {/* Reset House Button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="font-arcade text-[9px] px-2 py-1 bg-[#14023A] text-[#FF467A] hover:bg-[#FF467A] hover:text-[#14023A] border border-[#FF467A]"
              title="Reset House to initial state"
            >
              RESET
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation modal for Reset House */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-[#14023A]/80 flex items-center justify-center p-4">
          <div className="pixel-panel-pink max-w-sm w-full p-5 text-center shadow-[6px_6px_0_#14023A]">
            <h3 className="font-arcade text-sm text-[#FF467A] mb-3">
              RESET TECH HOUSE?
            </h3>
            <p className="font-pixel text-xl text-[#FFF6E5] mb-5">
              This will restore all 10 contestants, tasks, points, and captaincy back to Day 1 initial seed data.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  dispatch({ type: 'RESET_HOUSE' });
                  setShowResetConfirm(false);
                }}
                className="pixel-btn-pink px-4 py-2 text-xs"
              >
                YES, RESET
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="pixel-btn-violet px-4 py-2 text-xs"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
