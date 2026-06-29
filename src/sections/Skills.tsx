import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/TiltCard';
import {
  Code2, Server, Database,
  GitBranch, Palette, Terminal,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    icon: Code2,
    name: 'React & Next.js',
    items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    icon: Server,
    name: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Supabase'],
  },
  {
    icon: Database,
    name: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma ORM'],
  },
  {
    icon: GitBranch,
    name: 'DevOps',
    items: ['Git', 'Docker', 'CI/CD', 'Vercel', 'AWS Basics'],
  },
  {
    icon: Palette,
    name: 'Design',
    items: ['Figma', 'UI/UX Principles', 'Responsive Design', 'Accessibility'],
  },
  {
    icon: Terminal,
    name: 'Core',
    items: ['JavaScript', 'TypeScript', 'Python', 'Problem Solving', 'System Design'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.skill-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const headingWords = 'Technologies I Work With'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full"
      style={{
        padding: '140px 24px',
        background: 'linear-gradient(180deg, transparent 0%, hsl(var(--accent-2) / 0.03) 50%, transparent 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          ref={labelRef}
          className="font-label block mb-6"
          style={{ opacity: 0, color: 'hsl(var(--primary))' }}
        >
          Expertise
        </span>

        <h2
          ref={headingRef}
          className="font-heading mb-16"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px', color: 'hsl(var(--foreground))' }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            const colors = ['hsl(var(--primary))', 'hsl(var(--accent-2))'];
            const iconColor = colors[i % colors.length];
            return (
              <div key={i} className="skill-card" style={{ opacity: 0 }}>
                <TiltCard>
                  <div className="p-8 lg:p-10 relative">
                    <div className="mb-5">
                      <Icon
                        size={40}
                        strokeWidth={1.5}
                        style={{ color: iconColor }}
                      />
                    </div>

                    <h4
                      className="font-heading mb-4"
                      style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.5px', color: 'hsl(var(--foreground))' }}
                    >
                      {skill.name}
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, j) => (
                        <span
                          key={j}
                          className="font-mono text-xs px-3 py-1.5 rounded-md"
                          style={{
                            background: 'hsl(var(--muted))',
                            color: 'hsl(var(--muted-foreground))',
                            fontSize: '13px',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
