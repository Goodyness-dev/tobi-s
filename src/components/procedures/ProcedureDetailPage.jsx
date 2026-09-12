import React from 'react';
import ProcedureVideoPlayer from './ProcedureVideoPlayer';
import { PROCEDURES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ProcedureDetailPage({ 
  procedure, 
  onOpenConsultation, 
  onNavigate 
}) {
  if (!procedure) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Procedure Not Found</h2>
        <button 
          onClick={() => onNavigate('home')}
          className="px-6 py-3 rounded-full bg-cyan-600 text-white font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-cyan-600 transition">
          Home
        </button>
        <span>/</span>
        <button onClick={() => onNavigate('procedures')} className="hover:text-cyan-600 transition">
          Procedures
        </button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{procedure.title}</span>
      </div>

      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
          <span>{procedure.category}</span>
          <span>•</span>
          <span>160 Broadway • Lower Manhattan NYC</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {procedure.title}
        </h1>
        <p className="text-lg sm:xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {procedure.tagline}
        </p>
      </div>

      {/* 2-Column Grid: Video Walkthrough & Quick Consultation Action Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
        {/* Left / Main Column: 3D Video Walkthrough */}
        <div className="lg:col-span-8">
          <ProcedureVideoPlayer
            videoId={procedure.videoId}
            title={procedure.videoTitle}
            duration={procedure.videoDuration}
            chapters={procedure.chapters}
            category={procedure.category}
          />

          {/* Clinical Overview Paragraphs */}
          <div className="mt-10 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Clinical Overview &amp; How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              {procedure.fullDescription}
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Key Advantages for Patients
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {procedure.advantages.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/40 text-sm font-medium text-slate-800 dark:text-slate-200">
                  <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Consultation Card & Practice Assurance */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="card-thick bg-gradient-to-b from-slate-900 via-slate-950 to-cyan-950 text-white rounded-3xl p-7 sm:p-8 border-2 border-cyan-700/50 shadow-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-800/80 text-cyan-200 text-xs font-semibold mb-3 border border-cyan-600/40">
              Direct Consultation
            </div>
            <h3 className="text-2xl font-extrabold mb-2">
              Speak with Our Clinical Team
            </h3>
            <p className="text-cyan-100/90 text-sm leading-relaxed mb-6">
              Receive a comprehensive exam, 3D digital imaging, and an unhurried, clear treatment plan in Lower Manhattan.
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => onOpenConsultation(procedure.id)}
                className="w-full py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-900/50 active:scale-98 transition flex items-center justify-center gap-2"
              >
                <span>Request Appointment</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 active:scale-98 transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-cyan-800/80 text-xs text-cyan-200/80 space-y-1.5">
              <p className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                In-Network with Delta Dental, Aetna, Cigna, MetLife &amp; more
              </p>
              <p className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Monday – Thursday 8:00 AM – 6:00 PM • Friday &amp; Alt Saturdays
              </p>
            </div>
          </div>

          {/* Comfortable Care Guarantee */}
          <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Zero Anxiety &amp; Modern Sanctuary
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Overhead 4K Streaming &amp; Gentle Bedside Touch
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our Lower Manhattan office is designed to keep you completely comfortable. Enjoy streaming entertainment on ceiling displays, warm buffered numbing, and unhurried appointments.
            </p>
          </div>
        </div>
      </div>

      {/* Candidacy & FAQs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Candidates Box */}
        <div className="lg:col-span-5 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Who Is a Candidate?
          </h3>
          <div className="space-y-3">
            {procedure.candidates.map((c, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion/List */}
        <div className="lg:col-span-7 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {procedure.faqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090e18] border border-slate-200/80 dark:border-slate-800/80">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Procedures Selector */}
      <div className="card-thick bg-slate-50 dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 text-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Explore Other Services &amp; Treatments
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Comprehensive dental care delivered under one roof at 160 Broadway, Lower Manhattan
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {PROCEDURES.filter(p => p.id !== procedure.id).map(p => (
            <button
              key={p.id}
              onClick={() => onNavigate(`procedure-${p.slug}`)}
              className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800 font-medium text-xs transition shadow-sm"
            >
              {p.title} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
