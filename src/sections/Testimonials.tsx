import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Founder, HealthFirst Nutrition',
    quote: 'Punit built our entire nutrition platform from scratch. The attention to detail and performance optimization was exceptional. Our bounce rate dropped by 40% after launch.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'CTO, Orange Healthcare',
    quote: 'Working with Punit on the clinic management system was seamless. He delivered ahead of schedule and the code quality is outstanding. Highly recommended for any React/Node project.',
    rating: 5,
  },
  {
    name: 'Ankit Patel',
    role: 'Product Manager, TechStack Inc.',
    quote: 'Punit has a rare combination of design sensibility and technical depth. He doesn\'t just write code — he thinks about user experience, performance, and maintainability.',
    rating: 5,
  },
];

export default function Testimonials() {
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
        const cards = cardsRef.current.querySelectorAll('.testimonial-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const headingWords = 'What People Say'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full"
      style={{ padding: '140px 24px' }}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": TESTIMONIALS.map((t, i) => ({
            "@type": "Review",
            "position": i + 1,
            "itemReviewed": {
              "@type": "Person",
              "name": "Punit Mistry"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": t.rating
            },
            "author": {
              "@type": "Person",
              "name": t.name
            },
            "reviewBody": t.quote
          }))
        })}
      </script>

      <div className="max-w-[1200px] mx-auto">
        <span
          ref={labelRef}
          className="font-label block mb-6"
          style={{ opacity: 0, color: 'hsl(var(--primary))' }}
        >
          Testimonials
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
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="testimonial-card card-glass p-8 lg:p-10 will-change-transform"
              style={{ opacity: 0 }}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="hsl(var(--primary))" color="hsl(var(--primary))" />
                ))}
              </div>
              <p className="text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, fontStyle: 'italic' }}>
                "{item.quote}"
              </p>
              <div>
                <p className="font-heading text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                  {item.name}
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground) / 0.6)' }}>
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
