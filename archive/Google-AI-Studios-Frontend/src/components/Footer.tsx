import React from 'react';

interface FooterProps {
  onOpenStudio: () => void;
  onOpenSignIn: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStudio,
  onOpenSignIn,
  onNavigateHome
}) => {
  const scrollTo = (id: string) => {
    onNavigateHome();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#0b0c0e] text-white pt-20 pb-12 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Brand Info Left (5 cols) */}
          <div className="md:col-span-5 text-left">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <span className="text-base font-semibold tracking-tight text-white font-sans">
                Prompt Studio
              </span>
            </button>

            <p className="mt-3.5 text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed font-normal">
              Create, improve, test, and evaluate your prompts with Prompt Studio.
            </p>
          </div>

          {/* Nav links columns right (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-8 text-left text-xs sm:text-sm">
            {/* Column 1: Navigation */}
            <div>
              <h4 className="font-medium text-white mb-4 text-xs sm:text-sm tracking-tight">Navigation</h4>
              <ul className="space-y-2.5 text-gray-400 font-normal">
                <li>
                  <button onClick={() => scrollTo('product')} className="hover:text-white transition-colors">
                    Product
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Recources / Resources */}
            <div>
              <h4 className="font-medium text-white mb-4 text-xs sm:text-sm tracking-tight">Recources</h4>
              <ul className="space-y-2.5 text-gray-400 font-normal">
                <li>
                  <button onClick={onOpenStudio} className="hover:text-white transition-colors">
                    Open Prompt Studio
                  </button>
                </li>
                <li>
                  <button onClick={onOpenSignIn} className="hover:text-white transition-colors">
                    Sign In
                  </button>
                </li>
                <li>
                  <button onClick={onOpenStudio} className="hover:text-white transition-colors">
                    Changelog
                  </button>
                </li>
                <li>
                  <button onClick={onOpenStudio} className="hover:text-white transition-colors">
                    Open Prompt Studio
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="font-medium text-white mb-4 text-xs sm:text-sm tracking-tight">Legal</h4>
              <ul className="space-y-2.5 text-gray-400 font-normal">
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#refund" className="hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Prompt Studio. All rights reserved.</p>
          <div className="mt-3 sm:mt-0 flex items-center gap-4">
            <span className="text-gray-600">Built for AI Prompt Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
