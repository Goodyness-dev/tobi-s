import React, { useState } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { PROCEDURES } from '../../data/servicesData';

export default function Hero({ onOpenConsultation, onNavigate }) {
  const [quickProcedure, setQuickProcedure] = useState('cosmetic-dentistry');
  const [quickComfort, setQuickComfort] = useState('Ceiling Netflix TV & Headphones');

  const handleQuickSubmit = () => {
    onOpenConsultation(quickProcedure);
  };

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-teal-500/15 dark:bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />
      
      {/* Hero Content Container */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        {/* Practice Credential Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200/90 dark:border-teal-800/80 text-teal-900 dark:text-teal-200 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>160 Broadway, Suite 1004 • Lower Manhattan, NYC • Accepting New Patients</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
          Where Cutting Edge Dentistry Meets A{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 dark:from-teal-400 dark:to-cyan-300">
            Modern Patient Experience
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Welcome to <strong className="font-semibold text-slate-800 dark:text-white">Lumia Dental</strong> in Lower Manhattan. Our multidisciplinary team of 9 specialists trained at Tufts, UPenn, Columbia, and NYU provides premier cosmetic veneers, Invisalign® Diamond clear aligners, pediatric dentistry, and gentle implants in a relaxed boutique sanctuary.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <button
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-teal-600/25 active:scale-95 transition"
          >
            Book Your Smile Visit Online
          </button>
          
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-800 font-bold text-sm sm:text-base shadow-sm active:scale-95 transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call / Text: {BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9★ Verified Rating (ZocDoc & Google)
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Invisalign® Top 1% Diamond Provider
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Steps from Fulton Center & Cortlandt St Subways
          </span>
        </div>
      </div>

      {/* Floating Quick Consultation Console */}
      <div className="max-w-4xl mx-auto">
        <div className="card-thick bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md rounded-3xl sm:rounded-full border-2 border-slate-200/90 dark:border-slate-800/90 p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center gap-3">
          {/* Treatment Selector */}
          <div className="flex-1 w-full px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-0.5">
              Service Needed
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

          {/* Comfort Amenity Choice */}
          <div className="flex-1 w-full px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-0.5">
              Comfort Preference
            </label>
            <select
              value={quickComfort}
              onChange={(e) => setQuickComfort(e.target.value)}
              className="w-full bg-transparent font-bold text-sm text-slate-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="Ceiling Netflix TV & Headphones" className="bg-white dark:bg-slate-900">Ceiling Netflix TV & Headphones</option>
              <option value="Invisalign 3D Digital Scan" className="bg-white dark:bg-slate-900">Invisalign 3D iTero Scan</option>
              <option value="Cosmetic Smile Makeover" className="bg-white dark:bg-slate-900">Cosmetic Veneers Consultation</option>
              <option value="Pediatric Visit" className="bg-white dark:bg-slate-900">Gentle Pediatric Visit (Kids)</option>
              <option value="Routine Hygiene & Exam" className="bg-white dark:bg-slate-900">Routine Checkup & Cleaning</option>
              <option value="Same-Day Pain Relief" className="bg-white dark:bg-slate-900">Urgent Tooth Pain Relief</option>
            </select>
          </div>

          {/* Location Confirmation */}
          <div className="flex-1 w-full px-4 py-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 mb-0.5">
              Lower Manhattan Office
            </label>
            <p className="font-bold text-sm text-slate-800 dark:text-white truncate">
              {BUSINESS_INFO.address.street}
            </p>
          </div>

          {/* Instant Launch Action Button */}
          <button
            onClick={handleQuickSubmit}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-sm shrink-0 shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
