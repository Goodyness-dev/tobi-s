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
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-extrabold text-sm">
                M&M
              </div>
              <span className="font-extrabold text-lg text-white">
                Milano & Mazza
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Oral & Maxillofacial Surgery facility in Easton, PA. Providing world-class dental implants, wisdom teeth extraction, bone grafting, and gentle hospital-trained IV sedation.
            </p>
            <div className="text-xs text-teal-400 space-y-1">
              <p>📍 1412 Sullivan Trail, Easton, PA 18040</p>
              <p>📞 Phone: (610) 258-9081</p>
              <p>📠 Fax: (610) 258-0377</p>
            </div>
          </div>

          {/* Col 2: Surgical Procedures */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              3D Surgical Guides
            </h4>
            <ul className="space-y-2 text-xs">
              {PROCEDURES.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onNavigate(`procedure-${p.slug}`)}
                    className="hover:text-teal-400 transition"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Practice Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Patient & Doctor Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-teal-400 transition">
                  About Dr. Milano & Dr. Mazza
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('patient-info')} className="hover:text-teal-400 transition">
                  Patient Info & Fasting Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('patient-info')} className="hover:text-teal-400 transition">
                  Online Paperless Registration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('referring-doctors')} className="hover:text-teal-400 transition">
                  Referring Doctor Portal & X-Rays
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-teal-400 transition text-slate-500">
                  Staff Admin Portal (#/admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency / Hours Summary */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Hours & Immediate Care
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <p className="text-white font-semibold">Monday – Friday</p>
              <p className="text-slate-400">9:00 AM – 5:00 PM</p>
              <p className="text-white font-semibold pt-2 border-t border-slate-800">Saturday – Sunday</p>
              <p className="text-slate-400">Closed (Emergency On-Call)</p>
            </div>
            <button
              onClick={() => onOpenConsultation()}
              className="w-full mt-4 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs tracking-wide transition active:scale-95"
            >
              Request Consultation Online
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Milano & Mazza Oral and Maxillofacial Surgery LLC. All rights reserved.</p>
          <p>Serving Easton, Bethlehem, Allentown, Phillipsburg, and the Greater Lehigh Valley.</p>
        </div>
      </div>
    </footer>
  );
}
