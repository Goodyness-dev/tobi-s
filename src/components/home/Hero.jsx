import React, { useState } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { PROCEDURES } from '../../data/servicesData';

export default function Hero({ onOpenConsultation, onNavigate }) {
  const [quickProcedure, setQuickProcedure] = useState('dental-implants');
  const [quickSedation, setQuickSedation] = useState('IV Twilight Sleep');

  const handleQuickSubmit = () => {
    onOpenConsultation(quickProcedure);
  };

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/10 dark:bg-teal-500/5 blur-3xl pointer-events-none rounded-full" />
      
      {/* Hero Content Container */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        {/* Practice Credential Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200/90 dark:border-teal-800/80 text-teal-800 dark:text-teal-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Easton, PA • Board-Certified Oral & Maxillofacial Surgeons</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
          Gentle, Pain-Free Oral Surgery with <span className="text-teal-600 dark:text-teal-400">Hospital-Grade Safety</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Drs. Carl J. Milano, D.M.D. & Fredric C. Mazza, D.M.D. provide premier dental implants, wisdom teeth removal, and bone regeneration under soothing in-office IV twilight sedation.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <button
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-teal-700/20 active:scale-95 transition"
          >
            Book Your Consultation
          </button>
          <button
            onClick={() => onNavigate('procedure-dental-implants')}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-800 font-bold text-sm sm:text-base shadow-sm active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>Watch 3D Surgical Guide</span>
            <span className="text-teal-600 dark:text-teal-400">▶</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            AAOMS Board-Certified
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            In-Office IV Twilight Anesthesia
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            In-Network PPO & Medicare
          </span>
        </div>
      </div>

      {/* Floating Quick Consultation Console (Directly inspired by website templete to follow.jpg) */}
      <div className="max-w-4xl mx-auto">
        <div className="card-thick bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md rounded-3xl sm:rounded-full border-2 border-slate-200/90 dark:border-slate-800/90 p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center gap-3">
          {/* Procedure Selector */}
          <div className="flex-1 w-full px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-0.5">
              Procedure Needed
            </label>
            <select
              value={quickProcedure}
              onChange={(e) => setQuickProcedure(e.target.value)}
              className="w-full bg-transparent font-bold text-sm text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              {PROCEDURES.map((p) => (
                <option key={p.id} value={p.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sedation / Comfort Preference */}
          <div className="flex-1 w-full px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-0.5">
              Comfort & Sedation
            </label>
            <select
              value={quickSedation}
              onChange={(e) => setQuickSedation(e.target.value)}
              className="w-full bg-transparent font-bold text-sm text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="IV Twilight Sleep" className="bg-white dark:bg-slate-900">IV Twilight Sleep (Asleep)</option>
              <option value="Nitrous Oxide" className="bg-white dark:bg-slate-900">Nitrous Oxide (Laughing Gas)</option>
              <option value="Local Anesthesia" className="bg-white dark:bg-slate-900">Local Numbing Only</option>
            </select>
          </div>

          {/* Location Confirmation */}
          <div className="flex-1 w-full px-4 py-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-0.5">
              Easton Office Location
            </label>
            <p className="font-bold text-sm text-slate-800 dark:text-white truncate">
              1412 Sullivan Trail, PA
            </p>
          </div>

          {/* Instant Launch Action Button */}
          <button
            onClick={handleQuickSubmit}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shrink-0 shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
