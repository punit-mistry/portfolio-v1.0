import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: 'What technologies do you specialize in?',
    a: 'I specialize in React, TypeScript, Node.js, Next.js, and Tailwind CSS. I also work with MongoDB, PostgreSQL, Redis, and cloud platforms like Netlify and Vercel.',
  },
  {
    q: 'Are you available for freelance projects?',
    a: 'Yes! I\'m currently open to freelance work and collaborations. You can reach me via WhatsApp or the contact form above to discuss your project.',
  },
  {
    q: 'What is your typical project timeline?',
    a: 'It depends on the scope. A landing page typically takes 1-2 weeks, while a full-stack web application can take 4-8 weeks. I\'ll provide a detailed timeline after understanding your requirements.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Absolutely. I offer 30 days of post-launch bug fixes and support for every project. Extended maintenance plans are also available.',
  },
  {
    q: 'What is your pricing model?',
    a: 'I work on a project basis with clear milestones and deliverables. Each project is quoted individually based on complexity and timeline. Contact me for a free estimate.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.faq-item');
        gsap.fromTo(items,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: itemsRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const headingWords = 'Frequently Asked Questions'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full"
      style={{ padding: '140px 24px' }}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        })}
      </script>

      <div className="max-w-[800px] mx-auto">
        <span
          ref={labelRef}
          className="font-label block mb-6 text-center"
          style={{ opacity: 0, color: 'hsl(var(--primary))' }}
        >
          FAQ
        </span>

        <h2
          ref={headingRef}
          className="font-heading mb-16 text-center"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px', color: 'hsl(var(--foreground))' }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">{word}</span>
          ))}
        </h2>

        <div ref={itemsRef} className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="faq-item card-glass overflow-hidden will-change-transform"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors duration-300"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                <span className="font-heading text-sm lg:text-base pr-4" style={{ letterSpacing: '-0.3px' }}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 transition-transform duration-300"
                  style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)', color: 'hsl(var(--primary))' }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? '300px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="px-6 pb-6 text-sm" style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
