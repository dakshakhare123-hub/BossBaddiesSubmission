import React from 'react';
import { TeamName } from '../../types';

interface TeamBadgeProps {
  team: TeamName;
  className?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export const TeamBadge: React.FC<TeamBadgeProps> = ({ team, className = '', size = 'md', style }) => {
  const getStyle = () => {
    switch (team) {
      case 'Frontend Falcons':
        // Yellow on Violet with Magenta border
        return 'bg-[#5003C0] text-[#FFD51E] border-2 border-[#AB03A9]';
      case 'Backend Bears':
        // Magenta on Off-White with Night border
        return 'bg-[#FFF6E5] text-[#AB03A9] border-2 border-[#14023A]';
      case 'DevOps Dragons':
        // Pink on Night with Yellow border
        return 'bg-[#14023A] text-[#FF467A] border-2 border-[#FFD51E]';
      case 'AI Aliens':
        // Yellow on Magenta with Night border
        return 'bg-[#AB03A9] text-[#FFD51E] border-2 border-[#14023A]';
      default:
        return 'bg-[#5003C0] text-[#FFF6E5] border-2 border-[#AB03A9]';
    }
  };

  const pad = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span
      className={`font-arcade tracking-wider inline-block font-bold select-none ${pad} ${getStyle()} ${className}`}
      style={{ imageRendering: 'pixelated', ...style }}
    >
      {team}
    </span>
  );
};
