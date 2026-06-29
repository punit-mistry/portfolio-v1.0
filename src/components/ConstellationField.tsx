import { useRef, useEffect, useCallback } from 'react';
import { useLowEndDevice } from '@/hooks/use-low-end-device';

interface ConstellationParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const PARTICLE_COUNT_HIGH = 80;
const PARTICLE_COUNT_LOW = 30;
const PARTICLE_COUNT_MOBILE = 10;
const CONNECTION_DIST = 100;
const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
const MOUSE_GRAVITY_RADIUS = 150;
const MOUSE_GRAVITY_STRENGTH = 0.02;
const TARGET_FPS = 30;

export default function ConstellationField() {
  const { isLowEnd, isMobile, isiOS, prefersReducedMotion } = useLowEndDevice();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<ConstellationParticle[]>([]);
  const lastFrameTimeRef = useRef<number>(0);
  const frameInterval = 1000 / TARGET_FPS;

  const initParticles = useCallback((width: number, height: number) => {
    let count = PARTICLE_COUNT_HIGH;
    if (prefersReducedMotion) count = 0;
    else if (isiOS) count = 0;
    else if (isMobile) count = PARTICLE_COUNT_MOBILE;
    else if (isLowEnd) count = PARTICLE_COUNT_LOW;
    const particles: ConstellationParticle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: 2 + Math.random() * 2,
        color: Math.random() > 0.5
          ? 'rgba(255,255,255,0.6)'
          : 'rgba(197,184,165,0.5)',
      });
    }
    particlesRef.current = particles;
  }, [isLowEnd, prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const section = canvas.parentElement;
    if (!section) return;

    let width = section.offsetWidth;
    let height = section.offsetHeight;

    const resize = () => {
      width = section.offsetWidth;
      height = section.offsetHeight;
      const dpr = isLowEnd || prefersReducedMotion ? 1 : Math.min(window.devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    initParticles(width, height);

    const observer = new ResizeObserver(resize);
    observer.observe(section);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = (timestamp: number) => {
      if (isLowEnd || prefersReducedMotion) {
        const elapsed = timestamp - lastFrameTimeRef.current;
        if (elapsed < frameInterval) {
          animFrameRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);
      }

      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_GRAVITY_RADIUS * MOUSE_GRAVITY_RADIUS && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / MOUSE_GRAVITY_RADIUS) * MOUSE_GRAVITY_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= 0.995;
        p.vy *= 0.995;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      if (!prefersReducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONNECTION_DIST_SQ) {
              const dist = Math.sqrt(distSq);
              const alpha = (1 - dist / CONNECTION_DIST) * 0.08;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    let isVisible = false;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          isVisible = true;
          animFrameRef.current = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0.1 }
    );
    visibilityObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      visibilityObserver.disconnect();
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
      aria-label="Interactive constellation particle field"
      role="img"
    />
  );
}
