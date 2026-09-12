import React from 'react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenConsultation }) {
  const currentlyOpen = isOpenNow();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Hours & Contact Information */}
        <div className="lg:col-span-5 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Easton Office
            </span>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              currentlyOpen 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}>
              <span className={`w-2 h-2 rounded-full ${currentlyOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span>{currentlyOpen ? 'Open Now' : 'Closed Now'}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Hours & Location
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            1412 Sullivan Trail, Easton, PA 18040
          </p>

          {/* Weekly Hours Table */}
          <div className="space-y-2 mb-8">
            {BUSINESS_INFO.hours.map((h, i) => (
              <div 
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60 text-xs sm:text-sm"
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300">{h.day}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {h.open === 'Closed' ? 'Closed (Emergency On-Call)' : `${h.open} – ${h.close}`}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <a
              href="tel:6102589081"
              className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition"
            >
              <span>Call Office: (610) 258-9081</span>
            </a>
            <a
              href={BUSINESS_INFO.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>Get Driving Directions (Google Maps)</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Right: Embedded Google Map */}
        <div className="lg:col-span-7 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-sm aspect-[4/3] lg:aspect-auto lg:h-[520px]">
          <iframe
            src={BUSINESS_INFO.googleMapsEmbedUrl}
            title="Milano & Mazza Oral Surgery Location"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
