/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { Workspace } from './workspace/Workspace';

type AppView = 'home' | 'studio' | 'workspace';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [signInOpen, setSignInOpen] = useState(false);

  // Handle /studio hash for direct access
  useEffect(() => {
    if (window.location.hash === '#/studio') {
      setCurrentView('workspace');
    }
  }, []);

  const handleOpenStudio = () => {
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWorkspace = () => {
    setCurrentView('workspace');
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

  // Workspace view — full-screen, no landing page chrome
  if (currentView === 'workspace') {
    return <Workspace onNavigateHome={handleNavigateHome} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white relative">
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView === 'studio' ? 'studio' : 'home'}
        onNavigateHome={handleNavigateHome}
        onOpenStudio={handleOpenWorkspace}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      {/* Main Content Area */}
      {currentView === 'home' ? (
        <main>
          {/* 1. Hero Section */}
          <Hero
            onStartCreating={handleStartCreating}
            onExplore={handleOpenWorkspace}
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
          <LandscapeBanner onOpenStudio={handleOpenWorkspace} />

          {/* 8. FAQ Accordion */}
          <FAQ />

          {/* 9. Final CTA (AI Workflow) */}
          <FinalCTA onOpenStudio={handleOpenWorkspace} />
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
        onOpenStudio={handleOpenWorkspace}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      {/* Sign In Dialog Modal */}
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSuccessRedirect={handleOpenWorkspace}
      />
    </div>
  );
}
