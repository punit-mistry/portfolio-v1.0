import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLowEndDevice } from '@/hooks/use-low-end-device';

import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Work from '@/sections/Work';
import Blog from '@/sections/Blog';
import Testimonials from '@/sections/Testimonials';
import FAQ from '@/sections/FAQ';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import SVGScrollPath from '@/components/SVGScrollPath';
import ScrollToTop from '@/components/ScrollToTop';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const { isLowEnd, isMobile } = useLowEndDevice();

  useEffect(() => {
    const lenis = new Lenis({
      duration: isLowEnd ? 0.8 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isMobile && !isLowEnd,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const handleNavigate = useCallback((target: string) => {
    if (!lenisRef.current) return;

    if (target === '#hero') {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      lenisRef.current.scrollTo(target, {
        offset: -72,
        duration: 1.5,
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'hsl(var(--background))' }}>
      {/* Colorful gradient orbs for visual interest */}
      {!isMobile && (
        <>
          <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--accent-2)) 0%, transparent 70%)' }} />
          <div className="fixed top-[40%] right-[-15%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }} />
          <div className="fixed bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--accent-2)) 0%, transparent 70%)' }} />
        </>
      )}

      {/* SVG Scroll Tracking Path - spans full page */}
      {!isMobile && (
        <div
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{ height: '100%', zIndex: 1 }}
        >
          <SVGScrollPath />
        </div>
      )}

      {/* Navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="relative" style={{ zIndex: 2 }}>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Skills />
        <Work />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
        <Footer onNavigate={handleNavigate} />
      </main>

      <ScrollToTop />
    </div>
  );
}
