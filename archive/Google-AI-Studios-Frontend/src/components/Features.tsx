import React from 'react';
import { Box, Newspaper, Repeat, BarChart3 } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const features = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
        <path d="M12 22V12" />
        <path d="M21 7l-9 5-9-5" />
      </svg>
    ),
    iconBg: 'bg-emerald-50/90',
    iconColor: 'text-emerald-500',
    title: 'Create Prompts',
    description: 'Turn ideas into clear, structured prompts designed for consistent AI results.'
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h4v8H7zM15 8h2M15 12h2M15 16h2" />
      </svg>
    ),
    iconBg: 'bg-orange-50/90',
    iconColor: 'text-orange-500',
    title: 'Improve with AI',
    description: 'Refine instructions, context, and structure to make your prompts more effective.'
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="8" cy="12" r="5" />
        <circle cx="16" cy="12" r="5" />
      </svg>
    ),
    iconBg: 'bg-blue-50/90',
    iconColor: 'text-blue-500',
    title: 'Test & Iterate',
    description: 'Run prompts against different inputs and iterate quickly based on the results.'
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5v14M7 9v10M2 13v6M22 13v6" />
      </svg>
    ),
    iconBg: 'bg-rose-50/90',
    iconColor: 'text-rose-500',
    title: 'Evaluate Outputs',
    description: 'Compare responses and understand which prompts perform better.'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-9 rounded-2xl border border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left flex flex-col items-start group"
            >
              {/* Icon */}
              <div
                className={`p-3 rounded-xl mb-6 ${item.iconBg} ${item.iconColor} transition-transform duration-200 group-hover:scale-105`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-[20px] font-semibold text-gray-900 tracking-tight mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-gray-500 font-normal leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
