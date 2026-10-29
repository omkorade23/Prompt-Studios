import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    id: 'what-is',
    question: 'What is Prompt Studio?',
    answer: 'Prompt Studio is a workspace for creating, improving, testing, and evaluating AI prompts.'
  },
  {
    id: 'what-can-i-do',
    question: 'What can I do with Prompt Studio?',
    answer: 'You can create prompts, refine them with AI, test them with different inputs, save them, and evaluate their outputs.'
  },
  {
    id: 'can-i-save',
    question: 'Can I save and organize my prompts?',
    answer: 'Yes. Prompt Studio is designed to help you keep your prompts organized and accessible from one workspace.'
  },
  {
    id: 'can-i-improve',
    question: 'Can I improve a prompt with AI?',
    answer: 'Yes. Prompt Studio can help refine instructions, context, and structure to make prompts clearer and more effective.'
  },
  {
    id: 'can-i-test',
    question: 'Can I test different versions of a prompt?',
    answer: 'Yes. Prompt testing is designed around iteration, allowing you to experiment with prompts and compare their results.'
  },
  {
    id: 'which-models',
    question: 'Which AI models does Prompt Studio use?',
    answer: 'The initial version uses Gemini, with the architecture designed to support additional models over time.'
  },
  {
    id: 'is-free',
    question: 'Is Prompt Studio free?',
    answer: 'For the initial version, Prompt Studio is being developed as an accessible project rather than a paid subscription service.'
  }
];

export const FAQ: React.FC = () => {
  // Allow multiple or single open items
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-gray-50 border border-gray-200/90 text-xs font-normal text-gray-600 shadow-xs mb-4">
          FAQ
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-[38px] font-semibold text-gray-900 tracking-tight leading-tight">
          Got Questions? We've Got
          <br />
          Answers.
        </h2>

        {/* Subtitle */}
        <p className="mt-3.5 text-base sm:text-[17px] text-gray-500 max-w-xl mx-auto font-normal leading-relaxed">
          Answers to common questions about working with prompts in Prompt Studio.
        </p>

        {/* Accordion List */}
        <div className="mt-12 space-y-3 text-left max-w-3xl mx-auto">
          {faqList.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-blue-50/70 bg-[#f4f7fb]/60 hover:bg-[#eff4f9] transition-colors duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-gray-900 tracking-tight pr-4">
                    {item.question}
                  </span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-blue-600 transition-transform duration-200">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-4.5 pt-0 text-[14px] text-gray-500 leading-relaxed font-normal">
                    <div className="border-t border-gray-200/60 pt-3">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
