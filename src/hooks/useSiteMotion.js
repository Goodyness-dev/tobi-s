import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSiteMotion(page) {
  useLayoutEffect(() => {
    if (page !== 'home') return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-hero-reveal]', { y: 18, opacity: 0, duration: 0.65, stagger: 0.1, clearProps: 'all' });
      gsap.utils.toArray('main section[id] h2').forEach(heading => {
        gsap.from(heading, { y: 20, opacity: 0, duration: 0.6, clearProps: 'all', scrollTrigger: { trigger: heading, start: 'top 92%', once: true } });
      });
      gsap.from('#services article', { y: 28, opacity: 0, duration: 0.65, stagger: 0.1, clearProps: 'all', scrollTrigger: { trigger: '#services', start: 'top 85%', once: true } });
    });
    return () => media.revert();
  }, [page]);
}
