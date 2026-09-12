import React from 'react';
import { PROCEDURES } from '../../data/servicesData';

export default function ServicesSection({ onOpenConsultation, onNavigate }) {
  // Showcase top 4 primary Lumia Dental procedures
  const featured = PROCEDURES.slice(0, 4);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Elevated Clinical Treatments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Featured Dental Specialties
          </h2>
        </div>
        <button
          onClick={() => onNavigate('procedures')}
          className="text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1.5"
        >
          <span>View All 8 Specialties</span>
          <span>→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((proc) => (
          <div
            key={proc.id}
            className="card-thick-hover bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/50 transition group overflow-hidden"
          >
            <div>
              {/* Optional Card Image Banner */}
              {proc.image && (
                <div className="w-full h-40 rounded-2xl overflow-hidden mb-5 relative bg-slate-100 dark:bg-slate-800">
                  <img
                    src={proc.image}
                    alt={proc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-white/10">
                    {proc.badge || 'Lumia'}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
                  {proc.category.split('&')[0].trim()}
                </span>
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
                  {proc.videoDuration} Video ▶
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition leading-snug">
                {proc.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-3">
                {proc.shortDescription}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs shadow-sm active:scale-98 transition flex items-center justify-center gap-1.5"
              >
                <span>Explore Procedure & Video</span>
                <span>▶</span>
              </button>
              <button
                onClick={() => onOpenConsultation(proc.id)}
                className="w-full py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
              >
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

