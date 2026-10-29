import React from 'react';

interface FinalCTAProps {
  onOpenStudio: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenStudio }) => {
  return (
    <section className="py-24 bg-[#f4f7fb] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-gray-200/90 text-xs font-normal text-gray-600 shadow-xs mb-5">
          AI Workflow
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-[40px] md:text-[44px] font-semibold text-gray-900 tracking-tight leading-[1.15]">
          Work Smarter With Your
          <br />
          Prompts
        </h2>

        {/* Subtitle */}
        <p className="mt-3.5 text-base sm:text-[17px] text-gray-500 max-w-xl mx-auto font-normal leading-relaxed">
          Keep your prompts, experiments, and results organized in one place.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={onOpenStudio}
            className="px-6 py-3.5 bg-[#101216] hover:bg-black text-white text-sm sm:text-[15px] font-medium rounded-xl shadow-sm hover:shadow transition-all hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
          >
            Open Prompt Studio
          </button>
        </div>
      </div>
    </section>
  );
};
