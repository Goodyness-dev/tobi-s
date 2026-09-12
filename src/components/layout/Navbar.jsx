import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';
import { PROCEDURES } from '../../data/servicesData';

export default function Navbar({ 
  onOpenConsultation, 
  currentPage, 
  onNavigate, 
  darkMode, 
  onToggleDarkMode 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [procDropdownOpen, setProcDropdownOpen] = useState(false);

  // Close dropdown on outside click or navigation
  useEffect(() => {
    setProcDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [currentPage]);

  return (
    <header className="fixed top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 max-w-7xl mx-auto z-50">
      {/* Curved Floating Pill Navigation Bar */}
      <nav className="rounded-full bg-white/95 dark:bg-[#090e18]/95 backdrop-blur-md shadow-xl border-2 border-slate-200/90 dark:border-slate-800/90 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-colors">
        
        {/* Brand Logo & Name */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 via-cyan-600 to-sky-600 text-white flex items-center justify-center font-black text-base shadow-md shadow-teal-600/30 group-hover:scale-105 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.5 2 6 4.5 6 7.5C6 9.5 7 11 8 13C9 15 9.5 17 9 20C8.8 21.2 9.8 22 11 22H13C14.2 22 15.2 21.2 15 20C14.5 17 15 15 16 13C17 11 18 9.5 18 7.5C18 4.5 15.5 2 12 2Z" />
              <path d="M9 8.5C10 7.5 14 7.5 15 8.5" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight leading-none block">
              {BUSINESS_INFO.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-teal-600 dark:text-teal-400 tracking-wider uppercase">
              Lower Manhattan • 160 Broadway
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
          <button 
            onClick={() => onNavigate('home')}
            className={`hover:text-teal-600 dark:hover:text-teal-400 transition ${currentPage === 'home' ? 'text-teal-600 dark:text-teal-400' : ''}`}
          >
            Home
          </button>

          {/* Services & Procedures Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProcDropdownOpen(!procDropdownOpen)}
              className="flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              <span>Specialties</span>
              <svg className={`w-3.5 h-3.5 transition-transform ${procDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {procDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-72 rounded-3xl bg-white dark:bg-[#0f172a] shadow-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1 animate-fadeIn">
                {PROCEDURES.slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate(`procedure-${p.slug}`);
                      setProcDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-teal-50 dark:hover:bg-teal-950/50 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 flex items-center justify-between group transition"
                  >
                    <span>{p.title}</span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition">▶</span>
                  </button>
                ))}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    onClick={() => {
                      onNavigate('procedures');
                      setProcDropdownOpen(false);
                    }}
                    className="w-full text-center py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-teal-700 dark:text-teal-300 hover:bg-slate-200 transition"
                  >
                    View All 8 Specialties →
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => onNavigate('about')}
            className={`hover:text-teal-600 dark:hover:text-teal-400 transition ${currentPage === 'about' ? 'text-teal-600 dark:text-teal-400' : ''}`}
          >
            Our Doctors
          </button>

          <button 
            onClick={() => onNavigate('procedure-cosmetic-dentistry')}
            className={`hover:text-teal-600 dark:hover:text-teal-400 transition ${currentPage === 'procedure-cosmetic-dentistry' ? 'text-teal-600 dark:text-teal-400' : ''}`}
          >
            Cosmetic & Veneers
          </button>

          <button 
            onClick={() => onNavigate('procedure-invisalign-aligners')}
            className={`hover:text-teal-600 dark:hover:text-teal-400 transition ${currentPage === 'procedure-invisalign-aligners' ? 'text-teal-600 dark:text-teal-400' : ''}`}
          >
            Invisalign®
          </button>

          <button 
            onClick={() => onNavigate('procedure-pediatric-dentistry')}
            className={`hover:text-teal-600 dark:hover:text-teal-400 transition ${currentPage === 'procedure-pediatric-dentistry' ? 'text-teal-600 dark:text-teal-400' : ''}`}
          >
            Pediatric
          </button>

          <button 
            onClick={() => onNavigate('patient-info')}
            className={`hover:text-teal-600 dark:hover:text-teal-400 transition ${currentPage === 'patient-info' ? 'text-teal-600 dark:text-teal-400' : ''}`}
          >
            Patient Info
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {darkMode ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Call / Text Phone Button */}
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
            title={`Call ${BUSINESS_INFO.phone}`}
          >
            <svg className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden xl:inline text-slate-500 font-medium">Call/Text:</span>
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          {/* Primary CTA: Book Online */}
          <button
            onClick={() => onOpenConsultation()}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-teal-600/20 active:scale-95 transition"
          >
            Book Online
          </button>

          {/* Mobile Menu Burger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open mobile menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 rounded-3xl bg-white/95 dark:bg-[#090e18]/95 backdrop-blur-md shadow-2xl border-2 border-slate-200 dark:border-slate-800 animate-fadeIn space-y-2.5">
          <button 
            onClick={() => onNavigate('home')} 
            className="w-full text-left p-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800"
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('procedures')} 
            className="w-full text-left p-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800 flex items-center justify-between"
          >
            <span>All 8 Specialties</span>
            <span className="text-xs text-teal-600 dark:text-teal-400">View Catalog ▶</span>
          </button>
          <button 
            onClick={() => onNavigate('about')} 
            className="w-full text-left p-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800"
          >
            Our 9 Specialists & Team
          </button>
          <button 
            onClick={() => onNavigate('procedure-cosmetic-dentistry')} 
            className="w-full text-left p-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800"
          >
            Cosmetic Dentistry & Veneers
          </button>
          <button 
            onClick={() => onNavigate('procedure-invisalign-aligners')} 
            className="w-full text-left p-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800"
          >
            Invisalign® Clear Aligners
          </button>
          <button 
            onClick={() => onNavigate('procedure-pediatric-dentistry')} 
            className="w-full text-left p-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800"
          >
            Pediatric Dentistry
          </button>
          <button 
            onClick={() => onNavigate('patient-info')} 
            className="w-full text-left p-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800"
          >
            New Patients & Insurance
          </button>
          
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Call {BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={() => onOpenConsultation()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-xs shadow-md"
            >
              Book Your Appointment Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
