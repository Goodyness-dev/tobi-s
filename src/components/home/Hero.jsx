import React from 'react';
import { ChevronRight, Phone, Wrench, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Hero({ onOpenWizard }) {
  return (
    <section className="relative overflow-hidden" aria-label="Introduction & Quick Quote">
      {/* Full-width Hero with Preloaded Video Background */}
      <div className="relative min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] flex items-center">
        {/* Video Background with auto preload and bulletproof image fallback */}
        <div className="absolute inset-0 overflow-hidden bg-neutral-950 bg-[url('/images/hero-truck.jpg')] bg-cover bg-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            poster="/images/hero-truck.jpg"
            aria-hidden="true"
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradient optimized for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        </div>

        {/* Hero Content (Bigger typography) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-3xl space-y-5 sm:space-y-6">
            {/* Small badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span>Casa Grande's Trusted Shop Since 2009</span>
            </div>

            {/* Headline (Bigger: 4xl to 7xl) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-white tracking-tight leading-[1.1]">
              Dependable Auto & Diesel Care
            </h1>

            {/* Subtitle (Bigger: text-lg to 2xl) */}
            <p className="text-lg sm:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
              Family-owned repair shop specializing in engine swaps, diesel diagnostics, and honest automotive work in Casa Grande, AZ.
            </p>

            {/* CTAs (Bigger padding and font) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-lg transition-all flex items-center justify-center space-x-2.5 shadow-lg active:scale-95"
                aria-label="Get a Free Quote Online"
              >
                <span>Get a Free Quote</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="px-7 py-4 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-bold text-lg border border-white/25 transition flex items-center justify-center space-x-2.5 active:scale-95"
                aria-label={`Call Toby's Auto Mechanic at ${BUSINESS_INFO.phone}`}
              >
                <Phone className="w-5 h-5" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Trust proof (Bigger text) */}
            <div className="flex items-center space-x-3 text-sm sm:text-base text-white/90 pt-2 font-medium">
              <div className="flex text-amber-400 text-lg" aria-label="5 out of 5 stars rating">
                {'★★★★★'.split('').map((_, i) => (
                  <span key={i} className="leading-none">★</span>
                ))}
              </div>
              <span>5.0 Rating on Yelp & Google (48+ Verified Reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Action Bar (Midnight Pure Black) */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10 pb-8 sm:pb-10">
        <div className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3.5 transition-colors">
          <div 
            className="flex items-center space-x-3 flex-1 w-full cursor-pointer"
            onClick={() => onOpenWizard()}
          >
            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-[#0c0c0c] rounded-xl border border-gray-200 dark:border-neutral-800 flex-1 hover:border-red-400 dark:hover:border-red-600 transition">
              <Wrench className="w-5 h-5 text-red-700 dark:text-red-600 shrink-0" />
              <span className="text-sm sm:text-base text-gray-700 dark:text-neutral-200 font-medium truncate">
                Engine, Brakes, Diesel, Custom issue...
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-[#0c0c0c] rounded-xl border border-gray-200 dark:border-neutral-800 flex-1">
              <Shield className="w-5 h-5 text-gray-400 dark:text-neutral-500 shrink-0" />
              <span className="text-sm sm:text-base text-gray-600 dark:text-neutral-400 font-medium">
                Casa Grande, AZ 85122
              </span>
            </div>
          </div>
          <button
            onClick={() => onOpenWizard()}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base transition-colors shrink-0 shadow-md active:scale-95"
            aria-label="Start quote request from quick action bar"
          >
            Get Quote
          </button>
        </div>
      </div>
    </section>
  );
}
