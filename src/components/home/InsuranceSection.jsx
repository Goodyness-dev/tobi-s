import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function InsuranceSection({ onNavigate }) {
  return (
    <section className="py-14 bg-slate-100/60 dark:bg-[#0c121e] border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Insurance & Reimbursement
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            In-Network with Major Dental PPOs & Medicare
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {BUSINESS_INFO.insurancePartners.map((ins, i) => (
            <div 
              key={i}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>{ins.name}</span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950">
                {ins.badge}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('patient-info')}
            className="text-xs font-semibold text-teal-700 dark:text-teal-300 hover:underline"
          >
            Check Your Dental & Medical Insurance Coverage →
          </button>
        </div>
      </div>
    </section>
  );
}
