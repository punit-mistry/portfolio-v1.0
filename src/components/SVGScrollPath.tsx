import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SVGScrollPath() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    const dots = svgRef.current?.querySelectorAll('.path-dot');
    dots?.forEach((dot, i) => {
      gsap.fromTo(dot,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: document.body,
            start: `${15 + i * 20}% top`,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      preserveAspectRatio="none"
      viewBox="0 0 1440 5500"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        ref={pathRef}
        d="
          M 200 400
          C 400 400, 600 300, 800 500
          C 1000 700, 700 900, 500 1000
          C 300 1100, 200 1300, 400 1500
          C 600 1700, 1000 1600, 1100 1800
          C 1200 2000, 800 2100, 600 2200
          C 400 2300, 300 2500, 500 2700
          C 700 2900, 1100 2800, 1000 3000
          C 900 3200, 400 3300, 300 3500
          C 200 3700, 600 3900, 900 4000
          C 1200 4100, 1100 4300, 800 4500
          C 500 4700, 200 4900, 720 5100
          C 900 5200, 720 5300, 720 5400
        "
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      <circle className="path-dot" cx="800" cy="500" r="4" fill="hsl(var(--primary))" opacity="0" />
      <circle className="path-dot" cx="400" cy="1500" r="4" fill="hsl(var(--primary))" opacity="0" />
      <circle className="path-dot" cx="1100" cy="1800" r="4" fill="hsl(var(--primary))" opacity="0" />
      <circle className="path-dot" cx="500" cy="2700" r="4" fill="hsl(var(--primary))" opacity="0" />
      <circle className="path-dot" cx="900" cy="4000" r="4" fill="hsl(var(--primary))" opacity="0" />
      <circle className="path-dot" cx="720" cy="5400" r="6" fill="hsl(var(--primary))" opacity="0" />
    </svg>
  );
}
