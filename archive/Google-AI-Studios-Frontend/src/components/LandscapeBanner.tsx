import React from 'react';

interface LandscapeBannerProps {
  onOpenStudio: () => void;
}

export const LandscapeBanner: React.FC<LandscapeBannerProps> = ({ onOpenStudio }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 my-12 sm:my-16">
      <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0px_0px_3px_0px_rgba(0,0,0,0.1),0px_1px_1px_0px_rgba(0,0,0,0.06),0px_2px_2px_0px_rgba(0,0,0,0.1)] py-20 px-8 sm:px-12 md:px-16 text-left">
        {/* Original Background Image directly loaded from /assets/download.webp */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/assets/download.webp"
            alt="Prompt Studio interface background featuring a futuristic city skyline surrounded by green hills and a bright, cloud-filled sky."
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center',
            }}
          />
        </div>

        <div className="max-w-xl relative z-10">
          <h3 className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-white tracking-tight leading-tight">
            Start Building Better Prompts
          </h3>

          <p className="mt-2.5 text-sm sm:text-base text-white/80 font-normal leading-relaxed">
            Create, test, and refine your prompts in one workspace.
          </p>

          <div className="mt-6">
            <button
              onClick={onOpenStudio}
              className="px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-950 text-xs sm:text-sm font-medium rounded-xl transition-all shadow-xs hover:shadow active:scale-95 focus:outline-none"
            >
              Open Prompt Studio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


