import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ReviewsSection({ onOpenConsultation }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Patient Stories
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-2">
          Verified Reviews Across The Lehigh Valley
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-amber-400 text-lg">
          {'★'.repeat(5)}
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">5.0 Star Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {BUSINESS_INFO.reviews.map((rev, i) => (
          <div
            key={i}
            className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="text-amber-400 font-bold">★★★★★</span>
                <span>{rev.source}</span>
              </div>
              <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">
                {rev.procedure}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-4">
                "{rev.comment}"
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">{rev.author}</span>
              <span className="text-slate-400">{rev.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
