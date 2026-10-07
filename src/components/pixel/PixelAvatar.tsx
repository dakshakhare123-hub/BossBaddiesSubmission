import React, { useMemo } from 'react';

interface PixelAvatarProps {
  seed: number | string;
  size?: number; // size in pixels, e.g. 48, 64, 96
  isBobbing?: boolean;
  isGrayscale?: boolean;
  isBigBoss?: boolean;
  className?: string;
}

// Strictly palette colors
const PALETTE = {
  NIGHT: '#14023A',
  OFF_WHITE: '#FFF6E5',
  VIOLET: '#5003C0',
  MAGENTA: '#AB03A9',
  PINK: '#FF467A',
  YELLOW: '#FFD51E',
  // Grayscale equivalents for evicted contestants
  GRAY_DARK: '#222228',
  GRAY_MID: '#555562',
  GRAY_LIGHT: '#8c8c99',
  GRAY_WHITE: '#d1d1db',
};

// Simple pseudo-random hash generator
function pseudoRandom(seedStr: string): () => number {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  let s = Math.abs(hash) + 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const PixelAvatar: React.FC<PixelAvatarProps> = ({
  seed,
  size = 48,
  isBobbing = false,
  isGrayscale = false,
  isBigBoss = false,
  className = '',
}) => {
  const grid = useMemo(() => {
    // 12x12 grid representation
    // Rows 0-11, Cols 0-11
    const pixels: string[][] = Array(12).fill(null).map(() => Array(12).fill(''));

    if (isBigBoss) {
      // Distinctive 16-bit Big Boss Eye / Terminal Visage
      for (let r = 0; r < 12; r++) {
        for (let c = 0; c < 12; c++) {
          // Dark CRT Monitor casing
          if (r === 0 || r === 11 || c === 0 || c === 11) {
            pixels[r][c] = PALETTE.NIGHT;
          } else if (r === 1 || r === 10 || c === 1 || c === 10) {
            pixels[r][c] = PALETTE.VIOLET;
          } else {
            // Monitor screen
            pixels[r][c] = PALETTE.NIGHT;
          }
        }
      }
      // Sinister Red/Hot Pink Cyclops Eye with Yellow iris & Magenta pupil
      pixels[4][4] = PALETTE.PINK;
      pixels[4][5] = PALETTE.PINK;
      pixels[4][6] = PALETTE.PINK;
      pixels[4][7] = PALETTE.PINK;

      pixels[5][3] = PALETTE.PINK;
      pixels[5][4] = PALETTE.YELLOW;
      pixels[5][5] = PALETTE.OFF_WHITE;
      pixels[5][6] = PALETTE.YELLOW;
      pixels[5][7] = PALETTE.YELLOW;
      pixels[5][8] = PALETTE.PINK;

      pixels[6][3] = PALETTE.PINK;
      pixels[6][4] = PALETTE.YELLOW;
      pixels[6][5] = PALETTE.MAGENTA;
      pixels[6][6] = PALETTE.MAGENTA;
      pixels[6][7] = PALETTE.YELLOW;
      pixels[6][8] = PALETTE.PINK;

      pixels[7][4] = PALETTE.PINK;
      pixels[7][5] = PALETTE.PINK;
      pixels[7][6] = PALETTE.PINK;
      pixels[7][7] = PALETTE.PINK;

      // Antenna / crown on top
      pixels[0][5] = PALETTE.YELLOW;
      pixels[0][6] = PALETTE.YELLOW;

      return pixels;
    }

    const rand = pseudoRandom(String(seed));

    // Color options
    const hairColors = isGrayscale 
      ? [PALETTE.GRAY_DARK, PALETTE.GRAY_MID, PALETTE.GRAY_LIGHT] 
      : [PALETTE.YELLOW, PALETTE.PINK, PALETTE.MAGENTA, PALETTE.OFF_WHITE, PALETTE.VIOLET];

    const skinColor = isGrayscale ? PALETTE.GRAY_LIGHT : PALETTE.OFF_WHITE;
    const eyeColor = isGrayscale ? PALETTE.GRAY_DARK : PALETTE.NIGHT;
    const glassesColor = isGrayscale ? PALETTE.GRAY_MID : (rand() > 0.5 ? PALETTE.YELLOW : PALETTE.PINK);
    const shirtColors = isGrayscale 
      ? [PALETTE.GRAY_MID, PALETTE.GRAY_DARK] 
      : [PALETTE.VIOLET, PALETTE.MAGENTA, PALETTE.PINK, PALETTE.YELLOW];

    const hairColor = hairColors[Math.floor(rand() * hairColors.length)];
    const shirtColor = shirtColors[Math.floor(rand() * shirtColors.length)];
    const hasGlasses = rand() > 0.6;
    const hairStyle = Math.floor(rand() * 4); // 0 = spiked, 1 = cap, 2 = curly/afro, 3 = bangs
    const hasBeard = rand() > 0.65;
    const accessory = Math.floor(rand() * 3); // 0 = none, 1 = headset, 2 = tie

    // 1. Fill Head & Face Base (symmetrical cols 3..8, rows 3..7)
    for (let r = 3; r <= 7; r++) {
      for (let c = 3; c <= 8; c++) {
        pixels[r][c] = skinColor;
      }
    }

    // 2. Hair based on style
    if (hairStyle === 0) {
      // Spikes
      for (let c = 2; c <= 9; c++) {
        pixels[2][c] = hairColor;
      }
      pixels[1][3] = hairColor;
      pixels[1][5] = hairColor;
      pixels[1][6] = hairColor;
      pixels[1][8] = hairColor;
      pixels[3][2] = hairColor;
      pixels[3][9] = hairColor;
    } else if (hairStyle === 1) {
      // Baseball cap / beanie
      for (let r = 1; r <= 3; r++) {
        for (let c = 2; c <= 9; c++) {
          pixels[r][c] = hairColor;
        }
      }
      // Cap visor
      pixels[3][10] = isGrayscale ? PALETTE.GRAY_DARK : PALETTE.MAGENTA;
      pixels[3][11] = isGrayscale ? PALETTE.GRAY_DARK : PALETTE.MAGENTA;
    } else if (hairStyle === 2) {
      // Big Afro / curls
      for (let r = 1; r <= 4; r++) {
        for (let c = 1; c <= 10; c++) {
          pixels[r][c] = hairColor;
        }
      }
      pixels[5][1] = hairColor;
      pixels[5][10] = hairColor;
      pixels[6][1] = hairColor;
      pixels[6][10] = hairColor;
    } else {
      // Classic bangs
      for (let c = 2; c <= 9; c++) {
        pixels[2][c] = hairColor;
      }
      pixels[3][2] = hairColor;
      pixels[3][9] = hairColor;
      pixels[3][3] = hairColor;
      pixels[3][8] = hairColor;
    }

    // 3. Eyes (cols 4 and 7, row 5)
    pixels[5][4] = eyeColor;
    pixels[5][7] = eyeColor;

    // 4. Glasses (if active)
    if (hasGlasses) {
      pixels[5][3] = glassesColor;
      pixels[5][4] = glassesColor;
      pixels[5][5] = glassesColor;
      pixels[5][6] = glassesColor;
      pixels[5][7] = glassesColor;
      pixels[5][8] = glassesColor;
      pixels[4][4] = glassesColor;
      pixels[4][7] = glassesColor;
    }

    // 5. Mouth or Beard
    if (hasBeard) {
      for (let c = 3; c <= 8; c++) {
        pixels[7][c] = hairColor;
      }
      pixels[6][3] = hairColor;
      pixels[6][8] = hairColor;
    } else {
      // Simple pixel mouth
      pixels[7][5] = isGrayscale ? PALETTE.GRAY_DARK : PALETTE.PINK;
      pixels[7][6] = isGrayscale ? PALETTE.GRAY_DARK : PALETTE.PINK;
    }

    // 6. Body & Shirt (rows 8..11, cols 2..9)
    for (let r = 8; r <= 11; r++) {
      for (let c = 2; c <= 9; c++) {
        pixels[r][c] = shirtColor;
      }
    }
    // Neck
    pixels[8][5] = skinColor;
    pixels[8][6] = skinColor;

    // 7. Accessory
    if (accessory === 1) {
      // Gamer Headset
      const hsColor = isGrayscale ? PALETTE.GRAY_WHITE : PALETTE.YELLOW;
      pixels[1][4] = hsColor;
      pixels[1][5] = hsColor;
      pixels[1][6] = hsColor;
      pixels[1][7] = hsColor;
      pixels[4][2] = hsColor;
      pixels[5][2] = hsColor;
      pixels[4][9] = hsColor;
      pixels[5][9] = hsColor;
      // Mic boom
      pixels[7][2] = hsColor;
      pixels[8][3] = hsColor;
    } else if (accessory === 2) {
      // Pixel Tie
      const tieColor = isGrayscale ? PALETTE.GRAY_DARK : PALETTE.YELLOW;
      pixels[9][5] = tieColor;
      pixels[9][6] = tieColor;
      pixels[10][5] = tieColor;
      pixels[10][6] = tieColor;
      pixels[11][5] = tieColor;
    }

    return pixels;
  }, [seed, isBigBoss, isGrayscale]);

  return (
    <div
      className={`inline-block ${isBobbing ? 'animate-sprite-bob' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
      }}
    >
      <svg
        viewBox="0 0 12 12"
        width={size}
        height={size}
        className="w-full h-full block"
        shapeRendering="crispEdges"
      >
        {/* Background container border */}
        <rect width="12" height="12" fill={isGrayscale ? PALETTE.GRAY_DARK : PALETTE.NIGHT} />
        {grid.map((row, r) =>
          row.map((color, c) =>
            color ? (
              <rect
                key={`${r}-${c}`}
                x={c}
                y={r}
                width="1"
                height="1"
                fill={color}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
};
