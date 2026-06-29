import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import BlogDetail from './BlogDetail';

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    id: 'building-real-time-admin-dashboard',
    title: 'Building a Real-Time Admin Dashboard with React & Recharts',
    excerpt: 'A deep dive into architecting a comprehensive analytics dashboard with real-time data visualization, user management, and role-based access control.',
    date: 'May 15, 2026',
    readTime: '8 min read',
    tags: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    content: `## The Challenge

Modern SaaS platforms need dashboards that don't just display data but tell a story. The client needed a real-time admin panel capable of handling thousands of concurrent users while maintaining sub-100ms response times for data queries.

## Architecture Decisions

I chose React with TypeScript for type safety, paired with Recharts for its declarative API and excellent animation support. The backend uses WebSocket connections for real-time data streaming, with a Redis cache layer to minimize database load.

- **State Management**: React Query for server state, Zustand for client state
- **Data Visualization**: Recharts with custom responsive containers
- **Real-time Updates**: WebSocket connection with automatic reconnection and backoff
- **Performance**: Virtual scrolling for large datasets, memoized selectors

## Key Features

The dashboard includes a real-time analytics overview with live-updating charts that show user activity, revenue trends, and system health metrics. The user management module supports bulk operations, role-based access control with granular permissions, and an activity audit log.

## Lessons Learned

One unexpected challenge was handling chart reflows during window resizing. I solved this by debouncing resize handlers and using ResizeObserver with a 100ms throttle. The WebSocket reconnection logic also needed careful handling to avoid duplicate data on reconnect — a lesson in idempotent event processing.

\`The most impactful optimization was moving from polling to WebSockets, which reduced API calls by 95% and cut perceived latency from 2 seconds to under 100ms.\`

The project is open source and available on GitHub. Feel free to adapt the patterns for your own dashboards.`,
  },
  {
    id: 'whatsapp-business-bot-nodejs',
    title: 'Automating Customer Support with a WhatsApp Business Bot',
    excerpt: 'How I built an intelligent WhatsApp bot using Node.js that handles orders, integrates with external APIs, and scales to thousands of conversations.',
    date: 'April 28, 2026',
    readTime: '10 min read',
    tags: ['Node.js', 'Express', 'WhatsApp API', 'MongoDB'],
    content: `## Why WhatsApp?

With over 2 billion active users, WhatsApp is where customers already are. Building a bot on this platform meant meeting users in their preferred channel rather than forcing them into a web portal or mobile app.

## Tech Stack

The bot runs on Node.js with Express handling webhook routing. The WhatsApp Business API manages message send/receive, while MongoDB stores conversation history and order data. A Redis queue processes outgoing messages to respect WhatsApp's rate limits.

- **Webhook Architecture**: Single endpoint with intent-based routing
- **Message Queue**: Bull with Redis for reliable delivery
- **NLP**: Custom intent classifier using compromise.js for lightweight processing
- **Order Pipeline**: Multi-step conversation flow with state persistence

## Handling Scale

The system processes around 10,000 conversations daily. Scaling required careful database indexing on phone numbers and timestamps, connection pooling for MongoDB, and implementing circuit breakers for the WhatsApp API integration.

## Real-World Impact

The bot handles 80% of routine inquiries without human intervention, reducing response time from 4 hours to under 30 seconds. Human agents only receive escalated tickets for complex issues, letting them focus on high-value interactions.`,
  },
  {
    id: 'scaffolding-express-apps-cli-generator',
    title: 'Scaffolding Express Apps: Building a CLI Generator',
    excerpt: 'Lessons from creating a visual CLI tool that generates Express.js applications with pre-configured middleware, database connections, and API routes.',
    date: 'April 10, 2026',
    readTime: '6 min read',
    tags: ['Node.js', 'CLI', 'Express', 'Inquirer.js'],
    content: `## The Problem

Every new Express project starts the same way: install packages, set up folder structure, configure middleware, connect a database, write CRUD routes. This repetition costs time and introduces inconsistencies across projects.

## The Solution

I built a CLI tool that asks developers questions about their project needs and generates a complete, production-ready Express application. It's like create-react-app but for Express backends.

- **Interactive Prompts**: Inquirer.js handles the question flow with dynamic follow-ups
- **Template Engine**: EJS templates with conditional blocks for optional features
- **Dependency Resolution**: Automatically determines compatible package versions
- **Git Integration**: Initializes a Git repo with a meaningful .gitignore

## What It Generates

The tool scaffolds projects with JWT authentication, rate limiting, request validation using Joi, error handling middleware, MongoDB or PostgreSQL setup via environment variables, and a test suite with Jest and Supertest. Users can choose between CommonJS and ES modules.

## Developer Experience

The CLI includes a spinner for long operations, color-coded output with chalk, and the option to install dependencies automatically. An interactive preview mode lets developers see what will be generated before committing to disk.`,
  },
];

export default function Blog() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const selectedArticle = selectedIndex !== null ? ARTICLES[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex !== null) {
      const slug = ARTICLES[selectedIndex].id;
      window.history.pushState({ article: slug }, '', `/articles/${slug}`);
    } else if (selectedIndex === null && window.location.pathname.startsWith('/articles/')) {
      window.history.pushState({}, '', '/');
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handlePop = () => {
      if (window.location.pathname.startsWith('/articles/')) {
        const slug = window.location.pathname.replace('/articles/', '');
        const idx = ARTICLES.findIndex((a) => a.id === slug);
        if (idx !== -1) setSelectedIndex(idx);
      } else {
        setSelectedIndex(null);
      }
    };
    window.addEventListener('popstate', handlePop);

    const initialSlug = window.location.pathname.replace('/articles/', '');
    if (initialSlug && initialSlug !== window.location.pathname) {
      const idx = ARTICLES.findIndex((a) => a.id === initialSlug);
      if (idx !== -1) setSelectedIndex(idx);
    }

    return () => window.removeEventListener('popstate', handlePop);
  }, []);

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
  }, [selectedIndex]);

  const headingWords = 'Recent Articles'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="articles"
      className="relative w-full"
      style={{ padding: '140px 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {selectedArticle ? (
          <BlogDetail
            article={selectedArticle}
            onBack={() => setSelectedIndex(null)}
          />
        ) : (
          <>
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
                <div
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className="article-card card-glass overflow-hidden will-change-transform cursor-pointer"
                  style={{ opacity: 0 }}
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
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs" style={{ color: 'hsl(var(--muted-foreground) / 0.6)' }}>
                        {article.date}
                      </span>
                      <span className="font-cta text-xs inline-flex items-center gap-1.5" style={{ color: 'hsl(var(--primary))' }}>
                        Read Article <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
