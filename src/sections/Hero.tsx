import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleCanvas from '@/components/ParticleCanvas';
import { useLowEndDevice } from '@/hooks/use-low-end-device';

interface HeroProps {
  onNavigate: (target: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { isLowEnd, prefersReducedMotion } = useLowEndDevice();
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const delay = isLowEnd || prefersReducedMotion ? 0.1 : 0.5;
    const tl = gsap.timeline({ delay });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll('.char');
      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
      }, '-=0.3');
    }

    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.2');

    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    if (svgPathRef.current && !(isLowEnd || prefersReducedMotion)) {
      const length = svgPathRef.current.getTotalLength();
      gsap.set(svgPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      tl.to(svgPathRef.current, {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'power2.inOut',
      }, 0.1);
    }

    tl.to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 0.5,
    }, '-=1');

    const handleScroll = () => {
      if (window.scrollY > 200 && scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const name = 'Punit Mistry';
  const nameChars = name.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        display: char === ' ' ? 'inline' : 'inline-block',
        width: char === ' ' ? '0.3em' : 'auto',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* Particle Canvas Background */}
      <ParticleCanvas />

      {/* SVG Decorative Path */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, pointerEvents: 'none' }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={svgPathRef}
          d="M -50 450 C 200 350, 400 250, 720 450 C 1040 650, 1240 400, 1490 500"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#heroGlow)"
        />
      </svg>

      {/* Gradient overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, hsl(var(--background) / 0.2) 0%, hsl(var(--background) / 0.5) 100%)',
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ zIndex: 2, maxWidth: '900px', margin: '0 auto' }}
      >
        {/* Mono label */}
        <span
          ref={labelRef}
          className="font-mono text-sm uppercase tracking-[3px] mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            color: 'hsl(var(--muted-foreground))',
          }}
        >
          Full Stack Developer
        </span>

        {/* Display name */}
        <h1
          ref={nameRef}
          className="font-display mb-6"
          style={{
            fontSize: 'clamp(42px, 8vw, 80px)',
            letterSpacing: '-3px',
            color: 'hsl(var(--foreground))',
          }}
        >
          {nameChars}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lg mb-10 max-w-xl"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            color: 'hsl(var(--muted-foreground))',
            fontSize: '18px',
            lineHeight: 1.6,
          }}
        >
          Building digital experiences with code, creativity, and precision.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <button
            onClick={() => onNavigate('#work')}
            className="font-cta px-8 py-4 rounded-xl transition-all duration-300 btn-primary"
          >
            View My Work
          </button>
          <button
            onClick={() => onNavigate('#contact')}
            className="font-cta px-8 py-4 rounded-xl transition-all duration-300 btn-secondary"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ zIndex: 2, opacity: 0 }}
      >
        <div className="relative w-px h-10" style={{ backgroundColor: 'hsl(var(--muted-foreground) / 0.3)' }}>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: 'hsl(var(--primary) / 0.6)',
              animation: 'scrollDot 2s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes scrollDot {
            0% { top: 0; opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}
