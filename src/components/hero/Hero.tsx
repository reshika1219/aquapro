'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  angle: number;
  speed: number;
  tailPhase: number;
  color: string;
  finColor: string;
  glowColor: string;
  size: number;
}

interface Tetra {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
  phase: number;
  offsetAngle: number;
  offsetDist: number;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  opacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Main animation loop inside canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse & Pointer target
    let mouse = { x: width * 0.5, y: height * 0.45, active: false };
    let idleTime = 0;

    // Main Betta Fish
    const betta: Fish = {
      x: width * 0.5,
      y: height * 0.5,
      vx: 0,
      vy: 0,
      targetX: width * 0.5,
      targetY: height * 0.45,
      angle: 0,
      speed: 0,
      tailPhase: 0,
      color: '#00d2ff',
      finColor: 'rgba(58, 227, 213, 0.45)',
      glowColor: 'rgba(0, 210, 255, 0.35)',
      size: 1.15,
    };

    // School of 7 companion Neon Tetras
    const tetras: Tetra[] = Array.from({ length: 7 }, (_, i) => ({
      x: betta.x + (Math.random() - 0.5) * 200,
      y: betta.y + (Math.random() - 0.5) * 200,
      vx: 0,
      vy: 0,
      angle: 0,
      speed: 2 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      offsetAngle: (i / 7) * Math.PI * 2,
      offsetDist: 50 + Math.random() * 80,
    }));

    // Ambient Bubbles
    const bubbles: Bubble[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 3,
      speed: 0.4 + Math.random() * 0.8,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmp: 10 + Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.4,
    }));

    // Interactive Ripples on click/touch
    const ripples: Ripple[] = [];

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mouse.x = clientX;
      mouse.y = clientY;
      mouse.active = true;
      idleTime = 0;
      setHasInteracted(true);
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      ripples.push({
        x: clientX,
        y: clientY,
        radius: 0,
        maxRadius: 100 + Math.random() * 60,
        alpha: 0.6,
      });
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mousedown', onPointerDown);

    let lastTime = performance.now();

    // Render loop
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle deep water lighting & ambient gradient
      const bgGrad = ctx.createRadialGradient(
        betta.x,
        betta.y,
        50,
        betta.x,
        betta.y,
        Math.max(width, height) * 0.7
      );
      bgGrad.addColorStop(0, 'rgba(16, 75, 74, 0.22)');
      bgGrad.addColorStop(0.5, 'rgba(8, 28, 27, 0.15)');
      bgGrad.addColorStop(1, 'rgba(6, 15, 14, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.05 + 1;
        r.alpha *= 0.95;
        if (r.alpha < 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(102, 197, 183, ${r.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 3. Ambient Bubbles
      bubbles.forEach(b => {
        b.y -= b.speed;
        b.x += Math.sin(time * 0.001 * b.wobbleSpeed + b.radius) * 0.4;
        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 224, 210, ${b.opacity})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.5})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });

      // 4. Update Betta target (cursor vs idle natural swimming path)
      idleTime += dt;
      if (!mouse.active || idleTime > 4) {
        // Natural Lissajous swimming figure when idle
        const t = time * 0.0006;
        betta.targetX = width * 0.5 + Math.sin(t) * (width * 0.3);
        betta.targetY = height * 0.5 + Math.sin(t * 2) * (height * 0.18);
      } else {
        betta.targetX = mouse.x;
        betta.targetY = mouse.y;
      }

      // Physics interpolation for Betta
      const dx = betta.targetX - betta.x;
      const dy = betta.targetY - betta.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const targetAngle = Math.atan2(dy, dx);
      let angleDiff = targetAngle - betta.angle;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      betta.angle += angleDiff * 0.06;

      const targetSpeed = Math.min(dist * 0.035, 4.5);
      betta.speed += (targetSpeed - betta.speed) * 0.08;

      betta.vx = Math.cos(betta.angle) * betta.speed;
      betta.vy = Math.sin(betta.angle) * betta.speed;
      betta.x += betta.vx;
      betta.y += betta.vy;

      betta.tailPhase += (0.15 + betta.speed * 0.08);

      // Draw Siamese Fighting Fish (Betta)
      ctx.save();
      ctx.translate(betta.x, betta.y);
      ctx.rotate(betta.angle);
      const s = betta.size;

      // Glow halo
      const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, 70 * s);
      glow.addColorStop(0, 'rgba(58, 227, 213, 0.35)');
      glow.addColorStop(1, 'rgba(58, 227, 213, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, 70 * s, 0, Math.PI * 2);
      ctx.fill();

      // Flowing Caudal Tail (Multi-segmented layered silk fin)
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const layerOffset = (layer - 1) * 0.18;
        ctx.moveTo(-18 * s, 0);

        const tailSegments = 6;
        for (let j = 1; j <= tailSegments; j++) {
          const segX = -18 * s - j * 14 * s;
          const wave = Math.sin(betta.tailPhase - j * 0.55 + layerOffset) * (j * 4.8 * s);
          const spread = Math.sin((j / tailSegments) * Math.PI) * (20 * s + layer * 6 * s);
          ctx.lineTo(segX, wave - spread * 0.5);
        }
        for (let j = tailSegments; j >= 1; j--) {
          const segX = -18 * s - j * 14 * s;
          const wave = Math.sin(betta.tailPhase - j * 0.55 + layerOffset) * (j * 4.8 * s);
          const spread = Math.sin((j / tailSegments) * Math.PI) * (20 * s + layer * 6 * s);
          ctx.lineTo(segX, wave + spread * 0.5);
        }
        ctx.closePath();

        const tailGrad = ctx.createLinearGradient(-18 * s, 0, -95 * s, 0);
        tailGrad.addColorStop(0, 'rgba(0, 210, 255, 0.7)');
        tailGrad.addColorStop(0.5, 'rgba(78, 224, 206, 0.5)');
        tailGrad.addColorStop(1, 'rgba(214, 164, 94, 0.15)');
        ctx.fillStyle = tailGrad;
        ctx.fill();
      }

      // Dorsal Fin (Top flowing fin)
      ctx.beginPath();
      ctx.moveTo(-6 * s, -6 * s);
      ctx.bezierCurveTo(
        -25 * s,
        -35 * s + Math.sin(betta.tailPhase * 0.8) * 6 * s,
        -55 * s,
        -32 * s,
        -28 * s,
        -4 * s
      );
      ctx.closePath();
      ctx.fillStyle = 'rgba(78, 224, 206, 0.4)';
      ctx.fill();

      // Ventral Fin (Bottom flowing fin)
      ctx.beginPath();
      ctx.moveTo(-2 * s, 6 * s);
      ctx.bezierCurveTo(
        -15 * s,
        28 * s + Math.sin(betta.tailPhase * 0.8 + 1) * 6 * s,
        -45 * s,
        25 * s,
        -22 * s,
        4 * s
      );
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 210, 255, 0.35)';
      ctx.fill();

      // Fish Body (Torpedo streamlined shape)
      ctx.beginPath();
      ctx.moveTo(22 * s, 0);
      ctx.bezierCurveTo(12 * s, -10 * s, -10 * s, -8 * s, -20 * s, 0);
      ctx.bezierCurveTo(-10 * s, 8 * s, 12 * s, 10 * s, 22 * s, 0);
      ctx.closePath();

      const bodyGrad = ctx.createLinearGradient(22 * s, 0, -20 * s, 0);
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.3, '#3ae3d5');
      bodyGrad.addColorStop(0.8, '#0b666a');
      bodyGrad.addColorStop(1, '#052928');
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Vibrant electric lateral line
      ctx.beginPath();
      ctx.moveTo(16 * s, -1 * s);
      ctx.quadraticCurveTo(0, -2 * s, -14 * s, 0);
      ctx.strokeStyle = 'rgba(155, 240, 230, 0.9)';
      ctx.lineWidth = 1.8 * s;
      ctx.stroke();

      // Eye
      ctx.beginPath();
      ctx.arc(14 * s, -3.5 * s, 2.2 * s, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(14.5 * s, -3.5 * s, 1.2 * s, 0, Math.PI * 2);
      ctx.fillStyle = '#0a1a18';
      ctx.fill();

      ctx.restore();

      // 5. School of Neon Tetras following in a natural formation
      tetras.forEach((tetra, i) => {
        const formationX = betta.x + Math.cos(betta.angle + tetra.offsetAngle) * tetra.offsetDist;
        const formationY = betta.y + Math.sin(betta.angle + tetra.offsetAngle) * tetra.offsetDist;

        const tdx = formationX - tetra.x;
        const tdy = formationY - tetra.y;
        tetra.angle = Math.atan2(tdy, tdx);
        tetra.x += tdx * 0.05 + Math.cos(time * 0.002 + tetra.phase) * 0.6;
        tetra.y += tdy * 0.05 + Math.sin(time * 0.002 + tetra.phase) * 0.6;

        ctx.save();
        ctx.translate(tetra.x, tetra.y);
        ctx.rotate(tetra.angle);

        // Tetra Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 9, 3.2, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#0d2b29';
        ctx.fill();

        // Neon Blue Glow Stripe
        ctx.beginPath();
        ctx.moveTo(7, -0.8);
        ctx.lineTo(-6, -0.8);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Neon Red Stripe
        ctx.beginPath();
        ctx.moveTo(-1, 1);
        ctx.lineTo(-7, 1);
        ctx.strokeStyle = '#ff3366';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Little Tail
        ctx.beginPath();
        ctx.moveTo(-7, 0);
        ctx.lineTo(-12, -3.5 + Math.sin(time * 0.01 + i) * 1.5);
        ctx.lineTo(-12, 3.5 + Math.sin(time * 0.01 + i) * 1.5);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchstart', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={containerRef} aria-label="Aqua Pro">

      {/* Interactive Aquatic Canvas */}
      <canvas ref={canvasRef} className={styles.aquariumCanvas} />

      {/* Foreground Minimalist Hero Content */}
      <div className={styles.heroContent}>
        <div className="container">
          <div className={styles.centerBox}>

            {/* Micro Tag */}
            <span className={styles.tagline}>
              Living Aquarium Studio · Sri Lanka
            </span>

            {/* Bold Minimalist Title */}
            <h1 className={styles.brandTitle}>
              AQUA PRO
            </h1>

            {/* Short 1-sentence poetic subhead */}
            <p className={styles.punchline}>
              Quarantined livestock, precision equipment, and custom nature aquascapes.
            </p>

            {/* Minimalist Tactile Action Links */}
            <div className={styles.actions}>
              <Link href="/shop" className={styles.btnPrimary} id="hero-btn-shop">
                Explore Catalog
              </Link>
              <Link href="/services" className={styles.btnGhost} id="hero-btn-services">
                Custom Builds
              </Link>
              <Link href="/store" className={styles.btnText} id="hero-btn-store">
                Visit Showroom →
              </Link>
            </div>

            {/* Interactive Cursor Guide Hint */}
            <div className={`${styles.guideHint} ${hasInteracted ? styles.guideHintFaded : ''}`}>
              <span className={styles.guideDot} />
              <span>Move cursor to guide the fish</span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
