import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate, darkMode, onToggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Services', target: 'services' },
    { name: 'About', target: '#about' },
    { name: 'Amenities', target: '#amenities' },
    { name: 'Location', target: '#location' },
    { name: 'Reviews', target: '#reviews' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-neutral-900' 
          : 'bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-900'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <button 
          onClick={(e) => handleNavClick(e, '#')} 
          className="flex items-center space-x-3 group text-left"
          aria-label="Toby's Auto Mechanic Home"
        >
          <img 
            src="/logo.png" 
            alt="Toby's Auto Mechanic Logo - Casa Grande AZ" 
            width="160"
            height="40"
            decoding="async"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
              Toby's <span className="text-red-700 dark:text-red-600">Auto</span>
            </span>
            <span className="text-xs sm:text-sm tracking-wider uppercase text-gray-500 dark:text-neutral-400 hidden xs:block font-medium">
              Diesel & Auto Care
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = link.target === 'services' && currentPage === 'services';
            return (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`text-base font-semibold transition-colors ${
                  isActive 
                    ? 'text-red-700 dark:text-red-500 font-bold' 
                    : 'text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTAs & Dark Mode Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Midnight Dark Mode Toggle Pill */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-[#111111] text-gray-800 dark:text-neutral-200 hover:border-red-400 dark:hover:border-neutral-700 transition cursor-pointer shadow-sm active:scale-95"
            aria-label={darkMode ? "Switch to light mode" : "Switch to midnight black mode"}
            title={darkMode ? "Switch to light mode" : "Switch to midnight black mode"}
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="text-xs font-bold text-neutral-200">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-bold text-neutral-800">Dark</span>
              </>
            )}
          </button>

          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center space-x-2 text-base text-gray-800 dark:text-neutral-200 hover:text-red-700 dark:hover:text-red-500 font-bold transition"
            aria-label={`Call Toby's Auto Mechanic: ${BUSINESS_INFO.phone}`}
          >
            <Phone className="w-4 h-4 text-red-700 dark:text-red-600" aria-hidden="true" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <button
            onClick={() => onOpenWizard()}
            className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base transition-colors shadow-sm active:scale-95"
            aria-label="Launch Free Quote Wizard"
          >
            <span>Free Quote</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center space-x-2.5">
          {/* Mobile Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-[#111111] text-gray-800 dark:text-neutral-200 transition cursor-pointer active:scale-95"
            aria-label={darkMode ? "Switch to light mode" : "Switch to midnight black mode"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-800" />
            )}
          </button>

          <button
            onClick={() => onOpenWizard()}
            className="px-3.5 py-2 rounded-xl bg-red-700 text-white text-sm font-bold active:scale-95 shadow-sm"
            aria-label="Get Free Quote"
          >
            Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-900"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-neutral-900 px-5 pt-3 pb-6 space-y-2 shadow-2xl" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.target)}
              className="w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-100 dark:border-neutral-900 space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white font-bold text-base bg-gray-50 dark:bg-[#111111]"
              aria-label={`Call ${BUSINESS_INFO.phone}`}
            >
              <Phone className="w-5 h-5 text-red-700 dark:text-red-600" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenWizard(); }}
              className="w-full py-3.5 rounded-xl bg-red-700 text-white font-bold text-base shadow-sm"
              aria-label="Get Free Quote Now"
            >
              Get a Free Quote
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
