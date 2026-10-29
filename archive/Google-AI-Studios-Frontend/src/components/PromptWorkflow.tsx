import React from 'react';
import { Sparkles, Sliders, Users, PieChart } from 'lucide-react';

const workflowSteps = [
  {
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 4l16 16M4 20L20 4" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    title: 'Create',
    subtitle: 'Turn ideas into structured prompts.'
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
      </svg>
    ),
    title: 'Refine',
    subtitle: 'Improve clarity and effectiveness.'
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Test',
    subtitle: 'Try prompts with real inputs.'
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 10 10h-10z" fill="currentColor" />
        <circle cx="8" cy="16" r="1.5" />
      </svg>
    ),
    title: 'Evaluate',
    subtitle: 'Compare outputs and iterate.'
  }
];

export const PromptWorkflow: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-gray-50 border border-gray-200/90 text-xs font-normal text-gray-600 shadow-xs mb-4">
          Prompt workflow
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-[38px] font-semibold text-gray-900 tracking-tight leading-tight">
          From Idea to Reliable Prompt
        </h2>

        {/* Subtitle */}
        <p className="mt-3.5 text-base sm:text-[17px] text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
          Prompt Studio gives you a focused workflow for turning rough instructions into prompts you actually test and improve.
        </p>

        {/* 4 Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-xs transition-all duration-200 flex flex-col items-start group"
            >
              {/* Black squircle icon container */}
              <div className="p-3 bg-[#111317] rounded-xl mb-6 shadow-xs group-hover:scale-105 transition-transform">
                {step.icon}
              </div>

              <h4 className="text-[17px] font-semibold text-gray-900 tracking-tight mb-1.5">
                {step.title}
              </h4>

              <p className="text-xs sm:text-[13.5px] text-gray-500 font-normal leading-relaxed">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
