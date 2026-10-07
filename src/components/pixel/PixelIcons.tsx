import React from 'react';

interface PixelIconProps {
  className?: string;
  size?: number;
}

// Pixel Crown: 12x12 grid
export const PixelCrown: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    {/* Base shadow */}
    <rect x="2" y="9" width="8" height="2" fill="#14023A" />
    <rect x="2" y="8" width="8" height="2" fill="#FFD51E" />
    {/* Crown band */}
    <rect x="3" y="9" width="6" height="1" fill="#AB03A9" />
    {/* Body */}
    <rect x="2" y="6" width="8" height="2" fill="#FFD51E" />
    {/* Spikes */}
    <rect x="2" y="4" width="2" height="2" fill="#FFD51E" />
    <rect x="5" y="3" width="2" height="3" fill="#FFD51E" />
    <rect x="8" y="4" width="2" height="2" fill="#FFD51E" />
    {/* Jewels */}
    <rect x="2" y="3" width="2" height="1" fill="#FF467A" />
    <rect x="5" y="2" width="2" height="1" fill="#FFF6E5" />
    <rect x="8" y="3" width="2" height="1" fill="#FF467A" />
  </svg>
);

// Pixel Shield: 12x12 grid
export const PixelShield: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    {/* Outline */}
    <rect x="2" y="1" width="8" height="1" fill="#14023A" />
    <rect x="1" y="2" width="10" height="4" fill="#14023A" />
    <rect x="2" y="6" width="8" height="2" fill="#14023A" />
    <rect x="3" y="8" width="6" height="2" fill="#14023A" />
    <rect x="4" y="10" width="4" height="1" fill="#14023A" />
    <rect x="5" y="11" width="2" height="1" fill="#14023A" />
    {/* Fill */}
    <rect x="2" y="2" width="8" height="4" fill="#AB03A9" />
    <rect x="3" y="6" width="6" height="2" fill="#AB03A9" />
    <rect x="4" y="8" width="4" height="2" fill="#AB03A9" />
    <rect x="5" y="10" width="2" height="1" fill="#AB03A9" />
    {/* Center Emblem (Sunshine Yellow) */}
    <rect x="5" y="3" width="2" height="5" fill="#FFD51E" />
    <rect x="4" y="4" width="4" height="2" fill="#FFD51E" />
  </svg>
);

// Pixel Skull: 12x12 grid (Danger/Nomination)
export const PixelSkull: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    {/* Skull Dome */}
    <rect x="3" y="1" width="6" height="1" fill="#14023A" />
    <rect x="2" y="2" width="8" height="6" fill="#14023A" />
    <rect x="3" y="2" width="6" height="5" fill="#FF467A" />
    {/* Forehead highlight */}
    <rect x="4" y="2" width="4" height="1" fill="#FFF6E5" />
    {/* Eye Sockets */}
    <rect x="3" y="5" width="2" height="2" fill="#14023A" />
    <rect x="7" y="5" width="2" height="2" fill="#14023A" />
    {/* Nose hole */}
    <rect x="5" y="6" width="2" height="1" fill="#14023A" />
    {/* Teeth Jaw */}
    <rect x="4" y="8" width="4" height="3" fill="#14023A" />
    <rect x="4" y="8" width="1" height="2" fill="#FFF6E5" />
    <rect x="6" y="8" width="1" height="2" fill="#FFF6E5" />
    <rect x="7" y="8" width="1" height="2" fill="#FFF6E5" />
  </svg>
);

// Pixel Heart: 12x12 grid
export const PixelHeart: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    <rect x="2" y="2" width="3" height="1" fill="#14023A" />
    <rect x="7" y="2" width="3" height="1" fill="#14023A" />
    <rect x="1" y="3" width="10" height="4" fill="#14023A" />
    <rect x="2" y="7" width="8" height="2" fill="#14023A" />
    <rect x="3" y="9" width="6" height="1" fill="#14023A" />
    <rect x="4" y="10" width="4" height="1" fill="#14023A" />
    <rect x="5" y="11" width="2" height="1" fill="#14023A" />
    {/* Fill */}
    <rect x="2" y="3" width="3" height="3" fill="#FF467A" />
    <rect x="7" y="3" width="3" height="3" fill="#FF467A" />
    <rect x="2" y="5" width="8" height="2" fill="#FF467A" />
    <rect x="3" y="7" width="6" height="2" fill="#FF467A" />
    <rect x="4" y="9" width="4" height="1" fill="#FF467A" />
    <rect x="5" y="10" width="2" height="1" fill="#FF467A" />
    {/* Highlight */}
    <rect x="3" y="3" width="1" height="1" fill="#FFF6E5" />
  </svg>
);

// Pixel Star: 12x12 grid
export const PixelStar: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    <rect x="5" y="1" width="2" height="10" fill="#14023A" />
    <rect x="1" y="5" width="10" height="2" fill="#14023A" />
    <rect x="3" y="3" width="6" height="6" fill="#14023A" />
    {/* Fill */}
    <rect x="5" y="2" width="2" height="8" fill="#FFD51E" />
    <rect x="2" y="5" width="8" height="2" fill="#FFD51E" />
    <rect x="4" y="4" width="4" height="4" fill="#FFD51E" />
    {/* Center highlight */}
    <rect x="5" y="5" width="2" height="2" fill="#FFF6E5" />
  </svg>
);

// Pixel Coin: 12x12 grid
export const PixelCoin: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    {/* Border */}
    <rect x="4" y="1" width="4" height="1" fill="#14023A" />
    <rect x="2" y="2" width="8" height="8" fill="#14023A" />
    <rect x="4" y="10" width="4" height="1" fill="#14023A" />
    {/* Fill */}
    <rect x="4" y="2" width="4" height="8" fill="#FFD51E" />
    <rect x="2" y="3" width="8" height="6" fill="#FFD51E" />
    {/* Inner Coin Symbol (P) */}
    <rect x="5" y="3" width="1" height="6" fill="#14023A" />
    <rect x="6" y="3" width="2" height="3" fill="#14023A" />
    <rect x="6" y="4" width="1" height="1" fill="#FFD51E" />
  </svg>
);

// Pixel Megaphone: 12x12 grid (Announcements)
export const PixelMegaphone: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    {/* Cone */}
    <rect x="1" y="4" width="3" height="4" fill="#5003C0" />
    <rect x="4" y="3" width="2" height="6" fill="#5003C0" />
    <rect x="6" y="2" width="2" height="8" fill="#5003C0" />
    <rect x="8" y="1" width="2" height="10" fill="#FFD51E" />
    {/* Outline */}
    <rect x="0" y="4" width="1" height="4" fill="#14023A" />
    <rect x="10" y="1" width="1" height="10" fill="#14023A" />
    {/* Handle */}
    <rect x="3" y="8" width="2" height="3" fill="#FF467A" />
    {/* Sound rays */}
    <rect x="11" y="3" width="1" height="1" fill="#FFD51E" />
    <rect x="11" y="5" width="1" height="2" fill="#FFD51E" />
    <rect x="11" y="8" width="1" height="1" fill="#FFD51E" />
  </svg>
);

// Pixel Hourglass: 12x12 grid (Timer)
export const PixelHourglass: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    {/* Top and Bottom Frames */}
    <rect x="2" y="1" width="8" height="2" fill="#14023A" />
    <rect x="3" y="1" width="6" height="1" fill="#FFD51E" />
    <rect x="2" y="9" width="8" height="2" fill="#14023A" />
    <rect x="3" y="10" width="6" height="1" fill="#FFD51E" />
    {/* Glass */}
    <rect x="2" y="3" width="8" height="1" fill="#FFF6E5" />
    <rect x="3" y="4" width="6" height="1" fill="#FFF6E5" />
    <rect x="4" y="5" width="4" height="2" fill="#FFF6E5" />
    <rect x="3" y="7" width="6" height="1" fill="#FFF6E5" />
    <rect x="2" y="8" width="8" height="1" fill="#FFF6E5" />
    {/* Sand */}
    <rect x="4" y="4" width="4" height="1" fill="#FF467A" />
    <rect x="5" y="5" width="2" height="2" fill="#FF467A" />
    <rect x="4" y="8" width="4" height="1" fill="#FF467A" />
  </svg>
);

// Pixel Trophy: 12x12 grid (Leaderboard)
export const PixelTrophy: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    {/* Cup */}
    <rect x="3" y="1" width="6" height="5" fill="#FFD51E" />
    <rect x="4" y="6" width="4" height="2" fill="#FFD51E" />
    {/* Handles */}
    <rect x="1" y="2" width="2" height="3" fill="#FFD51E" />
    <rect x="2" y="3" width="1" height="1" fill="#14023A" />
    <rect x="9" y="2" width="2" height="3" fill="#FFD51E" />
    <rect x="9" y="3" width="1" height="1" fill="#14023A" />
    {/* Stem & Base */}
    <rect x="5" y="8" width="2" height="2" fill="#14023A" />
    <rect x="3" y="10" width="6" height="2" fill="#FFD51E" />
    {/* Star inside cup */}
    <rect x="5" y="3" width="2" height="2" fill="#FFF6E5" />
  </svg>
);

// Pixel Swords: 12x12 grid (Quests / Challenges)
export const PixelSwords: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    <rect x="1" y="1" width="2" height="2" fill="#FF467A" />
    <rect x="9" y="1" width="2" height="2" fill="#FFD51E" />
    <rect x="3" y="3" width="2" height="2" fill="#FFF6E5" />
    <rect x="7" y="3" width="2" height="2" fill="#FFF6E5" />
    <rect x="5" y="5" width="2" height="2" fill="#14023A" />
    <rect x="3" y="7" width="2" height="2" fill="#FFF6E5" />
    <rect x="7" y="7" width="2" height="2" fill="#FFF6E5" />
    <rect x="1" y="9" width="2" height="2" fill="#FFD51E" />
    <rect x="9" y="9" width="2" height="2" fill="#FF467A" />
  </svg>
);

// Pixel Check: 12x12 grid
export const PixelCheck: React.FC<PixelIconProps> = ({ className = '', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    <rect x="9" y="2" width="2" height="2" fill="#FFD51E" />
    <rect x="8" y="4" width="2" height="2" fill="#FFD51E" />
    <rect x="7" y="6" width="2" height="2" fill="#FFD51E" />
    <rect x="6" y="8" width="2" height="2" fill="#FFD51E" />
    <rect x="4" y="7" width="2" height="2" fill="#FFD51E" />
    <rect x="2" y="5" width="2" height="2" fill="#FFD51E" />
  </svg>
);

// Pixel Plus: 12x12 grid
export const PixelPlus: React.FC<PixelIconProps> = ({ className = '', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    <rect x="5" y="2" width="2" height="8" fill="currentColor" />
    <rect x="2" y="5" width="8" height="2" fill="currentColor" />
  </svg>
);

// Pixel Minus: 12x12 grid
export const PixelMinus: React.FC<PixelIconProps> = ({ className = '', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    <rect x="2" y="5" width="8" height="2" fill="currentColor" />
  </svg>
);

// Pixel Arrow (Cursor): 10x10 grid
export const PixelArrow: React.FC<PixelIconProps> = ({ className = '', size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" className={`inline-block ${className}`} shapeRendering="crispEdges">
    <rect x="1" y="1" width="2" height="8" fill="currentColor" />
    <rect x="3" y="2" width="2" height="6" fill="currentColor" />
    <rect x="5" y="3" width="2" height="4" fill="currentColor" />
    <rect x="7" y="4" width="2" height="2" fill="currentColor" />
  </svg>
);

// Pixel User: 12x12 grid (Contestants menu icon)
export const PixelUser: React.FC<PixelIconProps> = ({ className = '', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className={`inline-block ${className}`} shapeRendering="crispEdges">
    {/* Head */}
    <rect x="4" y="1" width="4" height="4" fill="currentColor" />
    {/* Neck */}
    <rect x="5" y="5" width="2" height="1" fill="currentColor" />
    {/* Shoulders / Body */}
    <rect x="2" y="6" width="8" height="4" fill="currentColor" />
    {/* Outline / contrast */}
    <rect x="3" y="2" width="1" height="1" fill="#14023A" />
    <rect x="8" y="2" width="1" height="1" fill="#14023A" />
  </svg>
);

