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
    procedureType: 'Dental Implants & Periodontics',
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
          General Dentist & Specialist Referral Studio
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          At Lumia Dental, we view referring practitioners as valued partners. Our in-house specialists in Periodontics, Endodontics, Orthodontics (Invisalign Diamond), and Pediatric Dentistry provide seamless collaborative care, timely consult reports, and prompt transition back to your office.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Referral Form */}
        <div className="lg:col-span-7 card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Submit an Online Patient Referral
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            Directly transmitted to our clinical coordinators. We contact your patient within 24 hours.
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
                Thank you, Dr. {doctorForm.doctorName}. We have logged the referral for {doctorForm.patientName}. A clinical treatment report will be dispatched to your practice upon completion of the visit.
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
                    placeholder="e.g. Manhattan Dental Group"
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
                    placeholder="(212) 000-0000"
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
                    placeholder="doctor@practice.com"
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
                    placeholder="e.g. Jane Doe"
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
                    placeholder="(212) 000-0000"
                    value={doctorForm.patientPhone}
                    onChange={(e) => setDoctorForm({ ...doctorForm, patientPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Specialty Referral Category
                </label>
                <select
                  value={doctorForm.procedureType}
                  onChange={(e) => setDoctorForm({ ...doctorForm, procedureType: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                >
                  <option value="Dental Implants & Periodontics">Periodontics & Dental Implants (Dr. Bagga)</option>
                  <option value="Endodontics / Root Canal">Microscopic Endodontics / Root Canal (Dr. Drummond)</option>
                  <option value="Orthodontics & Invisalign">Invisalign® Clear Aligners (Dr. Goodman)</option>
                  <option value="Pediatric Dentistry">Pediatric Dentistry (Dr. Lobo)</option>
                  <option value="Cosmetic & Veneers">Cosmetic Smile Rehabilitation (Dr. Han / Dr. Lyristis)</option>
                  <option value="Second Opinion">Specialist Second Opinion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Clinical Notes / Tooth #
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Tooth #14 root canal therapy needed, or #19 implant placement evaluation..."
                  value={doctorForm.notes}
                  onChange={(e) => setDoctorForm({ ...doctorForm, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              {/* Simulated Drag & Drop for Radiographs */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center hover:border-teal-500 transition cursor-pointer">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  📁 Attach Digital Radiographs / Panorex / STL Scans
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  DICOM, JPEG, STL, or PDF accepted (or email to {BUSINESS_INFO.email})
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
              Direct Doctor Hotline
            </span>
            <h3 className="text-2xl font-bold mb-2">
              Speak Directly with Our Specialists
            </h3>
            <p className="text-teal-100/90 text-sm leading-relaxed mb-6">
              Need to discuss an urgent case, complex endodontic diagnosis, or implant treatment plan? Call our clinical backline directly.
            </p>

            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-50 transition active:scale-98 shadow-md"
            >
              <span>Call Provider Line: {BUSINESS_INFO.phone}</span>
            </a>

            <div className="mt-6 pt-6 border-t border-teal-800/80 text-xs text-teal-200/80 space-y-2">
              <p>📍 {BUSINESS_INFO.address.formatted}</p>
              <p>📱 Call or Text: {BUSINESS_INFO.phone}</p>
              <p>✉️ Doctor Portal Email: {BUSINESS_INFO.email}</p>
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
                <span>Complete post-treatment radiographic and clinical summary sent to your office.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 font-bold">✓</span>
                <span>Patients are always directed back to your practice for all continuing care.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
