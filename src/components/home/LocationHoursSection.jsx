import React from 'react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenConsultation }) {
  const currentlyOpen = isOpenNow();

  return (
    <section id="location" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Hours & Contact Information */}
        <div className="lg:col-span-5 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 sm:p-9 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Lower Manhattan Office
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

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Hours &amp; Location
          </h2>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
            {BUSINESS_INFO.address.formatted}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Located on Broadway between Maiden Lane &amp; Cortlandt St • Financial District
          </p>

          {/* Subway & Transit Info */}
          <div className="p-4 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/40 mb-6 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
              <span>🚇 Unrivaled NYC Transit Access:</span>
            </p>
            <p>• <strong>Fulton Center (2 min walk):</strong> {BUSINESS_INFO.transit.fultonCenter}</p>
            <p>• <strong>Cortlandt St (1 min walk):</strong> {BUSINESS_INFO.transit.cortlandtSt}</p>
            <p>• <strong>World Trade Center &amp; PATH (3 min walk):</strong> {BUSINESS_INFO.transit.worldTradeCenter}</p>
            <p>• <strong>Wall Street (3 min walk):</strong> {BUSINESS_INFO.transit.wallStreet}</p>
          </div>

          {/* Weekly Hours Table */}
          <div className="space-y-2 mb-6">
            {BUSINESS_INFO.hours.map((h, i) => (
              <div 
                key={i}
                className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{h.day}</span>
                  {h.note && (
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 hidden sm:inline">({h.note})</span>
                  )}
                </div>
                <span className="text-slate-500 dark:text-slate-400">
                  {h.open === 'Closed' ? 'Closed' : `${h.open} – ${h.close}`}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition"
            >
              <span>Call / Text: {BUSINESS_INFO.phone}</span>
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={BUSINESS_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition hover:opacity-90"
              >
                <span>Book AppointNow ↗</span>
              </a>
              <a
                href={BUSINESS_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span>Google Maps ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Embedded Google Map */}
        <div className="lg:col-span-7 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-sm aspect-[4/3] lg:aspect-auto lg:h-[580px]">
          <iframe
            src={BUSINESS_INFO.googleMapsEmbedUrl}
            title={`${BUSINESS_INFO.name} Lower Manhattan Location`}
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
