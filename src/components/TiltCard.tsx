import { useRef, useCallback, useEffect, useState, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    if (!rectRef.current) {
      rectRef.current = card.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = -y * 16;
    const rotateY = x * 16;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.15s ease-out';

    glare.style.transform = `translate(${x * 20}%, ${y * 20}%)`;
    glare.style.opacity = '1';
  }, [isTouchDevice]);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    const card = cardRef.current;
    if (card) {
      rectRef.current = card.getBoundingClientRect();
    }
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease';
    glare.style.opacity = '0';
  }, []);

  const handlers = isTouchDevice
    ? {}
    : {
        onMouseEnter: handleMouseEnter,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
      };

  return (
    <div
      ref={cardRef}
      className={`card-glass will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...handlers}
    >
      {children}
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease, transform 0.15s ease-out',
        }}
      />
    </div>
  );
}
