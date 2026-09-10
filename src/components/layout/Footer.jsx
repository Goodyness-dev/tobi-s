import React from 'react';
import { Phone, MapPin, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-black text-neutral-400 text-sm sm:text-base pb-16 sm:pb-0 border-t border-neutral-900" role="contentinfo">
      {/* Pre-footer CTA Bar (Bigger typography) */}
      <div className="bg-red-700 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
              Need reliable auto or diesel repair in Casa Grande?
            </h3>
            <p className="text-red-100 mt-2 text-sm sm:text-lg">
              Get an honest, transparent quote breakdown in under 2 minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => onOpenWizard()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-red-700 font-bold text-base hover:bg-gray-50 transition shadow-md active:scale-95 text-center"
              aria-label="Get a Free Quote Now"
            >
              Get a Free Quote
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-base transition border border-red-600 flex items-center justify-center space-x-2.5 active:scale-95 text-center"
              aria-label={`Call Toby's Auto Mechanic at ${BUSINESS_INFO.phone}`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Toby's Auto Mechanic Logo" 
              width="160"
              height="40"
              loading="lazy"
              decoding="async"
              className="h-10 w-auto object-contain brightness-200" 
            />
            <span className="font-heading font-black text-white text-base sm:text-lg">
              TOBY'S AUTO MECHANIC
            </span>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Dependable diesel and automotive repair serving Casa Grande, Eloy, Coolidge, and Pinal County. Family-owned and operated since 2009.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm sm:text-base">
            {[
              { label: 'All Services Catalog', target: 'services' },
              { label: 'About Toby', target: '#about' },
              { label: 'Shop Amenities', target: '#amenities' },
              { label: 'Hours & Location Map', target: '#location' },
              { label: 'Verified Reviews', target: '#reviews' },
            ].map(link => (
              <li key={link.label}>
                <button 
                  onClick={(e) => handleLinkClick(e, link.target)} 
                  className="hover:text-white transition text-gray-300 hover:underline text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-4">Shop Hours</h4>
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span>Mon – Fri</span>
              <span className="text-white font-semibold">8:00 AM – 5:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span className="text-amber-400 font-semibold">By Appointment</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span className="text-red-400 font-semibold">Closed</span>
            </div>
          </div>
        </div>

        {/* Contact (Semantic Address) */}
        <div>
          <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-4">Contact Shop</h4>
          <address className="not-italic space-y-3 text-sm sm:text-base">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-gray-300">
                {BUSINESS_INFO.address.street}<br />
                {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
              <a 
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} 
                className="text-white hover:text-red-400 font-bold transition"
                aria-label={`Call phone: ${BUSINESS_INFO.phone}`}
              >
                {BUSINESS_INFO.phone}
              </a>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-400 hover:text-red-300 font-bold pt-1"
              aria-label="Open directions in Google Maps"
            >
              <span>Get Driving Directions</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 px-4 text-center text-xs sm:text-sm text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.</span>
          <div className="flex items-center space-x-4">
            <span>Casa Grande, AZ Auto & Diesel Specialist</span>
            <span>•</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-neutral-500 hover:text-red-400 transition underline underline-offset-2"
            >
              Shop Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
