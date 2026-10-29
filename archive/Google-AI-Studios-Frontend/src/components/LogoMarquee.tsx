import React from 'react';

export const LogoMarquee: React.FC = () => {
  return (
    <section className="py-12 border-b border-gray-100/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[13px] font-medium text-gray-500 tracking-normal mb-8">
          Everything you need to work with AI prompts.
        </p>

        {/* Logo row */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {/* Logo 1 */}
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg tracking-tight">
            <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-sans font-extrabold text-base">logoipsum</span>
          </div>

          {/* Logo 2 */}
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg tracking-tight">
            <svg className="w-7 h-5 text-gray-900" viewBox="0 0 28 20" fill="currentColor">
              <rect x="0" y="2" width="12" height="16" rx="2" />
              <rect x="16" y="2" width="12" height="16" rx="2" fillOpacity="0.6" />
            </svg>
            <span className="font-sans font-extrabold text-base tracking-tighter">logoipsum</span>
          </div>

          {/* Logo 3 */}
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg tracking-tight">
            <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span className="font-serif italic font-bold text-base">LOGOIPSUM</span>
          </div>

          {/* Logo 4 */}
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg tracking-tight">
            <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18M3 12h18" />
            </svg>
            <span className="font-sans font-semibold text-base">logo⊕ipsum</span>
          </div>

          {/* Logo 5 */}
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg tracking-tight">
            <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
            </svg>
            <span className="font-sans font-bold text-base">Logoipsum</span>
          </div>

          {/* Logo 6 */}
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg tracking-tight">
            <span className="font-serif tracking-widest font-black text-sm uppercase">LOGOIPSUM</span>
          </div>
        </div>
      </div>
    </section>
  );
};
