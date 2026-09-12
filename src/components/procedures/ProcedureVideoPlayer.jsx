import React, { useState } from 'react';

export default function ProcedureVideoPlayer({ 
  videoId, 
  title, 
  duration, 
  chapters = [], 
  category 
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="card-thick bg-white dark:bg-[#0f172a] rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-xl">
      {/* Video Container (16:9 Aspect Ratio) */}
      <div className="relative w-full aspect-video bg-slate-950 overflow-hidden group">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div 
            className="relative w-full h-full flex items-center justify-center cursor-pointer select-none" 
            onClick={() => setIsPlaying(true)}
          >
            {/* Background Medical Gradient / Visual Poster */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-teal-950/70 to-slate-900 opacity-90" />
            
            {/* Ambient Animated Glow */}
            <div className="absolute w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            {/* Poster Header Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-500/30 text-xs font-semibold text-teal-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Official 3D Clinical Walkthrough</span>
            </div>

            {duration && (
              <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-slate-300 border border-white/10 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{duration}</span>
              </div>
            )}

            {/* Big Tactile Play Button */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-teal-600/90 hover:bg-teal-500 text-white flex items-center justify-center shadow-2xl shadow-teal-500/40 border-4 border-white/20 group-hover:scale-105 active:scale-95 transition-all duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-base sm:text-lg drop-shadow-md">
                  Watch 3D Surgical Guide
                </p>
                <p className="text-teal-200/80 text-xs sm:text-sm font-medium">
                  High-definition anatomical animation • Click to play
                </p>
              </div>
            </div>

            {/* Surgeon Badge Overlay at Bottom */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-400 z-10">
              <span className="truncate">AAOMS Clinical Educational Series</span>
              <span className="text-teal-400 font-semibold">Drs. Milano & Mazza</span>
            </div>
          </div>
        )}
      </div>

      {/* Chapters & Clinical Highlights */}
      <div className="p-6 sm:p-7 bg-slate-50 dark:bg-[#0c1322] border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
              Procedure Milestones
            </h4>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Performed under in-office twilight anesthesia
          </span>
        </div>

        {chapters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {chapters.map((ch, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-teal-500/50 transition shadow-sm"
              >
                <span className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-[11px]">
                  {ch.time}
                </span>
                <span className="truncate">{ch.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
