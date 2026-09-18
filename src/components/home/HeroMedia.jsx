import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const DESKTOP_MOTION = '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export default function HeroMedia() {
  const [enabled, setEnabled] = useState(false);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const query = window.matchMedia(DESKTOP_MOTION);
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    let context;
    const cleanup = () => { context?.revert(); context = undefined; };
    const start = () => {
      cleanup();
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      context = gsap.context(() => {
        gsap.to(video, {
          currentTime: Math.max(0, video.duration - 0.1), ease: 'none',
          scrollTrigger: { trigger: video.closest('[data-hero-stage]'), pin: true, scrub: 1.5, start: 'top top', end: '+=350%', invalidateOnRefresh: true },
        });
      });
      ScrollTrigger.refresh();
    };
    video.addEventListener('loadedmetadata', start);
    video.addEventListener('error', cleanup);
    if (video.readyState >= 1) start();
    return () => {
      video.removeEventListener('loadedmetadata', start);
      video.removeEventListener('error', cleanup);
      cleanup();
    };
  }, [enabled]);

  return <div className="absolute inset-0 overflow-hidden bg-neutral-950">
    <img src="/images/hero-truck.jpg" alt="" fetchpriority="high" width="1280" height="720" className="absolute inset-0 w-full h-full object-cover" />
    {enabled && <video ref={videoRef} muted playsInline preload="auto" poster="/images/hero-truck.jpg" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" tabIndex={-1}>
      <source src="/images/hero-video.mp4" type="video/mp4" />
    </video>}
    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
  </div>;
}
