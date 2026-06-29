import { useState, useEffect } from 'react';

export function useLowEndDevice() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isiOS, setIsiOS] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mqlReduced.matches);

    const handleReduced = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mqlReduced.addEventListener('change', handleReduced);

    const check = () => {
      const mobile = window.innerWidth < 768;
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const hasLowCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
      const hasLowMemory = (navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory <= 4;
      const lowRes = window.devicePixelRatio !== undefined && window.devicePixelRatio <= 1;

      setIsMobile(mobile);
      setIsiOS(ios);
      setIsLowEnd(mobile || ios || hasLowCores || hasLowMemory || lowRes);
    };

    check();

    return () => mqlReduced.removeEventListener('change', handleReduced);
  }, []);

  return { isLowEnd, isMobile, isiOS, prefersReducedMotion };
}
