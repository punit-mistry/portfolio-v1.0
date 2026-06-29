import { useEffect, useState, useCallback } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavigationProps {
  onNavigate: (target: string) => void;
}

const NAV_LINKS = [
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Work', target: '#work' },
  { label: 'Contact', target: '#contact' },
];

export default function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['about', 'skills', 'work', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNav = useCallback((target: string) => {
    onNavigate(target);
    setMobileOpen(false);
  }, [onNavigate]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: '72px',
          background: scrolled ? 'hsl(var(--background) / 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between h-full px-6 lg:px-12 max-w-[1400px] mx-auto">
          {/* Brand */}
          <button
            onClick={() => handleNav('#hero')}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
            style={{
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '18px',
            }}
          >
            PM
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.target}
                onClick={() => handleNav(link.target)}
                className="font-label relative group"
                style={{
                  color: activeSection === link.target.slice(1) ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ease-out"
                  style={{
                    width: activeSection === link.target.slice(1) ? '100%' : '0%',
                    backgroundColor: 'hsl(var(--primary))',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Right side: theme toggle + mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
                style={{
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg"
              style={{
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: 'hsl(var(--background) / 0.98)', backdropFilter: 'blur(20px)' }}
        >
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.target}
              onClick={() => handleNav(link.target)}
              className="font-display"
              style={{
                fontSize: '42px',
                color: 'hsl(var(--foreground))',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
