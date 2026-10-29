import React from 'react';
import { Fingerprint, ArrowUpRight, Zap, Search, FileText } from 'lucide-react';

interface EmptyStateProps {
  onSuggestion: (text: string) => void;
}

const suggestions = [
  {
    icon: <Zap className="w-4 h-4" />,
    label: 'Improve a prompt',
    prompt: 'Help me improve this prompt: [paste your prompt here]',
  },
  {
    icon: <Search className="w-4 h-4" />,
    label: 'Review a prompt',
    prompt: 'Please review and give feedback on this prompt: [paste your prompt here]',
  },
  {
    icon: <FileText className="w-4 h-4" />,
    label: 'Create a prompt',
    prompt: 'Help me create a prompt for: [describe your use case]',
  },
  {
    icon: <Fingerprint className="w-4 h-4" />,
    label: 'Test a prompt',
    prompt: 'Help me test and evaluate this prompt with sample inputs: [paste your prompt here]',
  },
];

export const EmptyState: React.FC<EmptyStateProps> = ({ onSuggestion }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 select-none">
      {/* Logo mark */}
      <img
        src="/botly-logo.png"
        alt="Prompt Studio"
        className="w-10 h-10 object-contain mb-6 select-none"
      />

      {/* Heading */}
      <h2 className="text-[26px] sm:text-[30px] font-semibold text-gray-900 tracking-tight leading-tight text-center">
        Welcome to Prompt Studio
      </h2>
      <p className="mt-2.5 text-sm sm:text-[15px] text-gray-500 font-normal text-center max-w-sm leading-relaxed">
        Create, refine, test, and evaluate your prompts in one focused workspace.
      </p>

      {/* Suggestion cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {suggestions.map((s) => (
          <button
            key={s.label}
            onClick={() => onSuggestion(s.prompt)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-200/80 bg-white hover:border-gray-300 hover:bg-gray-50/60 transition-all duration-150 text-left group shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div className="p-1.5 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-gray-100 transition-colors shrink-0">
              {s.icon}
            </div>
            <span className="text-[13.5px] font-normal text-gray-700 group-hover:text-gray-900 transition-colors flex-1">
              {s.label}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
