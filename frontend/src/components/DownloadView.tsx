import React from 'react';
import { Rocket, Sparkles, Download, ArrowLeft } from 'lucide-react';
import { WorkspaceMockup } from './WorkspaceMockup';

interface DownloadViewProps {
  onBackHome: () => void;
  onOpenSignIn: () => void;
}

export const DownloadView: React.FC<DownloadViewProps> = ({ onBackHome, onOpenSignIn }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header section of Open Prompt Studio page */}
      <section className="pt-16 pb-6 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-8 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to overview</span>
        </button>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-tight">
          Open Prompt Studio
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-normal">
          Create, improve, test, and evaluate prompts in one focused workspace.
        </p>

        {/* Dual Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => {
              const el = document.getElementById('product');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#111317] hover:bg-black text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 focus:outline-none"
          >
            <Download className="w-4 h-4" />
            <span>Open Prompt Studio</span>
          </button>

          <button
            onClick={onOpenSignIn}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 text-sm font-semibold rounded-xl shadow-xs transition-all hover:border-gray-300 focus:outline-none"
          >
            Open Prompt Studio
          </button>
        </div>
      </section>

      {/* The full Workspace Mockup */}
      <div className="pt-4 pb-16">
        <WorkspaceMockup />
      </div>
    </div>
  );
};
