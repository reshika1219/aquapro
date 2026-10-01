'use client';

import { useEffect, useRef, useState } from 'react';
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
  finPhase: number;
  size: number;
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

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
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

    // Single Majestic Betta Fish
    const betta: Fish = {
      x: width * 0.5,
      y: height * 0.48,
      vx: 0,
      vy: 0,
      targetX: width * 0.5,
      targetY: height * 0.45,
      angle: 0,
      speed: 0,
      tailPhase: 0,
      finPhase: 0,
      size: 1.35,
    };

    // Ambient Bubbles
    const bubbles: Bubble[] = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 2.8,
      speed: 0.35 + Math.random() * 0.75,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmp: 8 + Math.random() * 16,
      opacity: 0.15 + Math.random() * 0.35,
    }));

    // Floating Luminous Micro-Particles (Phytoplankton / aquatic spores)
    const particles: Particle[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.75 + Math.random() * 1.8,
      baseRadius: 0.75 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.1 - Math.random() * 0.3,
      alpha: 0.12 + Math.random() * 0.38,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.025,
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
        maxRadius: 110 + Math.random() * 60,
        alpha: 0.55,
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

      // 1. Natural Water Surface Caustic Shimmer (Soft liquid horizon at top)
      const surfaceGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
      surfaceGrad.addColorStop(0, 'rgba(94, 234, 212, 0.12)');
      surfaceGrad.addColorStop(0.2, 'rgba(45, 212, 191, 0.06)');
      surfaceGrad.addColorStop(0.6, 'rgba(20, 88, 85, 0.02)');
      surfaceGrad.addColorStop(1, 'rgba(4, 12, 11, 0)');

      ctx.fillStyle = surfaceGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const step = 20;
      for (let x = 0; x <= width; x += step) {
        const waveY =
          Math.sin(x * 0.005 + time * 0.0008) * 14 +
          Math.cos(x * 0.011 - time * 0.0006) * 8 +
          height * 0.16;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();

      // Secondary soft refractive wave crest
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width; x += step) {
        const waveY =
          Math.sin(x * 0.007 - time * 0.0007 + 1.5) * 10 +
          Math.sin(x * 0.015 + time * 0.0009) * 5 +
          height * 0.08;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(125, 211, 252, 0.06)';
      ctx.fill();

      // 2. Dynamic Underwater Radial Lighting around the Fish
      const fishAura = ctx.createRadialGradient(
        betta.x,
        betta.y,
        30,
        betta.x,
        betta.y,
        Math.max(width, height) * 0.55
      );
      fishAura.addColorStop(0, 'rgba(20, 88, 85, 0.28)');
      fishAura.addColorStop(0.4, 'rgba(10, 42, 40, 0.16)');
      fishAura.addColorStop(1, 'rgba(4, 12, 11, 0)');
      ctx.fillStyle = fishAura;
      ctx.fillRect(0, 0, width, height);

      // 3. Floating Luminous Micro-Particles (Soft drifting aquatic spores)
      particles.forEach(p => {
        p.x += p.vx + Math.sin(time * 0.0008 + p.pulsePhase) * 0.25;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const pulse = 1 + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.35;
        const currentAlpha = p.alpha * (0.7 + pulse * 0.3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 236, 222, ${currentAlpha})`;
        ctx.fill();
      });

      // 4. Ambient Rising Bubbles
      bubbles.forEach(b => {
        b.y -= b.speed;
        b.x += Math.sin(time * 0.001 * b.wobbleSpeed + b.radius) * 0.35;
        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 243, 235, ${b.opacity})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.6})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      });

      // 5. Interactive Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.045 + 1;
        r.alpha *= 0.955;
        if (r.alpha < 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(94, 234, 212, ${r.alpha * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 6. Update Betta Position & Kinematics
      idleTime += dt;
      if (!mouse.active || idleTime > 3.5) {
        // Natural Lissajous figure-eight swimming motion when idle
        const t = time * 0.00055;
        betta.targetX = width * 0.5 + Math.sin(t) * (width * 0.28);
        betta.targetY = height * 0.48 + Math.sin(t * 2) * (height * 0.16);
      } else {
        betta.targetX = mouse.x;
        betta.targetY = mouse.y;
      }

      const dx = betta.targetX - betta.x;
      const dy = betta.targetY - betta.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const targetAngle = Math.atan2(dy, dx);
      let angleDiff = targetAngle - betta.angle;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      betta.angle += angleDiff * 0.055;

      const targetSpeed = Math.min(dist * 0.03, 4.0);
      betta.speed += (targetSpeed - betta.speed) * 0.075;

      betta.vx = Math.cos(betta.angle) * betta.speed;
      betta.vy = Math.sin(betta.angle) * betta.speed;
      betta.x += betta.vx;
      betta.y += betta.vy;

      betta.tailPhase += 0.12 + betta.speed * 0.07;
      betta.finPhase += 0.09 + betta.speed * 0.05;

      // 7. Draw The Single Majestic Betta Fish
      ctx.save();
      ctx.translate(betta.x, betta.y);
      ctx.rotate(betta.angle);
      const s = betta.size;

      // Soft Bioluminescent Halo
      const glow = ctx.createRadialGradient(0, 0, 12 * s, 0, 0, 95 * s);
      glow.addColorStop(0, 'rgba(45, 212, 191, 0.38)');
      glow.addColorStop(0.5, 'rgba(14, 165, 233, 0.18)');
      glow.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, 95 * s, 0, Math.PI * 2);
      ctx.fill();

      // Long Flowing Ventral Ribbon Fins (Underbelly trailing silk)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-2 * s, 6 * s);
      const ventralWave1 = Math.sin(betta.finPhase + 0.8) * 8 * s;
      const ventralWave2 = Math.sin(betta.finPhase + 1.6) * 14 * s;
      ctx.bezierCurveTo(-18 * s, 26 * s + ventralWave1, -48 * s, 42 * s + ventralWave2, -68 * s, 32 * s);
      ctx.bezierCurveTo(-42 * s, 24 * s, -14 * s, 12 * s, -2 * s, 6 * s);
      ctx.closePath();
      const ventralGrad = ctx.createLinearGradient(-2 * s, 6 * s, -68 * s, 32 * s);
      ventralGrad.addColorStop(0, 'rgba(45, 212, 191, 0.55)');
      ventralGrad.addColorStop(0.6, 'rgba(14, 165, 233, 0.35)');
      ventralGrad.addColorStop(1, 'rgba(245, 158, 11, 0.12)');
      ctx.fillStyle = ventralGrad;
      ctx.fill();
      ctx.restore();

      // Flowing Dorsal Fin (Top royal crest fin)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-6 * s, -7 * s);
      const dorsalWave1 = Math.sin(betta.finPhase) * 7 * s;
      const dorsalWave2 = Math.sin(betta.finPhase + 0.9) * 10 * s;
      ctx.bezierCurveTo(-26 * s, -42 * s + dorsalWave1, -62 * s, -40 * s + dorsalWave2, -42 * s, -5 * s);
      ctx.closePath();
      const dorsalGrad = ctx.createLinearGradient(-6 * s, -7 * s, -55 * s, -35 * s);
      dorsalGrad.addColorStop(0, 'rgba(56, 189, 248, 0.65)');
      dorsalGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.45)');
      dorsalGrad.addColorStop(1, 'rgba(251, 191, 36, 0.15)');
      ctx.fillStyle = dorsalGrad;
      ctx.fill();

      // Dorsal Fin Delicate Ray Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 0.8 * s;
      for (let r = 0; r < 4; r++) {
        ctx.beginPath();
        ctx.moveTo(-10 * s - r * 6 * s, -6 * s);
        ctx.quadraticCurveTo(-24 * s - r * 8 * s, -26 * s + dorsalWave1 * 0.7, -32 * s - r * 5 * s, -20 * s);
        ctx.stroke();
      }
      ctx.restore();

      // Voluminous Multi-layered Halfmoon Caudal Tail
      const tailLayers = [
        { offset: -0.22, spreadMult: 1.15, alphaMult: 0.55, colorA: 'rgba(14, 165, 233, 0.7)', colorB: 'rgba(45, 212, 191, 0.4)', colorC: 'rgba(251, 191, 36, 0.18)' },
        { offset: 0, spreadMult: 1.0, alphaMult: 0.75, colorA: 'rgba(45, 212, 191, 0.8)', colorB: 'rgba(56, 189, 248, 0.55)', colorC: 'rgba(244, 114, 182, 0.18)' },
        { offset: 0.22, spreadMult: 0.88, alphaMult: 0.6, colorA: 'rgba(125, 211, 252, 0.65)', colorB: 'rgba(20, 184, 166, 0.45)', colorC: 'rgba(251, 191, 36, 0.15)' },
      ];

      tailLayers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(-18 * s, 0);

        const segments = 7;
        for (let j = 1; j <= segments; j++) {
          const segX = -18 * s - j * 16 * s;
          const wave = Math.sin(betta.tailPhase - j * 0.52 + layer.offset) * (j * 5.2 * s);
          const spread = Math.sin((j / segments) * Math.PI) * (26 * s * layer.spreadMult);
          ctx.lineTo(segX, wave - spread);
        }
        for (let j = segments; j >= 1; j--) {
          const segX = -18 * s - j * 16 * s;
          const wave = Math.sin(betta.tailPhase - j * 0.52 + layer.offset) * (j * 5.2 * s);
          const spread = Math.sin((j / segments) * Math.PI) * (26 * s * layer.spreadMult);
          ctx.lineTo(segX, wave + spread);
        }
        ctx.closePath();

        const tailGrad = ctx.createLinearGradient(-18 * s, 0, -125 * s, 0);
        tailGrad.addColorStop(0, layer.colorA);
        tailGrad.addColorStop(0.55, layer.colorB);
        tailGrad.addColorStop(1, layer.colorC);
        ctx.fillStyle = tailGrad;
        ctx.fill();
      });

      // Tail Fin Ray Strands (Silky fine lines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 0.9 * s;
      for (let ray = -3; ray <= 3; ray++) {
        ctx.beginPath();
        ctx.moveTo(-18 * s, ray * 1.5 * s);
        const wave = Math.sin(betta.tailPhase - 2.5) * (18 * s);
        ctx.quadraticCurveTo(-60 * s, ray * 14 * s + wave * 0.6, -110 * s, ray * 22 * s + wave);
        ctx.stroke();
      }

      // Fish Body (Silky streamlined organic torso)
      ctx.beginPath();
      ctx.moveTo(24 * s, 0);
      ctx.bezierCurveTo(14 * s, -11 * s, -10 * s, -9 * s, -20 * s, 0);
      ctx.bezierCurveTo(-10 * s, 9 * s, 14 * s, 11 * s, 24 * s, 0);
      ctx.closePath();

      const bodyGrad = ctx.createLinearGradient(24 * s, 0, -20 * s, 0);
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.2, '#5eead4');
      bodyGrad.addColorStop(0.5, '#0d9488');
      bodyGrad.addColorStop(0.85, '#0f4f4d');
      bodyGrad.addColorStop(1, '#072423');
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Iridescent Scale Sheen Highlight along Spine
      ctx.beginPath();
      ctx.moveTo(18 * s, -1.2 * s);
      ctx.quadraticCurveTo(2 * s, -2.5 * s, -14 * s, 0);
      ctx.strokeStyle = 'rgba(204, 251, 241, 0.95)';
      ctx.lineWidth = 2.2 * s;
      ctx.stroke();

      // Operculum (Gill cover line)
      ctx.beginPath();
      ctx.arc(8 * s, 0, 7 * s, -Math.PI * 0.35, Math.PI * 0.35);
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.55)';
      ctx.lineWidth = 1.2 * s;
      ctx.stroke();

      // Fluttering Pectoral Fin (Side fin near gills)
      ctx.save();
      ctx.translate(6 * s, 3 * s);
      const pectFlutter = Math.sin(time * 0.008) * 0.4;
      ctx.rotate(0.35 + pectFlutter);
      ctx.beginPath();
      ctx.ellipse(0, 7 * s, 3.2 * s, 9 * s, -0.25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(94, 234, 212, 0.45)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 0.7 * s;
      ctx.stroke();
      ctx.restore();

      // Eye
      ctx.beginPath();
      ctx.arc(16 * s, -3.8 * s, 2.5 * s, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(16.6 * s, -3.8 * s, 1.4 * s, 0, Math.PI * 2);
      ctx.fillStyle = '#061615';
      ctx.fill();
      // Eye Reflection catchlight
      ctx.beginPath();
      ctx.arc(17.3 * s, -4.3 * s, 0.6 * s, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();

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
              Est. 2014 · Galnewa, Sri Lanka
            </span>

            {/* Calm, Poetic Title */}
            <h1 className={styles.brandTitle}>
              Living art in calm water.
            </h1>

            {/* Short 1-sentence calm subhead */}
            <p className={styles.punchline}>
              Quarantine-certified fish, Japanese nature aquascapes, and rimless ultra-clear glass.
            </p>

            {/* Minimalist Tactile Action Links */}
            <div className={styles.actions}>
              <Link href="/shop" className={styles.btnPrimary} id="hero-btn-shop">
                Explore Collection
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
              <span>Guide the fish with your cursor</span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
