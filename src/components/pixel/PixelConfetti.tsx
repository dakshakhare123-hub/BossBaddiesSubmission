import React, { useEffect, useRef } from 'react';

interface PixelConfettiProps {
  onComplete?: () => void;
  durationMs?: number;
}

const CONFETTI_COLORS = [
  '#FFD51E', // Sunshine Yellow
  '#FF467A', // Hot Pink
  '#AB03A9', // Magenta
  '#5003C0', // Royal Violet
  '#FFF6E5', // Off-White
];

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  gravity: number;
}

export const PixelConfetti: React.FC<PixelConfettiProps> = ({
  onComplete,
  durationMs = 2500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate chunky pixel particles
    const particleCount = 75;
    const particles: Particle[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.35;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      particles.push({
        x: centerX + (Math.random() - 0.5) * 120,
        y: centerY + (Math.random() - 0.5) * 40,
        size: Math.floor(Math.random() * 4 + 6), // 6px - 10px square chunks
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        gravity: 0.28,
      });
    }

    let animationFrameId: number;
    let startTime = Date.now();
    let lastStepTime = startTime;

    const render = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed > durationMs) {
        if (onComplete) onComplete();
        return;
      }

      // Stepped frame update (20 FPS arcade feel)
      if (now - lastStepTime >= 40) {
        lastStepTime = now;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          // Render as hard-edged square pixel
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [durationMs, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
