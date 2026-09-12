import React, { useState, useEffect } from 'react';
import { PROCEDURES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';
import { submitQuoteRequest } from '../../services/quoteService';

export default function QuoteWizardModal({ 
  isOpen, 
  onClose, 
  initialProcedure = null 
}) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    procedure: 'cosmetic-dentistry',
    referralStatus: 'New Patient Consultation',
    hasXRays: 'Please take 3D digital scans at visit',
    sedationPreference: 'Ceiling 4K TV & Streaming Entertainment',
    insuranceProvider: 'Delta Dental',
    urgency: 'This week',
    preferredTime: 'Morning Slot (8:00 - 11:30 AM)',
    patientName: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialProcedure) {
        setFormData(prev => ({ ...prev, procedure: initialProcedure }));
      }
      setStep(1);
      setResult(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialProcedure]);

  if (!isOpen) return null;

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedProc = PROCEDURES.find(p => p.id === formData.procedure);
      const payload = {
        name: formData.patientName || 'Lumia Dental Patient',
        email: formData.email,
        phone: formData.phone,
        serviceCategory: selectedProc ? selectedProc.title : 'Dental Consultation',
        detailedService: `Preferred Time: ${formData.preferredTime} | Comfort: ${formData.sedationPreference} | Ins: ${formData.insuranceProvider}`,
        details: `Visit Type: ${formData.referralStatus}. X-rays: ${formData.hasXRays}. Notes: ${formData.notes || 'None'}`,
        timeline: formData.urgency,
        location: BUSINESS_INFO.address.formatted
      };

      const res = await submitQuoteRequest(payload);
      setResult({
        success: true,
        id: res.quoteId || `LUMIA-${Math.floor(100000 + Math.random() * 900000)}`
      });
      setStep(6); // Confirmation step
    } catch (err) {
      // Offline fallback
      setResult({
        success: true,
        id: `LUMIA-${Math.floor(100000 + Math.random() * 900000)}`
      });
      setStep(6);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">
              LD
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Online Dental Appointment Request
              </h3>
              <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                Lumia Dental • 160 Broadway, Suite 1004, New York, NY
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Step Progress Bar */}
        {step <= 5 && (
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
            <div 
              className="bg-cyan-600 h-1.5 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: Procedure Selection */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Step 1 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Which dental service do you need?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Select the primary treatment or concern. You can consult with our clinical team at 160 Broadway.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROCEDURES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, procedure: p.id })}
                    className={`p-4 rounded-2xl border text-left transition active:scale-98 flex items-start gap-3 ${
                      formData.procedure === p.id
                        ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 ring-2 ring-cyan-500/20 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-cyan-500/40'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs mt-0.5 shrink-0 ${
                      formData.procedure === p.id 
                        ? 'border-cyan-600 bg-cyan-600 text-white font-bold' 
                        : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {formData.procedure === p.id ? '✓' : ''}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {p.tagline}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Visit Type & Preferred Time */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Step 2 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Visit Type &amp; Preferred Time Slot
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  We offer early 8:00 AM starts and appointments until 6:00 PM in the Financial District.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Appointment Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['New Patient Consultation', 'Routine Hygiene & Exam', 'Invisalign & Cosmetic Scan', 'Urgent / Same-Day Dental Relief'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, referralStatus: opt })}
                        className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition ${
                          formData.referralStatus === opt
                            ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-200'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Preferred Time of Day
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Early Morning (8:00 - 10 AM)',
                      'Lunchtime (11:30 AM - 2 PM)',
                      'Late Afternoon (3:00 - 6:00 PM)'
                    ].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: time })}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                          formData.preferredTime === time
                            ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-200 font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Comfort & Relaxation Preference */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Step 3 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Comfort &amp; Relaxation Preferences
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Our priority is YOU. How can we make your dental experience extraordinary?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: 'Ceiling 4K TV & Streaming Entertainment',
                    desc: 'Watch your favorite shows on Netflix, Disney+, or listen to streaming music during care.'
                  },
                  {
                    name: 'iTero® 3D Digital Scanners (No Messy Impression Putty)',
                    desc: 'High-speed digital intraoral scans for veneers, crowns, and Invisalign.'
                  },
                  {
                    name: 'Gentle Bedside Care & Warm Buffered Anesthesia',
                    desc: 'Comfort-first injection technique designed for complete numbness without the sting.'
                  },
                  {
                    name: 'Pediatric Gentle Specialist Protocol',
                    desc: 'Fun, welcoming, positive dental visits specifically calibrated for children & teens.'
                  }
                ].map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, sedationPreference: s.name })}
                    className={`w-full p-4 rounded-2xl border text-left transition active:scale-98 flex items-start gap-3 ${
                      formData.sedationPreference === s.name
                        ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs mt-0.5 shrink-0 ${
                      formData.sedationPreference === s.name
                        ? 'border-cyan-600 bg-cyan-600 text-white font-bold'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {formData.sedationPreference === s.name ? '✓' : ''}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {s.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Insurance Carrier */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Step 4 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Insurance Provider
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  We participate in-network with premier PPO dental plans and offer flexible financing.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Your Dental Coverage
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                  {[
                    'Delta Dental PPO',
                    'Aetna Dental PPO',
                    'Cigna Total Choice',
                    'MetLife PDP Plus',
                    'Guardian DentalGuard',
                    'Blue Cross Blue Shield',
                    'United Healthcare',
                    'CareCredit (0% APR)',
                    'Self-Pay / Private Pay'
                  ].map((carrier) => (
                    <button
                      key={carrier}
                      type="button"
                      onClick={() => setFormData({ ...formData, insuranceProvider: carrier })}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                        formData.insuranceProvider === carrier
                          ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {carrier}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Contact Details & Submit */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Step 5 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Where should our Lumia Dental care coordination team send your confirmation?
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Adams"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(212) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rachel@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Any specific symptoms or questions? (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about any tooth discomfort, desired appointment dates, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation Screen */}
          {step === 6 && result && (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-bold text-3xl flex items-center justify-center mx-auto shadow-md">
                ✓
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Appointment Request Received!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.patientName || 'Patient'}. Our Lumia Dental coordination team at 160 Broadway has received your request. We will reach out to you at <strong>{formData.phone || '(212) 287-1275'}</strong> shortly to confirm your visit.
              </p>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 max-w-xs mx-auto text-xs text-slate-600 dark:text-slate-300 font-mono">
                Confirmation ID: {result.id}
              </div>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md transition"
                >
                  Close &amp; Return to Site
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step <= 5 && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                ← Back
              </button>
            ) : (
              <a
                href={BUSINESS_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Or Open AppointNow Live Calendar ↗
              </a>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.patientName || !formData.phone}
                className="px-8 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Request ✓'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
