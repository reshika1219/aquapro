'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Fish {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  direction: number; // 1 = right, -1 = left
  wobble: number;
  wobbleSpeed: number;
  depth: number; // 0-1, affects speed and opacity
  tailPhase: number;
  color: string;
}

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobble: number;
}

const FISH_COLORS = [
  'rgba(144, 224, 239, OPACITY)',  // ice
  'rgba(72, 202, 228, OPACITY)',   // cyan
  'rgba(0, 180, 216, OPACITY)',    // aqua
  'rgba(200, 220, 240, OPACITY)',  // silver
  'rgba(100, 180, 220, OPACITY)',  // steel blue
];

function createFish(canvasWidth: number, canvasHeight: number): Fish {
  const depth = 0.3 + Math.random() * 0.7;
  const direction = Math.random() > 0.5 ? 1 : -1;
  return {
    x: direction === 1 ? -60 : canvasWidth + 60,
    y: canvasHeight * (0.15 + Math.random() * 0.7),
    speed: (0.3 + Math.random() * 0.6) * depth,
    size: 18 + Math.random() * 22 * depth,
    opacity: 0.15 + depth * 0.35,
    direction,
    wobble: 0,
    wobbleSpeed: 0.01 + Math.random() * 0.02,
    depth,
    tailPhase: Math.random() * Math.PI * 2,
    color: FISH_COLORS[Math.floor(Math.random() * FISH_COLORS.length)],
  };
}

function createBubble(canvasWidth: number, canvasHeight: number): Bubble {
  return {
    x: Math.random() * canvasWidth,
    y: canvasHeight + 10,
    size: 1 + Math.random() * 3,
    speed: 0.2 + Math.random() * 0.5,
    opacity: 0.1 + Math.random() * 0.2,
    wobble: Math.random() * Math.PI * 2,
  };
}

function drawFish(ctx: CanvasRenderingContext2D, fish: Fish, time: number) {
  const { x, y, size, direction, tailPhase, color, opacity } = fish;
  const tailWag = Math.sin(time * 3 + tailPhase) * 0.3;
  const bodyWobble = Math.sin(time * 1.5 + tailPhase) * 2;

  ctx.save();
  ctx.translate(x, y + bodyWobble);
  ctx.scale(direction, 1);

  const resolvedColor = color.replace('OPACITY', String(opacity));

  // Body (ellipse)
  ctx.beginPath();
  ctx.ellipse(0, 0, size, size * 0.38, 0, 0, Math.PI * 2);
  ctx.fillStyle = resolvedColor;
  ctx.fill();

  // Tail
  ctx.beginPath();
  ctx.moveTo(-size * 0.8, 0);
  ctx.quadraticCurveTo(
    -size * 1.3,
    -size * 0.4 + tailWag * size * 0.5,
    -size * 1.5,
    -size * 0.35 + tailWag * size * 0.4
  );
  ctx.quadraticCurveTo(-size * 1.1, tailWag * size * 0.2, -size * 0.8, 0);
  ctx.quadraticCurveTo(
    -size * 1.1,
    tailWag * size * 0.2,
    -size * 1.5,
    size * 0.35 + tailWag * size * 0.4
  );
  ctx.quadraticCurveTo(
    -size * 1.3,
    size * 0.4 + tailWag * size * 0.5,
    -size * 0.8,
    0
  );
  ctx.fillStyle = resolvedColor;
  ctx.fill();

  // Dorsal fin
  ctx.beginPath();
  ctx.moveTo(size * 0.1, -size * 0.35);
  ctx.quadraticCurveTo(-size * 0.1, -size * 0.65, -size * 0.4, -size * 0.4);
  ctx.lineTo(-size * 0.2, -size * 0.3);
  ctx.fillStyle = color.replace('OPACITY', String(opacity * 0.7));
  ctx.fill();

  // Eye
  ctx.beginPath();
  ctx.arc(size * 0.55, -size * 0.05, size * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(size * 0.57, -size * 0.05, size * 0.04, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(10, 22, 40, ${opacity * 0.9})`;
  ctx.fill();

  ctx.restore();
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const fishRef = useRef<Fish[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    // Determine fish count based on viewport
    const isMobile = rect.width < 768;
    const fishCount = isMobile ? 3 : 5;

    // Initialize fish
    fishRef.current = [];
    for (let i = 0; i < fishCount; i++) {
      const fish = createFish(rect.width, rect.height);
      // Spread initial positions across the canvas
      fish.x = Math.random() * rect.width;
      fishRef.current.push(fish);
    }

    // Initialize bubbles
    bubblesRef.current = [];
    const bubbleCount = isMobile ? 8 : 15;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = createBubble(rect.width, rect.height);
      bubble.y = Math.random() * rect.height;
      bubblesRef.current.push(bubble);
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    timeRef.current += 0.016;
    const time = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Draw and update bubbles
    bubblesRef.current.forEach((bubble, i) => {
      bubble.y -= bubble.speed;
      bubble.wobble += 0.02;
      const bx = bubble.x + Math.sin(bubble.wobble) * 15;

      if (bubble.y < -10) {
        bubblesRef.current[i] = createBubble(w, h);
        return;
      }

      ctx.beginPath();
      ctx.arc(bx, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(144, 224, 239, ${bubble.opacity})`;
      ctx.fill();
    });

    // Draw and update fish
    fishRef.current.forEach((fish, i) => {
      // Mouse interaction — gentle avoidance
      const dx = mouseRef.current.x - fish.x;
      const dy = mouseRef.current.y - fish.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150 * 0.5;
        fish.y -= (dy / dist) * force;
        fish.x -= (dx / dist) * force;
      }

      // Move fish
      fish.x += fish.speed * fish.direction;
      fish.wobble += fish.wobbleSpeed;
      fish.y += Math.sin(fish.wobble) * 0.3;

      // Reset fish when off screen
      const margin = 80;
      if (fish.direction === 1 && fish.x > w + margin) {
        fishRef.current[i] = createFish(w, h);
      } else if (fish.direction === -1 && fish.x < -margin) {
        fishRef.current[i] = createFish(w, h);
      }

      drawFish(ctx, fish, time);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    init();
    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [init, animate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
