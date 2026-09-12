import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { PROCEDURES } from '../../data/servicesData';

export default function Footer({ onOpenConsultation, onNavigate }) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Practice Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 via-cyan-600 to-sky-600 text-white flex items-center justify-center font-black text-base shadow-md shadow-teal-600/30">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.5 2 6 4.5 6 7.5C6 9.5 7 11 8 13C9 15 9.5 17 9 20C8.8 21.2 9.8 22 11 22H13C14.2 22 15.2 21.2 15 20C14.5 17 15 15 16 13C17 11 18 9.5 18 7.5C18 4.5 15.5 2 12 2Z" />
                  <path d="M9 8.5C10 7.5 14 7.5 15 8.5" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white block leading-none">
                  {BUSINESS_INFO.name}
                </span>
                <span className="text-[10px] font-semibold text-teal-400 uppercase tracking-wider">
                  Lower Manhattan • 160 Broadway
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Where cutting edge dentistry meets a modern patient experience. Comprehensive cosmetic, Invisalign, and specialty care in an anxiety-free sanctuary on Broadway.
            </p>
            <div className="text-xs text-slate-300 space-y-1.5">
              <p className="flex items-start gap-1.5">
                <span className="text-teal-400 font-bold">📍</span>
                <span>{BUSINESS_INFO.address.formatted}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">📞</span>
                <span>Call / Text: <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} className="text-teal-400 font-semibold hover:underline">{BUSINESS_INFO.phone}</a></span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">✉️</span>
                <span>Email: <a href={`mailto:${BUSINESS_INFO.email}`} className="text-teal-400 hover:underline">{BUSINESS_INFO.email}</a></span>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                🚇 2 min walk from Fulton Center & Cortlandt St Subways.
              </p>
            </div>
          </div>

          {/* Col 2: Services & Treatments */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Clinical Specialties
            </h4>
            <ul className="space-y-2 text-xs">
              {PROCEDURES.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onNavigate(`procedure-${p.slug}`)}
                    className="hover:text-teal-400 text-left transition"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('procedures')}
                  className="text-teal-400 font-semibold hover:underline pt-1 block"
                >
                  View All 8 Specialties →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practice Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Practice & Patients
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-teal-400 transition">
                  Meet Our 9 Specialists & Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('procedure-cosmetic-dentistry')} className="hover:text-teal-400 transition">
                  Cosmetic Veneers & Makeovers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('procedure-invisalign-aligners')} className="hover:text-teal-400 transition">
                  Invisalign® Diamond Provider
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('procedure-pediatric-dentistry')} className="hover:text-teal-400 transition">
                  Board-Certified Pediatric Care
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('patient-info')} className="hover:text-teal-400 transition">
                  New Patient Info & PPO Insurances
                </button>
              </li>
              <li>
                <a 
                  href={BUSINESS_INFO.bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition flex items-center gap-1"
                >
                  <span>AppointNow Direct Calendar</span>
                  <span className="text-[10px] text-teal-400">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href={BUSINESS_INFO.zocdocUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-teal-400 transition flex items-center gap-1"
                >
                  <span>ZocDoc Verified Profile</span>
                  <span className="text-[10px] text-teal-400">↗</span>
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-teal-400 transition text-slate-500">
                  Staff Portal (#/admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Office Hours & Immediate Booking */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Practice Hours
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Mon – Thu:</span>
                <span className="font-semibold text-white">8:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Friday:</span>
                <span className="font-semibold text-white">8:00 AM – 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Saturday:</span>
                <span className="font-semibold text-white">8:30 AM – 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-slate-800">
                <span>Sunday:</span>
                <span>Closed (Emergency On-Call)</span>
              </div>
            </div>
            <button
              onClick={() => onOpenConsultation()}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs tracking-wide transition shadow-md active:scale-95"
            >
              Book Smile Appointment
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{BUSINESS_INFO.legalName} © {new Date().getFullYear()} | All Rights Reserved.</p>
          <p>{BUSINESS_INFO.address.formatted} • Financial District • Lower Manhattan, NYC</p>
        </div>
      </div>
    </footer>
  );
}
