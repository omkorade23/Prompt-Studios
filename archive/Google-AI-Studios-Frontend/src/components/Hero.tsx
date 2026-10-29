import React from 'react';
import { ArrowUpRight, Fingerprint, Users } from 'lucide-react';

interface HeroProps {
  onStartCreating: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCreating, onExplore }) => {
  return (
    <section className="relative pt-16 pb-16 md:pt-24 md:pb-28">
      {/* Original Background Image & Gradient matching Framer reference exactly */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <img
          src="/assets/download.jpg"
          alt="Botly interface background featuring a futuristic city skyline surrounded by green hills and a bright, cloud-filled sky."
          className="w-full h-full object-cover"
          style={{
            objectPosition: '49.1% 0%',
          }}
        />
        {/* Exact Framer linear gradient overlay to fade smoothly into white */}
        <div
          className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 60%, rgb(255, 255, 255) 100%)',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center">
        {/* Top pill badge */}
        <div
          onClick={onExplore}
          className="inline-flex items-center gap-1.5 p-1 pl-3 bg-white/95 border border-gray-200/80 rounded-full shadow-xs hover:border-gray-300 transition-all cursor-pointer mb-8 group"
        >
          <div className="flex items-center gap-1.5 text-xs font-normal text-gray-600">
            <Users className="w-3.5 h-3.5 text-gray-500" />
            <span>Prompt Studio</span>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#121417] text-white text-xs font-medium rounded-full group-hover:bg-black transition-colors">
            <span>Explore Prompt Studio</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        {/* Hero Main Heading with refined, lighter font weight */}
        <h1 className="text-[44px] sm:text-[60px] md:text-[68px] font-semibold text-gray-900 tracking-[-0.03em] leading-[1.08] max-w-3xl">
          Build Better
          <br />
          Prompts. Get
          <br />
          Better AI.
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-xl font-normal leading-relaxed">
          Create, improve, test, and evaluate prompts in one focused workspace.
        </p>

        {/* Main CTA Button */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={onStartCreating}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#111317] hover:bg-black text-white text-sm sm:text-[15px] font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
          >
            <Fingerprint className="w-4 h-4 text-gray-300" />
            <span>Start Creating</span>
          </button>
        </div>
      </div>
    </section>
  );
};


