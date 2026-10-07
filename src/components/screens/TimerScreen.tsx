import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import {
  PixelHourglass,
  PixelMegaphone
} from '../pixel/PixelIcons';

export const TimerScreen: React.FC = () => {
  const { state, dispatch } = useGame();
  const timer = state.timer;

  const [inputMinutes, setInputMinutes] = useState('03');
  const [inputSeconds, setInputSeconds] = useState('00');
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetDuration = (m: number, s: number) => {
    const total = m * 60 + s;
    setInputMinutes(m.toString().padStart(2, '0'));
    setInputSeconds(s.toString().padStart(2, '0'));
    dispatch({ type: 'RESET_TIMER', seconds: total });
  };

  const handleCustomSet = (e: React.FormEvent) => {
    e.preventDefault();
    const m = Math.max(0, parseInt(inputMinutes, 10) || 0);
    const s = Math.max(0, Math.min(59, parseInt(inputSeconds, 10) || 0));
    const total = m * 60 + s;
    if (total <= 0) return;
    dispatch({ type: 'RESET_TIMER', seconds: total });
  };

  // Color dynamic
  const getTimerColorClass = () => {
    if (timer.remainingSeconds === 0) {
      return 'text-[#FF467A] animate-bounce';
    }
    if (timer.remainingSeconds <= 10 && timer.isRunning) {
      return 'text-[#FF467A] animate-pulse';
    }
    if (timer.remainingSeconds <= 30 && timer.isRunning) {
      return 'text-[#FFD51E]';
    }
    return 'text-[#FFF6E5]';
  };

  // Progress percentage
  const percentRemaining = timer.initialSeconds > 0
    ? Math.max(0, (timer.remainingSeconds / timer.initialSeconds) * 100)
    : 0;

  const activeTasks = state.tasks.filter(t => t.status !== 'Completed');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pixel-panel-magenta p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PixelHourglass size={20} />
            <span className="font-arcade text-xs text-[#FFD51E]">COUNTDOWN TIMER</span>
          </div>
          <h2 className="font-arcade text-xl sm:text-2xl text-[#FFF6E5]">
            TASK & MISSION TIMER
          </h2>
          <p className="font-pixel text-xl text-[#FFF6E5]/80">
            Keep hackers accountable. When the timer hits 00:00, the house alarm sounds!
          </p>
        </div>

        <div className="bg-[#14023A] border-2 border-[#FFD51E] px-3 py-1 font-arcade text-xs text-[#FFD51E]">
          STATUS: {timer.isRunning ? 'RUNNING ▶' : timer.remainingSeconds === 0 ? "TIME'S UP!" : 'IDLE'}
        </div>
      </div>

      {/* Main Arcade Timer Display */}
      <div className="pixel-panel p-6 sm:p-10 text-center relative overflow-hidden">
        {/* TIME'S UP Arcade Banner */}
        {timer.remainingSeconds === 0 && (
          <div className="mb-4 inline-block bg-[#FF467A] text-[#14023A] font-arcade text-sm sm:text-lg px-4 py-1.5 border-4 border-[#14023A] animate-bounce">
            ★ TIME'S UP! DROP YOUR KEYBOARDS! ★
          </div>
        )}

        {/* Large Clock Display */}
        <div className="my-6">
          <div
            className={`font-arcade text-5xl sm:text-7xl md:text-8xl tracking-widest inline-block select-none ${getTimerColorClass()}`}
            style={{ textShadow: '4px 4px 0 #14023A' }}
          >
            {formatTime(timer.remainingSeconds)}
          </div>
        </div>

        {/* Segmented Pixel Progress Bar */}
        <div className="max-w-xl mx-auto mb-8 bg-[#14023A] border-4 border-[#14023A] p-1">
          <div className="flex h-5 gap-1">
            {Array.from({ length: 20 }).map((_, idx) => {
              const segThreshold = (idx + 1) * 5; // each segment represents 5%
              const isFilled = percentRemaining >= segThreshold;
              const segColor =
                timer.remainingSeconds <= 10
                  ? 'bg-[#FF467A]'
                  : timer.remainingSeconds <= 30
                  ? 'bg-[#FFD51E]'
                  : 'bg-[#AB03A9]';

              return (
                <div
                  key={idx}
                  className={`flex-1 transition-all ${isFilled ? segColor : 'bg-[#5003C0]/40'}`}
                />
              );
            })}
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {!timer.isRunning ? (
            <button
              onClick={() => {
                if (timer.remainingSeconds === 0) {
                  dispatch({ type: 'START_TIMER', seconds: 180 });
                } else {
                  dispatch({ type: 'RESUME_TIMER' });
                }
              }}
              className="pixel-btn-yellow px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold"
            >
              START TIMER ▶
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: 'PAUSE_TIMER' })}
              className="pixel-btn-pink px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold"
            >
              PAUSE ❚❚
            </button>
          )}

          <button
            onClick={() => dispatch({ type: 'RESET_TIMER' })}
            className="pixel-btn-violet px-6 py-3 text-xs sm:text-sm font-bold"
          >
            RESET ↺
          </button>
        </div>
      </div>

      {/* Timer Presets & Setup Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Presets */}
        <div className="pixel-panel p-5">
          <h3 className="font-arcade text-xs text-[#FFD51E] mb-3">
            QUICK PRESETS:
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSetDuration(0, 30)}
              className="pixel-btn-violet py-2 text-[10px]"
            >
              30 SEC
            </button>
            <button
              onClick={() => handleSetDuration(1, 0)}
              className="pixel-btn-violet py-2 text-[10px]"
            >
              1 MIN
            </button>
            <button
              onClick={() => handleSetDuration(2, 0)}
              className="pixel-btn-violet py-2 text-[10px]"
            >
              2 MIN
            </button>
            <button
              onClick={() => handleSetDuration(3, 0)}
              className="pixel-btn-violet py-2 text-[10px]"
            >
              3 MIN
            </button>
            <button
              onClick={() => handleSetDuration(5, 0)}
              className="pixel-btn-violet py-2 text-[10px]"
            >
              5 MIN
            </button>
            <button
              onClick={() => handleSetDuration(10, 0)}
              className="pixel-btn-violet py-2 text-[10px]"
            >
              10 MIN
            </button>
          </div>
        </div>

        {/* Custom Duration & Linked Task */}
        <div className="pixel-panel p-5">
          <h3 className="font-arcade text-xs text-[#FFD51E] mb-3">
            CUSTOM DURATION:
          </h3>
          <form onSubmit={handleCustomSet} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="font-arcade text-[9px] text-[#FFF6E5] block mb-1">
                  MINUTES:
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={inputMinutes}
                  onChange={(e) => setInputMinutes(e.target.value)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#AB03A9] px-3 py-1 font-pixel text-2xl"
                />
              </div>
              <span className="font-arcade text-2xl text-[#FFD51E] self-end mb-1">:</span>
              <div className="flex-1">
                <label className="font-arcade text-[9px] text-[#FFF6E5] block mb-1">
                  SECONDS:
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={inputSeconds}
                  onChange={(e) => setInputSeconds(e.target.value)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#AB03A9] px-3 py-1 font-pixel text-2xl"
                />
              </div>
            </div>

            {/* Optional Task Link */}
            <div>
              <label className="font-arcade text-[9px] text-[#FFF6E5] block mb-1">
                LINK TO ACTIVE QUEST:
              </label>
              <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#AB03A9] px-2 py-1.5 font-pixel text-lg"
              >
                <option value="">-- No specific quest linked --</option>
                {activeTasks.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.assignedTo})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="pixel-btn-magenta w-full py-2 text-xs"
            >
              SET DURATION ▶
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
