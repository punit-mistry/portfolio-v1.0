import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WireframeCube from '@/components/WireframeCube';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.6,
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word');
        gsap.fromTo(words,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
          }
        );
      }

      gsap.fromTo([para1Ref.current, para2Ref.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(statusRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: 0.3,
          scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(cubeRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headingWords = 'Crafting Digital Experiences'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full"
      style={{
        padding: '140px 24px',
        background: 'radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <span
              ref={labelRef}
              className="font-label block mb-6"
              style={{ opacity: 0, color: 'hsl(var(--primary))' }}
            >
              About
            </span>

            <h2
              ref={headingRef}
              className="font-heading mb-8"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px', color: 'hsl(var(--foreground))' }}
            >
              {headingWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </h2>

            <p
              ref={para1Ref}
              className="text-base mb-5"
              style={{ opacity: 0, color: 'hsl(var(--muted-foreground))', lineHeight: 1.65 }}
            >
              I'm Punit Mistry, a Full Stack Developer who finds joy in the dynamic world of technology. I navigate both frontend and backend domains, building applications that are performant, accessible, and delightful to use.
            </p>

            <p
              ref={para2Ref}
              className="text-base mb-8"
              style={{ opacity: 0, color: 'hsl(var(--muted-foreground))', lineHeight: 1.65 }}
            >
              Beyond coding, I'm passionate about gaming, exploring new destinations, and discovering inspiration across the internet. I currently contribute as a Frontend Developer, crafting interfaces that balance aesthetics with functionality.
            </p>

            <div
              ref={statusRef}
              className="flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  backgroundColor: '#A3C9A8',
                  animation: 'statusPulse 2s ease-in-out infinite',
                }}
              />
              <span className="font-mono text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Open to opportunities &amp; collaborations
              </span>
              <style>{`
                @keyframes statusPulse {
                  0%, 100% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.5); opacity: 0.6; }
                }
              `}</style>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-center">
            <div ref={cubeRef} style={{ opacity: 0 }}>
              <WireframeCube />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
