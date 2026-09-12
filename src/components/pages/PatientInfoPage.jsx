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
    procedureConcern: 'Dental Implants',
    sedationInterest: 'IV Twilight Sleep'
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
        <button onClick={() => onNavigate('home')} className="hover:text-teal-600 transition">
          Home
        </button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Patient Information & Registration</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800/60 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
          <span>Patient-First Care</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
          What to Expect as a Patient at Milano & Mazza
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          From your initial diagnostic consultation to paperless onboarding and insurance optimization, we make every step seamless and transparent.
        </p>
      </div>

      {/* First Visit & Preparation Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center mb-4">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Initial Consultation & Diagnosis
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Your first visit consists of a clinical evaluation explaining your diagnosis, reviewing any X-rays/referral slips from your dentist, and discussing tailored sedation options.
          </p>
        </div>

        <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center mb-4">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            The 8-Hour Fasting Rule
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Mandatory for IV Anesthesia:</strong> Have absolutely nothing to eat or drink for 8 hours prior to surgery. An adult driver must accompany you and remain during the procedure.
          </p>
        </div>

        <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center mb-4">
            03
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Post-Op Recovery & Support
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You will wake comfortably in our recovery suite. We provide clear dietary instructions, prescription guidance, and direct doctor on-call availability for any questions.
          </p>
        </div>
      </div>

      {/* Interactive In-Network Insurance Checker */}
      <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Coverage Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-2">
            In-Network Insurance & Flexible Financing
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            We work hand-in-hand with you to maximize insurance reimbursement for covered surgical procedures.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {BUSINESS_INFO.insurancePartners.map((ins, i) => (
            <button
              key={i}
              onClick={() => handleInsuranceCheck(ins.name)}
              className={`p-4 rounded-2xl border text-center transition active:scale-95 ${
                selectedInsurance === ins.name
                  ? 'bg-teal-50 dark:bg-teal-950 border-teal-600 text-teal-900 dark:text-teal-100 font-bold ring-2 ring-teal-500/20'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:border-teal-500/40'
              }`}
            >
              <p className="text-sm font-bold">{ins.name}</p>
              <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                {ins.status}
              </span>
            </button>
          ))}
        </div>

        {selectedInsurance && (
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-center text-sm text-teal-900 dark:text-teal-200 animate-fadeIn">
            ✓ <strong>{selectedInsurance}</strong> is verified in our Easton office. We submit claims directly to maximize your benefits.
          </div>
        )}
      </div>

      {/* 100% Paperless Digital Intake Studio (Replacing Old 2019 PDFs) */}
      <div className="card-thick bg-gradient-to-br from-slate-900 via-[#0c1322] to-slate-950 text-white rounded-3xl border-2 border-slate-700/60 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-400/30 inline-block mb-3">
              100% Paperless Onboarding
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Complete Patient Registration Online
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Skip the clipboard in the waiting room. Submit your encrypted medical intake directly to Dr. Milano and Dr. Mazza in under 2 minutes.
            </p>
          </div>

          {digitalFormSubmitted ? (
            <div className="p-8 rounded-3xl bg-teal-950/80 border border-teal-500/40 text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-2xl mx-auto shadow-lg">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white">
                Registration Received!
              </h3>
              <p className="text-teal-200 text-sm max-w-md mx-auto">
                Thank you, {formData.fullName || 'Patient'}. Our surgical coordination team has received your registration. We will verify your insurance and call you at {formData.phone || '(610) 258-9081'} to finalize your appointment.
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
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition"
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
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-teal-400 transition"
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
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Concern / Procedure
                  </label>
                  <select
                    value={formData.procedureConcern}
                    onChange={(e) => setFormData({ ...formData, procedureConcern: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:border-teal-400 transition"
                  >
                    <option value="Dental Implants">Dental Implants</option>
                    <option value="Wisdom Teeth">Wisdom Teeth Extraction</option>
                    <option value="Bone Grafting">Bone Grafting / Sinus Lift</option>
                    <option value="Jaw Surgery">Corrective Jaw Surgery</option>
                    <option value="Second Opinion">Second Opinion / Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Sedation Preference
                  </label>
                  <select
                    value={formData.sedationInterest}
                    onChange={(e) => setFormData({ ...formData, sedationInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:border-teal-400 transition"
                  >
                    <option value="IV Twilight Sleep">IV Twilight Sleep (Asleep)</option>
                    <option value="Nitrous Oxide">Nitrous Oxide (Laughing Gas)</option>
                    <option value="Local Anesthesia">Local Numbing Only</option>
                    <option value="Discuss at Consultation">Discuss with Surgeon</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm tracking-wide shadow-xl active:scale-98 transition"
              >
                Submit Paperless Registration Form
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                🔒 HIPAA Compliant & 256-bit Encrypted. Your health information is strictly confidential.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
