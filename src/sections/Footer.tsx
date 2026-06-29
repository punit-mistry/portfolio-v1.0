import { ArrowUp } from "lucide-react";

interface FooterProps {
  onNavigate: (target: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      className="relative w-full"
      style={{
        padding: "80px 24px",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span
          className="font-mono text-sm"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          &copy; {new Date().getFullYear()} Punit Mistry
        </span>

        <button
          onClick={() => onNavigate("#hero")}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 btn-back-top md:hidden"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>

        <span
          className="font-mono text-sm"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Built with React &middot; GSAP &middot; Three.js
        </span>

        <button
          onClick={() => onNavigate("#hero")}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 btn-back-top"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
