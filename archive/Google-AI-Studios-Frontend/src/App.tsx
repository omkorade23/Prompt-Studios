/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkspaceMockup } from './components/WorkspaceMockup';
import { LogoMarquee } from './components/LogoMarquee';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { PromptWorkflow } from './components/PromptWorkflow';
import { LandscapeBanner } from './components/LandscapeBanner';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { DownloadView } from './components/DownloadView';
import { SignInModal } from './components/SignInModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'studio'>('home');
  const [signInOpen, setSignInOpen] = useState(false);

  const handleOpenStudio = () => {
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCreating = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenStudio();
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white relative">
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onOpenStudio={handleOpenStudio}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      {/* Main Content Area */}
      {currentView === 'home' ? (
        <main>
          {/* 1. Hero Section */}
          <Hero
            onStartCreating={handleStartCreating}
            onExplore={handleOpenStudio}
          />

          {/* 2. Workspace Showcase Mockup */}
          <WorkspaceMockup />

          {/* 3. Logo Marquee / Client Logos */}
          <LogoMarquee />

          {/* 4. Features Grid */}
          <Features />

          {/* 5. How Prompt Studio Works (Steps 1, 2, 3) */}
          <HowItWorks />

          {/* 6. Prompt Workflow (From Idea to Reliable Prompt) */}
          <PromptWorkflow />

          {/* 7. Landscape Wide Banner */}
          <LandscapeBanner onOpenStudio={handleOpenStudio} />

          {/* 8. FAQ Accordion */}
          <FAQ />

          {/* 9. Final CTA (AI Workflow) */}
          <FinalCTA onOpenStudio={handleOpenStudio} />
        </main>
      ) : (
        <main>
          {/* Dedicated Open Prompt Studio View (matching /download reference) */}
          <DownloadView
            onBackHome={handleNavigateHome}
            onOpenSignIn={() => setSignInOpen(true)}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onOpenStudio={handleOpenStudio}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      {/* Sign In Dialog Modal */}
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </div>
  );
}
