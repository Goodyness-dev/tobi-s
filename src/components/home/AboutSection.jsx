import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutSection({ onOpenConsultation, onNavigate }) {
  // Show top featured doctors on homepage
  const featuredDoctors = BUSINESS_INFO.doctors.slice(0, 4);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Practice Philosophy */}
        <div className="lg:col-span-5">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Meet Our Multidisciplinary Doctors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-6">
            Premier Manhattan Dentistry Powered By Top Clinical Specialists
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
            At Lumia Dental, we believe modern dental care should combine elite tradecraft with unrivaled comfort. Located at 160 Broadway in Lower Manhattan, our team of 9 board-certified general dentists, cosmetic artists, board-certified pediatric dentists, and periodontal surgeons provide comprehensive care under one high-tech roof.
          </p>

          <div className="space-y-3.5 mb-8">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <strong>Elite Clinical Pedigree:</strong> Doctors trained at Tufts, University of Pennsylvania, Columbia, NYU, Temple, and Mount Sinai.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <strong>Every Specialty In-House:</strong> Cosmetic smile design, Invisalign®, pediatric gentle visits, emergency endodontics, and titanium implants without outside referrals.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <strong>Modern FiDi Convenience:</strong> Digital intake, weekend &amp; evening availability, ceiling 4K streaming entertainment, and instant online booking.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('about')}
              className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition"
            >
              Meet All 9 Doctors &amp; Hygienists
            </button>
            <button
              onClick={() => onOpenConsultation()}
              className="px-6 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              Book an Appointment
            </button>
          </div>
        </div>

        {/* Right Column: Tactile Doctor Highlight Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {featuredDoctors.map((doc) => (
            <div 
              key={doc.id}
              className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  {doc.image ? (
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500/30 shadow-sm shrink-0" 
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-300 font-bold text-lg flex items-center justify-center border-2 border-cyan-500/30 shadow-sm shrink-0">
                      {doc.name.split(' ')[1]?.[0] || 'D'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                      {doc.role}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-2.5">
                  🎓 {doc.credentials}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {doc.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 truncate max-w-[170px]">
                  {doc.specialties[0]}
                </span>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 transition shrink-0"
                >
                  Full Bio →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
