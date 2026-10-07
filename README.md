# BIG BOSS COMMAND CENTER: Tech House Pixel Edition

A vibrant 16-bit retro pixel-art arcade command dashboard for the "Big Boss" to run a reality-show-style house of tech contestants.

## Features
- **16-Bit Pixel Aesthetic**: Hard edges, 4px chunky borders, offset drop shadows (`4px 4px 0 #14023A`), scanline overlay toggle, and strictly enforced 6-color palette.
- **Deterministic 12x12 Pixel Avatars**: Procedurally generated unique pixel sprites seeded by contestant ID with stepped idle bobbing animation.
- **Synthesized 8-Bit Web Audio**: Browser Web Audio square-wave sound effects for point changes, nominations, immunity, announcements, evictions, timer sirens, and button clicks (no audio files).
- **Contestant Management**: Roster of 10 initial hackers across 4 teams (Frontend Falcons, Backend Bears, DevOps Dragons, AI Aliens). Custom points with reasons, Captaincy crown, Immunity shield, Eviction block nominations, and full evictions.
- **Arcade High-Score Leaderboard**: Live re-sorting table with 1st place crown, top-3 medals, and proportional pixel progress bars.
- **Quest Board (Tasks)**: Create, assign (to individual or Whole House), track, and complete missions with automatic points disbursement and pixel confetti celebration.
- **Danger Zone**: Stepped pulsing eviction block with nominee countdown, "Save" action, and "Evict Now" execution.
- **Mission Timer**: Arcade MM:SS countdown timer running across all screens with color-shifting urgency (White > Yellow > Blinking Pink) and "TIME'S UP!" alarm.
- **Big Boss Mic & PA System**: Compose broadcasts with retro RPG typewriter dialogue box, Big Boss avatar, and optional SpeechSynthesis voice.
- **Telemetry & Statistics**: Full house metrics, points distribution, quest completion rates, and an authentic pixel bar chart for team squad points.
- **Evicted Hall**: Graveyard of monochrome eliminated contestants with a "Bring back" restoration feature.
- **Activity Log**: Timestamped slide-out drawer logging every house action.
- **Local Persistence & Reset House**: Automatically saves state to `localStorage` with a 1-click "Reset House" to restore seed data.

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```
