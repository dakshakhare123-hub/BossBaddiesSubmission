import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { LogCategory } from '../../types';

interface ActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ActivityDrawer: React.FC<ActivityDrawerProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useGame();
  const [filter, setFilter] = useState<LogCategory | 'all'>('all');

  if (!isOpen) return null;

  const filteredLogs = state.activityLog.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const getCategoryColor = (cat: LogCategory) => {
    switch (cat) {
      case 'points':
        return 'text-[#FFD51E]';
      case 'nomination':
        return 'text-[#FF467A]';
      case 'immunity':
        return 'text-[#FFD51E]';
      case 'captain':
        return 'text-[#FFD51E]';
      case 'eviction':
        return 'text-[#FF467A]';
      case 'quest':
        return 'text-[#FFF6E5]';
      case 'announcement':
        return 'text-[#AB03A9]';
      default:
        return 'text-[#FFF6E5]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#14023A]/70 select-none">
      <div className="w-full max-w-md h-full bg-[#5003C0] border-l-4 border-[#14023A] shadow-[-6px_0_0_#14023A] flex flex-col">
        {/* Drawer Header */}
        <div className="p-4 bg-[#14023A] border-b-4 border-[#AB03A9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-arcade text-sm text-[#FFD51E]">ACTIVITY LOG</span>
            <span className="font-arcade text-[10px] px-1.5 py-0.5 bg-[#AB03A9] text-[#FFF6E5]">
              {state.activityLog.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch({ type: 'CLEAR_ACTIVITY_LOG' })}
              className="font-arcade text-[10px] px-2 py-1 bg-[#5003C0] text-[#FFF6E5] hover:bg-[#FF467A] hover:text-[#14023A] border border-[#14023A]"
              title="Clear Log"
            >
              CLEAR
            </button>
            <button
              onClick={onClose}
              className="font-arcade text-xs px-2.5 py-1 bg-[#FF467A] text-[#14023A] hover:bg-[#ffd51e] border border-[#14023A]"
              aria-label="Close Activity Log"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-3 bg-[#5003C0] border-b-2 border-[#14023A] flex flex-wrap gap-1">
          {(['all', 'points', 'nomination', 'immunity', 'captain', 'eviction', 'quest', 'announcement'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-arcade text-[9px] px-2 py-1 border border-[#14023A] transition-colors ${
                filter === cat
                  ? 'bg-[#FFD51E] text-[#14023A] font-bold'
                  : 'bg-[#14023A] text-[#FFF6E5] hover:bg-[#AB03A9]'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Log Entries List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-[#FFF6E5]/70 font-pixel text-xl">
              No log entries recorded yet.
            </div>
          ) : (
            filteredLogs.map(item => (
              <div
                key={item.id}
                className="p-2.5 bg-[#14023A] border-2 border-[#AB03A9] shadow-[2px_2px_0_#5003C0]"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-arcade text-[10px] font-bold ${getCategoryColor(item.category)}`}>
                    [{item.action}]
                  </span>
                  <span className="font-pixel text-sm text-[#FFF6E5]/60">
                    Day {item.day} · {item.timestamp}
                  </span>
                </div>
                <p className="font-pixel text-lg text-[#FFF6E5] leading-snug">
                  {item.details}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
