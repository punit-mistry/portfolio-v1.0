import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: 'Admin Dashboard',
    description: 'A comprehensive analytics dashboard featuring real-time data visualization, user management, and role-based access control.',
    tech: 'React · TypeScript · Tailwind · Recharts',
    image: '/project-dashboard.jpg',
    direction: -60,
  },
  {
    name: 'WhatsApp Business Bot',
    description: 'An intelligent WhatsApp bot built with Node.js that automates customer support, handles orders, and integrates with external APIs for seamless business communication.',
    tech: 'Node.js · Express · WhatsApp API · MongoDB',
    image: '/project-bot.jpg',
    direction: 60,
  },
  {
    name: 'Express Builder',
    description: 'A visual tool for rapidly scaffolding Express.js applications with pre-configured middleware, database connections, and API endpoint generators.',
    tech: 'Node.js · Express · CLI · Inquirer.js',
    image: '/project-cli.jpg',
    direction: -60,
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const dir = PROJECTS[i].direction;

        gsap.fromTo(card,
          { opacity: 0, x: dir },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );

        const inner = card.querySelector('.card-inner');
        if (inner) {
          gsap.to(inner, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const headingWords = 'Featured Work'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full"
      style={{ padding: '140px 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          ref={labelRef}
          className="font-label block mb-6"
          style={{ opacity: 0, color: 'hsl(var(--primary))' }}
        >
          Portfolio
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

        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="card-project card-glass overflow-hidden will-change-transform"
            >
              <div className={`card-inner grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-10 ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <h3
                    className="font-heading mb-4"
                    style={{ fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-1px', color: 'hsl(var(--foreground))' }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-base mb-4"
                    style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.65 }}
                  >
                    {project.description}
                  </p>
                  <p className="font-mono text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground) / 0.6)' }}>
                    {project.tech}
                  </p>
                  <div className="flex items-center gap-6">
                    <button
                      className="font-cta flex items-center gap-2 transition-colors duration-300 btn-accent"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </button>
                    <button
                      className="font-cta flex items-center gap-2 transition-colors duration-300 btn-accent"
                    >
                      <Github size={16} />
                      GitHub
                    </button>
                  </div>
                </div>

                <div className={`flex items-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-auto rounded-2xl object-cover"
                    style={{ aspectRatio: '16/9' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
