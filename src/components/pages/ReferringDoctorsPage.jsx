import React, { useState } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ReferringDoctorsPage({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    doctorName: '',
    practiceName: '',
    doctorPhone: '',
    doctorEmail: '',
    patientName: '',
    patientPhone: '',
    procedureType: 'Dental Implants',
    notes: '',
    xrayAttached: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-teal-600 transition">
          Home
        </button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Referring Doctors Portal</span>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800/60 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
          <span>Doctor-to-Doctor Partnership</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
          General Dentist & Orthodontic Referral Studio
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Drs. Milano and Mazza view the relationship with referring dentists as an integrated surgical team. We provide rapid consultation scheduling, comprehensive treatment letters, and seamless transfer back to your office for final restorative crown and bridge placement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Referral Form */}
        <div className="lg:col-span-7 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Submit an Online Patient Referral
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            Directly transmitted to our surgical coordinators. We contact your patient within 24 hours.
          </p>

          {submitted ? (
            <div className="p-8 rounded-3xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md">
                ✓
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Referral Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Thank you, Dr. {doctorForm.doctorName}. We have logged the referral for {doctorForm.patientName}. A surgical consult report will be dispatched to your practice upon completion of the visit.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 dark:bg-teal-600 text-white text-xs font-bold"
              >
                Submit Another Referral
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Referring Doctor Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Robert Smith"
                    value={doctorForm.doctorName}
                    onChange={(e) => setDoctorForm({ ...doctorForm, doctorName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Practice Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Valley Dental Care"
                    value={doctorForm.practiceName}
                    onChange={(e) => setDoctorForm({ ...doctorForm, practiceName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Doctor Phone / Backline *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(610) 000-0000"
                    value={doctorForm.doctorPhone}
                    onChange={(e) => setDoctorForm({ ...doctorForm, doctorPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Doctor Office Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="office@valleydental.com"
                    value={doctorForm.doctorEmail}
                    onChange={(e) => setDoctorForm({ ...doctorForm, doctorEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              <hr className="border-slate-200 dark:border-slate-800 my-2" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Miller"
                    value={doctorForm.patientName}
                    onChange={(e) => setDoctorForm({ ...doctorForm, patientName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(610) 000-0000"
                    value={doctorForm.patientPhone}
                    onChange={(e) => setDoctorForm({ ...doctorForm, patientPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Procedure Requested
                </label>
                <select
                  value={doctorForm.procedureType}
                  onChange={(e) => setDoctorForm({ ...doctorForm, procedureType: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                >
                  <option value="Dental Implants">Dental Implants (Single / Multiple)</option>
                  <option value="All-on-X / Full Arch">Full Arch Immediate Load (All-on-4 / All-on-X)</option>
                  <option value="Wisdom Teeth">Wisdom Teeth Extraction</option>
                  <option value="Bone Graft / Sinus Lift">Bone Grafting / Sinus Lift</option>
                  <option value="Impacted Canine">Impacted Canine Exposure & Bracketing</option>
                  <option value="Orthognathic Jaw Surgery">Orthognathic / Corrective Jaw Surgery</option>
                  <option value="Oral Pathology">Oral Pathology / Biopsy Evaluation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Clinical Notes / Tooth #
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Tooth #19 extraction with socket preservation for future implant restoration..."
                  value={doctorForm.notes}
                  onChange={(e) => setDoctorForm({ ...doctorForm, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              {/* Simulated Drag & Drop for Radiographs */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center hover:border-teal-500 transition cursor-pointer">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  📁 Attach CBCT / Panorex / Periapical X-Rays
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  DICOM, JPEG, or PDF accepted (or email directly to info@milanoandmazzaoralsurgery.com)
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm tracking-wide shadow-md active:scale-98 transition"
              >
                Submit Clinical Referral
              </button>
            </form>
          )}
        </div>

        {/* Right: Practice Credentials & Doctor Hotline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-thick bg-gradient-to-b from-teal-900 to-slate-950 text-white rounded-3xl p-8 border-2 border-teal-700/50 shadow-xl">
            <span className="px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-semibold uppercase tracking-wider inline-block mb-3 border border-teal-600/40">
              Direct Provider Hotline
            </span>
            <h3 className="text-2xl font-bold mb-2">
              Speak Directly with Dr. Milano or Dr. Mazza
            </h3>
            <p className="text-teal-100/90 text-sm leading-relaxed mb-6">
              Need to discuss an urgent case, complex airway concern, or CBCT implant planning? Call our provider backline directly.
            </p>

            <a
              href="tel:6102589081"
              className="w-full py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-50 transition active:scale-98 shadow-md"
            >
              <span>Call Doctor Line: (610) 258-9081</span>
            </a>

            <div className="mt-6 pt-6 border-t border-teal-800/80 text-xs text-teal-200/80 space-y-2">
              <p>📍 1412 Sullivan Trail, Easton, PA 18040</p>
              <p>📠 Secure Referral Fax: (610) 258-0377</p>
              <p>✉️ Doctor Portal Email: info@milanoandmazzaoralsurgery.com</p>
            </div>
          </div>

          <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm">
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-3">
              Our Promise to Referring Doctors
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-500 font-bold">✓</span>
                <span>Immediate patient contact within 24 business hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 font-bold">✓</span>
                <span>Complete post-op surgical and radiographic treatment letter sent to your office.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 font-bold">✓</span>
                <span>Patients are always directed back to your practice for all restorative work.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
