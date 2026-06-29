import { useRef, useEffect, useCallback } from 'react';
import { useLowEndDevice } from '@/hooks/use-low-end-device';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  colorIdx: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const WAVE_AMPLITUDE = 80;
const WAVE_FREQUENCY = 0.003;
const WAVE_SPEED = 0.8;
const LAYER_COUNT = 4;
const LAYER_COUNT_LOW = 2;
const PARTICLE_BASE_SIZE = 1.2;
const POINT_COUNT_HIGH = 10000;
const POINT_COUNT_LOW = 2500;
const POINT_COUNT_MOBILE = 500;
const POINT_COUNT_IOS = 200;
const MOUSE_RADIUS = 120;
const MOUSE_RADIUS_MOBILE = 60;
const MOUSE_STRENGTH = 0.3;
const COLORS = ['rgba(255,255,255,', 'rgba(197,184,165,'];
const TARGET_FPS = 30;
const TARGET_FPS_MOBILE = 15;

export default function ParticleCanvas() {
  const { isLowEnd, isMobile, isiOS, prefersReducedMotion } = useLowEndDevice();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const burstParticlesRef = useRef<BurstParticle[]>([]);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const lastFrameTimeRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    let count = POINT_COUNT_HIGH;
    if (prefersReducedMotion) count = 0;
    else if (isiOS) count = POINT_COUNT_IOS;
    else if (isMobile) count = POINT_COUNT_MOBILE;
    else if (isLowEnd) count = POINT_COUNT_LOW;
    const cols = Math.ceil(Math.sqrt(count * (width / height)));
    const rows = Math.ceil(count / cols);
    const xSpacing = width / cols;
    const ySpacing = height / rows;

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * xSpacing + xSpacing / 2;
      const y = row * ySpacing + ySpacing / 2;
      particles.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: 0, vy: 0,
        size: PARTICLE_BASE_SIZE,
        alpha: 0.5,
        colorIdx: 0,
      });
    }
    particlesRef.current = particles;
    return { cols, rows, xSpacing, ySpacing };
  }, [isLowEnd, prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let grid = initParticles(window.innerWidth, window.innerHeight);

    const frameInterval = 1000 / (isMobile || isiOS ? TARGET_FPS_MOBILE : TARGET_FPS);

    const resize = () => {
      const dpr = prefersReducedMotion ? 1 : (isMobile || isiOS) ? 1 : Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      grid = initParticles(window.innerWidth, window.innerHeight);
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    const handleClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const burstCount = isiOS ? 5 : isMobile ? 8 : isLowEnd ? 15 : 50;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.3;
        const speed = 1 + Math.random() * 3;
        burstParticlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 2,
          maxLife: 2,
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', resize);

    const animate = (timestamp: number) => {
      if (isLowEnd || prefersReducedMotion) {
        const elapsed = timestamp - lastFrameTimeRef.current;
        if (elapsed < frameInterval) {
          animFrameRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);
      }

      const time = performance.now() * 0.001;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mouse = mouseRef.current;

      const layers = isLowEnd || prefersReducedMotion ? LAYER_COUNT_LOW : LAYER_COUNT;

      ctx.clearRect(0, 0, w, h);

      const { cols, xSpacing, ySpacing } = grid;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * xSpacing + xSpacing / 2;
        const y = row * ySpacing + ySpacing / 2;

        let waveY = 0;
        let sizeMultiplier = 0;

        for (let l = 0; l < layers; l++) {
          const freq = WAVE_FREQUENCY * (l * 0.6 + 1);
          const amp = WAVE_AMPLITUDE * (l * 0.4 + 1);
          const phase = time * WAVE_SPEED * (l * 0.2 + 1) + y * 0.005;
          const wave = Math.sin(x * freq + phase) * Math.cos(y * freq * 0.5 + phase * 0.7);
          waveY += wave * amp;
          sizeMultiplier += wave;
        }

        let py = y + waveY - WAVE_AMPLITUDE;
        let px = x + Math.sin(time * 0.2 + y * 0.01) * 30;

        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const distSq = dx * dx + dy * dy;
          const mouseRadius = isMobile || isiOS ? MOUSE_RADIUS_MOBILE : MOUSE_RADIUS;
          if (distSq < mouseRadius * mouseRadius && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouseRadius) * MOUSE_STRENGTH;
            px -= (dx / dist) * force * 10;
            py -= (dy / dist) * force * 10;
          }
        }

        const size = PARTICLE_BASE_SIZE + (sizeMultiplier / layers) * 0.5 + 0.5;
        const alpha = 0.3 + ((sizeMultiplier + layers) / (layers * 2)) * 0.7;
        const colorIdx = Math.abs(Math.floor(sizeMultiplier * 0.5)) % COLORS.length;

        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fillStyle = COLORS[colorIdx] + Math.min(1, Math.max(0.1, alpha)) + ')';
        ctx.fill();
      }

      const bursts = burstParticlesRef.current;
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life -= 0.016;
        b.vx *= 0.98;
        b.vy *= 0.98;

        if (b.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        const lifeRatio = b.life / b.maxLife;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * lifeRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,184,165,${lifeRatio * 0.8})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resize);
    };
  }, [initParticles, isLowEnd, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      aria-label="Generative particle wave field"
      role="img"
    />
  );
}
