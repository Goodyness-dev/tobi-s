import React from 'react';
import { PROCEDURES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AllProceduresPage({ onOpenConsultation, onNavigate }) {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-cyan-600 transition">
          Home
        </button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Dental Procedures &amp; Services</span>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
          <span>Comprehensive Lower Manhattan Dental Care</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
          Full Scope of Cosmetic &amp; Specialized Dentistry
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          From porcelain veneers and Invisalign® aligners to pediatric care, dental implants, root canals, and periodontal therapy, explore our full spectrum of modern clinical solutions at 160 Broadway.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {PROCEDURES.map((proc) => (
          <div
            key={proc.id}
            className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 shadow-sm flex flex-col justify-between hover:border-cyan-500/60 transition group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
                  {proc.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded-md">
                  ▶ Clinical Guide
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
                {proc.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {proc.shortDescription}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={() => onNavigate(`procedure-${proc.slug}`)}
                className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 transition flex items-center justify-center gap-2"
              >
                <span>Explore Details &amp; Video</span>
                <span>→</span>
              </button>
              <button
                onClick={() => onOpenConsultation(proc.id)}
                className="w-full py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
