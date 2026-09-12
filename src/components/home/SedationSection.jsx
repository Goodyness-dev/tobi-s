import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function SedationSection({ onOpenConsultation, onNavigate }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="card-thick bg-gradient-to-r from-teal-900 via-teal-950 to-slate-950 text-white rounded-3xl border-2 border-teal-700/50 p-8 sm:p-14 shadow-2xl overflow-hidden relative">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-semibold uppercase tracking-wider border border-teal-600/40 mb-4">
            <span>Anxiety-Free Patient Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Afraid of Oral Surgery? <br className="hidden sm:inline" />
            <span className="text-teal-300">Wake Up Comfortably</span> with Zero Pain Memory
          </h2>

          <p className="text-teal-100/90 text-base sm:text-lg leading-relaxed mb-8">
            Drs. Milano & Mazza completed extensive hospital-based anesthesia residencies. Our certified surgical suite provides gentle IV twilight sleep with continuous cardiac and respiratory monitoring so you feel completely at ease.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm">
              <h4 className="font-bold text-teal-300 mb-1">IV Twilight Sleep</h4>
              <p className="text-teal-100/80">Drift into restful relaxation. Wake up with your surgery finished.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm">
              <h4 className="font-bold text-teal-300 mb-1">Hospital-Grade Monitoring</h4>
              <p className="text-teal-100/80">Continuous vital telemetry overseen by board-certified surgeons.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onOpenConsultation('anesthesia-sedation')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm tracking-wide shadow-xl active:scale-95 transition"
            >
              Discuss Sedation Options
            </button>
            <button
              onClick={() => onNavigate('procedure-anesthesia-sedation')}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 active:scale-95 transition"
            >
              Watch Anesthesia Safety Video ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
