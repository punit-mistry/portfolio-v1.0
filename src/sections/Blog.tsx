import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    title: 'Building a Real-Time Admin Dashboard with React & Recharts',
    excerpt: 'A deep dive into architecting a comprehensive analytics dashboard with real-time data visualization, user management, and role-based access control.',
    tags: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    link: '#',
  },
  {
    title: 'Automating Customer Support with a WhatsApp Business Bot',
    excerpt: 'How I built an intelligent WhatsApp bot using Node.js that handles orders, integrates with external APIs, and scales to thousands of conversations.',
    tags: ['Node.js', 'Express', 'WhatsApp API', 'MongoDB'],
    link: '#',
  },
  {
    title: 'Scaffolding Express Apps: Building a CLI Generator',
    excerpt: 'Lessons from creating a visual CLI tool that generates Express.js applications with pre-configured middleware, database connections, and API routes.',
    tags: ['Node.js', 'CLI', 'Express', 'Inquirer.js'],
    link: '#',
  },
];

export default function Blog() {
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
        { opacity: 1, x: 0, duration: 0.6, scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } }
      );

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word');
        gsap.fromTo(words,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' } }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.article-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const headingWords = 'Recent Articles'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="articles"
      className="relative w-full"
      style={{ padding: '140px 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          ref={labelRef}
          className="font-label block mb-6"
          style={{ opacity: 0, color: 'hsl(var(--primary))' }}
        >
          Writing
        </span>

        <h2
          ref={headingRef}
          className="font-heading mb-16"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px', color: 'hsl(var(--foreground))' }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">{word}</span>
          ))}
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ARTICLES.map((article, i) => (
            <a
              key={i}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card card-glass overflow-hidden will-change-transform block"
              style={{ opacity: 0, cursor: article.link === '#' ? 'default' : 'pointer' }}
            >
              <div className="p-8 lg:p-10">
                <h4
                  className="font-heading mb-3"
                  style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.5px', color: 'hsl(var(--foreground))' }}
                >
                  {article.title}
                </h4>
                <p className="text-sm mb-5" style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.6 }}>
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {article.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-mono text-xs px-3 py-1.5 rounded-md"
                      style={{
                        background: 'hsl(var(--muted))',
                        color: 'hsl(var(--primary))',
                        fontSize: '12px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-cta text-xs inline-flex items-center gap-1.5" style={{ color: 'hsl(var(--primary))' }}>
                  Read Article <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
