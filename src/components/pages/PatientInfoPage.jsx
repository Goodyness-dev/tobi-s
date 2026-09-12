import React, { useState } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function PatientInfoPage({ onOpenConsultation, onNavigate }) {
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [digitalFormSubmitted, setDigitalFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    phone: '',
    email: '',
    insuranceCarrier: '',
    procedureConcern: 'Cosmetic Dentistry & Veneers',
    sedationInterest: 'Ceiling 4K TV & Streaming Entertainment'
  });

  const handleInsuranceCheck = (name) => {
    setSelectedInsurance(name);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDigitalFormSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-cyan-600 transition">
          Home
        </button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">New Patient Information &amp; Insurance</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
          <span>Welcome to Lumia Dental</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
          First Visit Expectations &amp; Insurance
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          We understand that your time and comfort are essential. At Lumia Dental, our multidisciplinary clinical team ensures your visit to 160 Broadway is smooth, luxurious, and completely stress-free.
        </p>
      </div>

      {/* First Visit Expectations 3 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold flex items-center justify-center mb-4">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Seamless Digital Intake &amp; Greeting
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Paperless digital registration from your phone or reception iPad. We welcome you to our quiet boutique lounge on the 10th floor with zero wait times.
          </p>
        </div>

        <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold flex items-center justify-center mb-4">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            3D Digital Scans &amp; Gentle Exam
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            High-definition intraoral 3D scans and gentle ultrasonic cleaning while you watch Netflix or listen to your favorite playlist on overhead 4K displays.
          </p>
        </div>

        <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold flex items-center justify-center mb-4">
            03
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Transparent Care &amp; Zero Hidden Fees
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Clear, itemized treatment plans and instant insurance benefit verification before any clinical work starts. We maximize your PPO benefits automatically.
          </p>
        </div>
      </div>

      {/* Interactive In-Network Insurance Checker */}
      <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Insurance &amp; Financial Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-2">
            In-Network PPO Plans &amp; Flexible Financing
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            We work with leading PPO insurers to ensure Manhattan professionals and families maximize their dental benefits seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {BUSINESS_INFO.insurancePartners.map((ins, i) => (
            <button
              key={i}
              onClick={() => handleInsuranceCheck(ins.name)}
              className={`p-4 rounded-2xl border text-center transition active:scale-95 ${
                selectedInsurance === ins.name
                  ? 'bg-cyan-50 dark:bg-cyan-950 border-cyan-600 text-cyan-900 dark:text-cyan-100 font-bold ring-2 ring-cyan-500/20'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:border-cyan-500/40'
              }`}
            >
              <p className="text-sm font-bold">{ins.name}</p>
              <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                {ins.status}
              </span>
            </button>
          ))}
        </div>

        {selectedInsurance && (
          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-center text-sm text-cyan-900 dark:text-cyan-200 animate-fadeIn">
            ✓ <strong>{selectedInsurance}</strong> is accepted at Lumia Dental in Lower Manhattan. Our care coordinators handle all claim submissions for you.
          </div>
        )}
      </div>

      {/* Online Patient Intake Studio */}
      <div className="card-thick bg-gradient-to-br from-slate-900 via-[#0c1322] to-slate-950 text-white rounded-3xl border-2 border-slate-700/60 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-400/30 inline-block mb-3">
              Fast Digital Registration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Request Your Initial Visit Online
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Submit your request in advance to save time. You can also schedule directly through our AppointNow live calendar.
            </p>
          </div>

          {digitalFormSubmitted ? (
            <div className="p-8 rounded-3xl bg-cyan-950/80 border border-cyan-500/40 text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-2xl mx-auto shadow-lg">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white">
                Request Received!
              </h3>
              <p className="text-cyan-200 text-sm max-w-md mx-auto">
                Thank you, {formData.fullName || 'Patient'}. Our Lumia Dental team at 160 Broadway has received your details. We will contact you at {formData.phone || '(212) 287-1275'} to confirm your appointment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(212) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Service Needed
                  </label>
                  <select
                    value={formData.procedureConcern}
                    onChange={(e) => setFormData({ ...formData, procedureConcern: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                  >
                    <option value="Cosmetic Dentistry & Veneers">Cosmetic Porcelain Veneers &amp; Smile Design</option>
                    <option value="Invisalign Clear Aligners">Invisalign® Clear Aligners</option>
                    <option value="Pediatric Gentle Dental Care">Pediatric Dentistry (Children &amp; Teens)</option>
                    <option value="Dental Implants">Dental Implants &amp; Restorations</option>
                    <option value="Routine Hygiene & Exam">Routine Cleaning &amp; Dental Exam</option>
                    <option value="Endodontics & Root Canals">Endodontics / Root Canal Relief</option>
                    <option value="Periodontics & Gum Therapy">Periodontics &amp; Gum Health</option>
                    <option value="Toothache / Emergency">Emergency Tooth Pain Relief</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Comfort &amp; Scheduling Preference
                  </label>
                  <select
                    value={formData.sedationInterest}
                    onChange={(e) => setFormData({ ...formData, sedationInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                  >
                    <option value="Early Morning (8:00 AM)">Early Morning Slot (8:00 AM)</option>
                    <option value="Lunchtime (12:00 PM)">Lunchtime Slot (12:00 PM)</option>
                    <option value="Evening Slot (Until 6:00 PM)">Evening Slot (Until 6:00 PM)</option>
                    <option value="Ceiling 4K TV & Streaming">Ceiling 4K TV &amp; Netflix Entertainment</option>
                    <option value="Gentle Warm Anesthesia">Gentle Warm Local Numbing</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm tracking-wide shadow-xl active:scale-98 transition"
              >
                Submit Patient Registration Request
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-3 text-xs text-slate-400 gap-2">
                <span>🔒 Confidential &amp; Encrypted HIPAA Protection</span>
                <a 
                  href={BUSINESS_INFO.bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Or Book Directly on AppointNow Calendar ↗
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
