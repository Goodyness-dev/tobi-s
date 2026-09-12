import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutPage({ onOpenConsultation, onNavigate }) {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-cyan-600 transition">
          Home
        </button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Our Doctors &amp; Practice</span>
      </div>

      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
          <span>Premier Multidisciplinary Dentistry in Lower Manhattan</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
          Meet Our Doctors &amp; Clinical Team
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          At Lumia Dental, our mission is to deliver comprehensive, compassionate dental care in an unhurried, comfortable atmosphere. We bring together modern clinical innovations like 3D digital intraoral scanning, porcelain cosmetic artistry, and pediatric gentle care with genuine concierge service.
        </p>
      </div>

      {/* Doctors Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {BUSINESS_INFO.doctors.map((doctor) => (
          <div 
            key={doctor.id}
            className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 sm:p-9 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Doctor Header */}
              <div className="flex items-start gap-4 mb-6">
                {doctor.image ? (
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-500/30 shadow-md shrink-0" 
                    loading="lazy"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
                    {doctor.name.split(' ')[1]?.[0] || 'D'}
                  </div>
                )}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {doctor.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                    {doctor.role}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                    🎓 {doctor.credentials}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {doctor.bio}
              </p>

              {/* Clinical Specialties */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">
                  Clinical Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties.map((spec, i) => (
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

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => onOpenConsultation(doctor.specialties[0])}
                className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm transition shadow-sm active:scale-98"
              >
                Schedule with {doctor.name.split(' ')[1]}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Team Members Breakdown */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Dedicated Care Team
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
            Hygienists &amp; Patient Coordinators
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Our certified dental hygienists and care specialists are committed to gentle, thorough preventive cleanings and seamless patient experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUSINESS_INFO.teamMembers.map((member, i) => (
            <div 
              key={i}
              className="card-thick bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xl mb-3">
                ✦
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                {member.name}
              </h4>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The 3 Practice Pillars */}
      <div className="card-thick bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-cyan-800/50 shadow-xl mb-20">
        <div className="max-w-4xl">
          <span className="px-3 py-1 rounded-full bg-cyan-900/80 text-cyan-200 text-xs font-semibold uppercase tracking-wider border border-cyan-700/40 inline-block mb-4">
            Practice Values
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Our Core Promise: Convenience, Cutting Edge &amp; Total Comfort
          </h2>
          <p className="text-cyan-100/90 text-sm sm:text-base leading-relaxed mb-8">
            {BUSINESS_INFO.mission}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BUSINESS_INFO.pillars.map((pillar, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-cyan-50">
                <h4 className="font-bold text-cyan-300 text-sm mb-1">{pillar.title}</h4>
                <p className="text-[11px] font-semibold text-cyan-200/90 mb-1">{pillar.subtitle}</p>
                <p className="text-cyan-100/80 text-xs leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facility & Location Callout */}
      <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Visit Lumia Dental in Lower Manhattan
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {BUSINESS_INFO.address.formatted} (Steps from Fulton Center, Cortlandt St, &amp; WTC PATH).
          </p>
          <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium mt-1">
            Monday – Thursday 8:00 AM – 6:00 PM • Friday &amp; Alternating Saturdays
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="px-5 py-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {BUSINESS_INFO.phone}
          </a>
          <button
            onClick={() => onOpenConsultation()}
            className="px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 transition"
          >
            Book Online
          </button>
        </div>
      </div>
    </div>
  );
}
