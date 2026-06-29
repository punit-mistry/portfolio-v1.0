import { useState, useEffect } from 'react';

export function useLowEndDevice() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mqlReduced.matches);

    const mqlReducedHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mqlReduced.addEventListener('change', mqlReducedHandler);

    const checkHardware = () => {
      const isMobile = window.innerWidth < 768;
      const hasLowCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
      const hasLowMemory = (navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory <= 4;
      const isLowRes = window.devicePixelRatio !== undefined && window.devicePixelRatio <= 1;
      setIsLowEnd(isMobile || hasLowCores || hasLowMemory || isLowRes);
    };

    checkHardware();

    return () => {
      mqlReduced.removeEventListener('change', mqlReducedHandler);
    };
  }, []);

  return { isLowEnd, prefersReducedMotion };
}
