import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ConstellationField from "@/components/ConstellationField";
import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const children = content.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ padding: "160px 24px 100px" }}
    >
      <ConstellationField />

      <div
        ref={contentRef}
        className="relative max-w-[700px] mx-auto text-center"
        style={{ zIndex: 1 }}
      >
        <span
          className="font-label block mb-6"
          style={{ opacity: 0, color: "hsl(var(--primary))" }}
        >
          Contact
        </span>

        <h2
          className="font-heading mb-6"
          style={{
            opacity: 0,
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-2px",
            color: "hsl(var(--foreground))",
          }}
        >
          Let's Build Something Great
        </h2>

        <p
          className="text-lg mb-10"
          style={{
            opacity: 0,
            color: "hsl(var(--muted-foreground))",
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          I'm currently open to new opportunities and collaborations. Whether
          you have a project in mind or just want to connect, I'd love to hear
          from you.
        </p>

        <a
          href="mailto:punitmistr@gmail.com"
          className="inline-block font-heading mb-6 transition-all duration-300 email-link"
          style={{
            opacity: 0,
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 600,
            letterSpacing: "-1px",
          }}
        >
          punitmistr@gmail.com
        </a>

        {/* WhatsApp CTA */}
        <div
          className="mb-10"
          style={{ opacity: 0 }}
        >
          <div
            className="card-glass p-8 max-w-lg mx-auto"
          >
            <p
              className="font-heading text-xl mb-3"
              style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.5px" }}
            >
              Want to build a website or SaaS app?
            </p>
            <p
              className="text-sm mb-5"
              style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}
            >
              I'm available for freelance projects and collaborations. Whether you need a landing page, a full-stack web app, or a custom SaaS platform — let's discuss your idea over WhatsApp.
            </p>
            <a
              href="https://wa.me/918286075880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-cta transition-all duration-300 btn-whatsapp"
            >
              <MessageCircle size={20} />
              Message on WhatsApp
            </a>
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-6"
          style={{ opacity: 0 }}
        >
          {[
            { Icon: Github, label: "GitHub", href: "https://github.com/punit-mistry" },
            { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/punit-mistry-404ba2220" },
            { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/punitmistryy" },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 social-btn"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
