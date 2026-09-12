import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutPage({ onOpenConsultation, onNavigate }) {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-teal-600 transition">
          Home
        </button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">About Our Practice & Surgeons</span>
      </div>

      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800/60 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
          <span>Board-Certified Oral & Maxillofacial Surgeons</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
          Surgeons You Can Trust with Your Smile & Peace of Mind
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Founded on Sullivan Trail in Easton, PA, our surgical center combines hospital-grade operating safety with the warmth and personal attention of a dedicated local practice.
        </p>
      </div>

      {/* Doctors Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {BUSINESS_INFO.surgeons.map((surgeon) => (
          <div 
            key={surgeon.id}
            className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Doctor Avatar / Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-700 to-teal-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                  {surgeon.name.split(' ').map(n => n[0]).slice(1, 3).join('')}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {surgeon.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-600 dark:text-teal-400 font-semibold mt-0.5">
                    {surgeon.role}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {surgeon.credentials}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {surgeon.bio}
              </p>

              {/* Clinical Specialties */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">
                  Clinical Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {surgeon.specialties.map((spec, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenConsultation()}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-bold text-sm transition active:scale-98"
            >
              Consult with {surgeon.name.split(',')[0]}
            </button>
          </div>
        ))}
      </div>

      {/* Hospital Anesthesia Standards Banner */}
      <div className="card-thick bg-gradient-to-r from-teal-900 via-teal-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-teal-700/50 shadow-xl mb-20">
        <div className="max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-semibold uppercase tracking-wider border border-teal-600/40 inline-block mb-4">
            Patient Safety Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 leading-tight">
            {BUSINESS_INFO.anesthesiaStandards.title}
          </h2>
          <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed mb-8">
            {BUSINESS_INFO.anesthesiaStandards.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BUSINESS_INFO.anesthesiaStandards.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-teal-50">
                <svg className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facility & Location Callout */}
      <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Visit Our Easton Surgical Facility
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Conveniently located at 1412 Sullivan Trail, Easton, PA 18040 with ample private parking.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:6102589081"
            className="px-5 py-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            (610) 258-9081
          </a>
          <button
            onClick={() => onOpenConsultation()}
            className="px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 transition"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
