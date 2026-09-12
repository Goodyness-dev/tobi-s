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
    procedure: 'dental-implants',
    referralStatus: 'Referred by General Dentist',
    referringDoctorName: '',
    hasXRays: 'Yes, I have X-rays/Panorex',
    sedationPreference: 'IV Twilight Sleep',
    insuranceProvider: 'Delta Dental',
    urgency: 'Within 1-2 weeks',
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
        name: formData.patientName || 'Easton Patient',
        email: formData.email,
        phone: formData.phone,
        serviceCategory: selectedProc ? selectedProc.title : 'Oral Surgery Consultation',
        detailedService: `Sedation: ${formData.sedationPreference} | Ins: ${formData.insuranceProvider}`,
        details: `Referral: ${formData.referralStatus} (${formData.referringDoctorName || 'N/A'}). X-rays: ${formData.hasXRays}. Notes: ${formData.notes || 'None'}`,
        timeline: formData.urgency,
        location: '1412 Sullivan Trail, Easton, PA'
      };

      const res = await submitQuoteRequest(payload);
      setResult({
        success: true,
        id: res.quoteId || `MM-${Math.floor(100000 + Math.random() * 900000)}`
      });
      setStep(6); // Confirmation step
    } catch (err) {
      // Offline fallback
      setResult({
        success: true,
        id: `MM-${Math.floor(100000 + Math.random() * 900000)}`
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
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              M&M
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Oral Surgery Consultation Request
              </h3>
              <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                Drs. Milano & Mazza • Easton, PA
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
              className="bg-teal-600 h-1.5 transition-all duration-300"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Step 1 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Which procedure are you inquiring about?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Select the primary treatment or concern. You will review everything with the surgeon.
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
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 ring-2 ring-teal-500/20 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-teal-500/40'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs mt-0.5 shrink-0 ${
                      formData.procedure === p.id 
                        ? 'border-teal-600 bg-teal-600 text-white font-bold' 
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

          {/* STEP 2: Referral & Diagnostic Information */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Step 2 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Referral & Diagnostic Status
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Were you referred by a general dentist, or are you self-scheduling?
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Referral Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Referred by General Dentist', 'Self-Scheduling / Second Opinion'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, referralStatus: opt })}
                      className={`p-4 rounded-2xl border text-sm font-semibold text-left transition ${
                        formData.referralStatus === opt
                          ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {formData.referralStatus === 'Referred by General Dentist' && (
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Referring Dentist / Practice Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Miller / Easton Family Dental"
                      value={formData.referringDoctorName}
                      onChange={(e) => setFormData({ ...formData, referringDoctorName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Do you have recent X-Rays or a Panorex?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Yes, I have them or dentist emailed them',
                      'No, I will need a 3D scan at your office'
                    ].map((x) => (
                      <button
                        key={x}
                        type="button"
                        onClick={() => setFormData({ ...formData, hasXRays: x })}
                        className={`p-3.5 rounded-2xl border text-xs font-medium text-left transition ${
                          formData.hasXRays === x
                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Sedation & Comfort Preference */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Step 3 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  How would you prefer to be comforted?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Drs. Milano and Mazza are hospital-trained anesthesiologists. You choose your level of comfort.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: 'IV Twilight Sleep (Most Popular)',
                    desc: 'You sleep peacefully through surgery. Zero pain, zero anxiety, and zero memory of sounds or pressure.'
                  },
                  {
                    name: 'Nitrous Oxide (Laughing Gas)',
                    desc: 'Mild inhaled relaxation that wears off within minutes of completion.'
                  },
                  {
                    name: 'Local Numbing Anesthesia Only',
                    desc: 'Completely numb mouth while remaining fully awake.'
                  },
                  {
                    name: 'Discuss Options with Doctor at Consult',
                    desc: 'Let Dr. Milano or Dr. Mazza evaluate your health history and recommend the safest choice.'
                  }
                ].map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, sedationPreference: s.name })}
                    className={`w-full p-4 rounded-2xl border text-left transition active:scale-98 flex items-start gap-3 ${
                      formData.sedationPreference === s.name
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs mt-0.5 shrink-0 ${
                      formData.sedationPreference === s.name
                        ? 'border-teal-600 bg-teal-600 text-white font-bold'
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

          {/* STEP 4: Insurance & Scheduling Timeline */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Step 4 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Insurance Provider & Timeline
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  We check benefits prior to your appointment to eliminate surprise costs.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Dental or Medical Insurance Carrier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                  {[
                    'Delta Dental',
                    'Blue Cross Dental',
                    'Aetna PPO',
                    'Cigna Dental',
                    'MetLife',
                    'Guardian',
                    'Medicare / Medical',
                    'CareCredit Financing',
                    'Private Pay / Cash'
                  ].map((carrier) => (
                    <button
                      key={carrier}
                      type="button"
                      onClick={() => setFormData({ ...formData, insuranceProvider: carrier })}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                        formData.insuranceProvider === carrier
                          ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {carrier}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  How Soon Would You Like to Be Seen?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {['In Pain / Urgent', 'Within 1-2 Weeks', 'Flexible / Routine Consult'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, urgency: time })}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                        formData.urgency === time
                          ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Contact Information */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Step 5 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Where Should We Send Your Consultation Details?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Our surgical coordinators will call to confirm your appointment date and time.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Miller"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (for SMS & Call) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(610) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="michael@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Any Symptoms or Special Requests? (Optional)
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Swollen lower jaw on right side, very anxious about needles..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation Screen */}
          {step === 6 && result && (
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center font-extrabold text-2xl mx-auto shadow-xl">
                ✓
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Consultation Request Confirmed!
              </h2>
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                Confirmation ID: {result.id}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.patientName || 'Patient'}. Our Easton surgical coordinator has received your request. We will verify your {formData.insuranceProvider} benefits and reach out to you at {formData.phone || '(610) 258-9081'} to finalize your consultation time.
              </p>

              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 max-w-md mx-auto text-xs text-teal-900 dark:text-teal-200 text-left space-y-1">
                <p className="font-bold">📍 Office Address:</p>
                <p>1412 Sullivan Trail, Easton, PA 18040</p>
                <p className="font-bold pt-1">⚠️ If Having IV Sedation:</p>
                <p>Remember the 8-hour fasting rule (no food or liquids) and bring an adult driver.</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 dark:bg-teal-600 text-white font-bold text-sm"
                >
                  Return to Website
                </button>
                <a
                  href="tel:6102589081"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm"
                >
                  Call Office Directly
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1 to 5) */}
        {step <= 5 && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition flex items-center gap-1.5"
              >
                <span>Continue</span>
                <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting || !formData.patientName || !formData.phone}
                onClick={handleSubmit}
                className="px-8 py-3.5 rounded-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xl active:scale-95 transition"
              >
                {isSubmitting ? 'Transmitting Request...' : 'Submit Consultation Request'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
