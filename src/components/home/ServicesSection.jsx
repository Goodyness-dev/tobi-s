import React from 'react';
import { PROCEDURES } from '../../data/servicesData';

export default function ServicesSection({ onOpenConsultation, onNavigate }) {
  // Showcase top 4 primary procedures
  const featured = PROCEDURES.slice(0, 4);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Specialized Surgical Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Featured Clinical Procedures
          </h2>
        </div>
        <button
          onClick={() => onNavigate('procedures')}
          className="text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 flex items-center gap-1.5"
        >
          <span>View All Procedures</span>
          <span>→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((proc) => (
          <div
            key={proc.id}
            className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm flex flex-col justify-between hover:border-teal-500/50 transition group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold">
                  {proc.category.split('&')[0].trim()}
                </span>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50/80 dark:bg-teal-950/60 px-2 py-0.5 rounded-full">
                  3D Video
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                {proc.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {proc.shortDescription}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="w-full py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm active:scale-98 transition flex items-center justify-center gap-1.5"
              >
                <span>Watch 3D Guide</span>
                <span>▶</span>
              </button>
              <button
                onClick={() => onOpenConsultation(proc.id)}
                className="w-full py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
              >
                Consultation
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
