import React, { useState } from 'react';
import { Rocket, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenStudio: () => void;
  onOpenSignIn: () => void;
  onNavigateHome: () => void;
  currentView: 'home' | 'studio';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStudio,
  onOpenSignIn,
  onNavigateHome,
  currentView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <img
            src="/botly-logo.png"
            alt="Prompt Studio"
            className="w-7 h-7 object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-[17px] font-semibold tracking-tight text-gray-900 font-sans">
            Prompt Studio
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-normal text-gray-600">
          <button
            onClick={() => scrollToSection('product')}
            className="hover:text-black transition-colors focus:outline-none"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-black transition-colors focus:outline-none"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-black transition-colors focus:outline-none"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-black transition-colors focus:outline-none"
          >
            FAQ
          </button>
          <button
            onClick={onOpenStudio}
            className="hover:text-black transition-colors focus:outline-none"
          >
            Open Prompt Studio
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenSignIn}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200/90 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-xs focus:outline-none"
          >
            Sign In
          </button>
          <button
            onClick={onOpenStudio}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0f1115] hover:bg-black rounded-xl transition-all shadow-xs flex items-center gap-2 group focus:outline-none"
          >
            <Rocket className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span>Open Prompt Studio</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenStudio}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0f1115] rounded-lg flex items-center gap-1.5"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Open</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-black focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 font-medium text-gray-700 text-base">
            <button
              onClick={() => scrollToSection('product')}
              className="text-left py-1 hover:text-black"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-1 hover:text-black"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-1 hover:text-black"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-1 hover:text-black"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                onOpenStudio();
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-black font-semibold text-blue-600"
            >
              Open Prompt Studio
            </button>
          </div>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSignIn();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold border border-gray-200 rounded-xl"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onOpenStudio();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-black rounded-xl flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Open Prompt Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
