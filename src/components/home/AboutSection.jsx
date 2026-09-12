import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutSection({ onOpenConsultation, onNavigate }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Practice Philosophy */}
        <div className="lg:col-span-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Meet Your Surgeons
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-6">
            Drs. Carl J. Milano & Fredric C. Mazza
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
            Oral and maxillofacial surgery requires specialized hospital-based residency training beyond dental school. For over 25 years on Sullivan Trail, our surgeons have delivered microscopic precision and comforting bedside empathy to generations of families across Northampton County.
          </p>

          <div className="space-y-3.5 mb-8">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <strong>Fellows of AAOMS:</strong> Actively adhering to the highest national standards of oral surgical excellence.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <strong>Hospital Staff Privileges:</strong> Credentialed at local trauma centers for complex maxillofacial reconstruction.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <strong>Integrated General Dentist Network:</strong> Seamless collaboration with your trusted family dentist.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('about')}
              className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition"
            >
              Read Full Surgeon Biographies
            </button>
            <button
              onClick={() => onOpenConsultation()}
              className="px-6 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-200 transition"
            >
              Consult with Doctors
            </button>
          </div>
        </div>

        {/* Right Column: Tactile Doctor Highlight Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BUSINESS_INFO.surgeons.map((s) => (
            <div 
              key={s.id}
              className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-7 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-700 to-teal-500 text-white flex items-center justify-center font-extrabold text-lg mb-4 shadow-md">
                {s.name.split(' ').map(n => n[0]).slice(1, 3).join('')}
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                {s.name}
              </h3>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mb-3">
                {s.role}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-4 leading-relaxed mb-4">
                {s.bio}
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
              >
                View Credentials →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
