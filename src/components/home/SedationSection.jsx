import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function SedationSection({ onOpenConsultation, onNavigate }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="card-thick bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 text-white rounded-3xl border-2 border-cyan-700/50 p-8 sm:p-14 shadow-2xl overflow-hidden relative">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-900/80 text-cyan-200 text-xs font-semibold uppercase tracking-wider border border-cyan-600/40 mb-4">
            <span>The Lumia Experience</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Where Cutting Edge Dentistry <br className="hidden sm:inline" />
            <span className="text-cyan-300">Meets A Modern Patient Sanctuary.</span>
          </h2>

          <p className="text-cyan-100/90 text-base sm:text-lg leading-relaxed mb-8">
            At Lumia Dental, we believe modern dental care goes beyond great trade craft. We want more than a satisfied patient: we want to ensure comfort and convenience at every step. That's how premier Manhattan dental care meets great customer service.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {BUSINESS_INFO.pillars.map((pillar) => (
              <div 
                key={pillar.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-lg mb-3">
                  {pillar.id === 'convenience' ? '📱' : pillar.id === 'cutting-edge' ? '🔬' : '🛋️'}
                </div>
                <h4 className="font-bold text-cyan-300 text-base mb-1">{pillar.title}</h4>
                <p className="text-[11px] font-semibold text-cyan-200/90 mb-1.5">{pillar.subtitle}</p>
                <p className="text-cyan-100/80 text-xs leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm tracking-wide shadow-xl active:scale-95 transition"
            >
              Book Your Visit
            </button>
            <a
              href={BUSINESS_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 active:scale-95 transition text-center"
            >
              Live AppointNow Scheduling ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
