import React from 'react';
import { Menu, ArrowLeft, MoreHorizontal } from 'lucide-react';

interface WorkspaceHeaderProps {
  title: string | null;
  onMenuToggle: () => void;
  onNavigateHome: () => void;
  isMobile: boolean;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  title,
  onMenuToggle,
  onNavigateHome,
  isMobile,
}) => {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-gray-100 bg-white/95 backdrop-blur-md shrink-0">
      {/* Left */}
      <div className="flex items-center gap-2">
        {isMobile && (
          <button
            onClick={onMenuToggle}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors mr-1"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-xs font-medium py-1 px-2 rounded-lg hover:bg-gray-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Back to overview</span>
        </button>
      </div>

      {/* Center — conversation title */}
      <div className="flex-1 text-center px-4">
        {title && (
          <p className="text-[13px] font-normal text-gray-500 truncate max-w-[280px] mx-auto">
            {title}
          </p>
        )}
      </div>

      {/* Right — placeholder */}
      <div className="flex items-center gap-1.5">
        <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="w-4.5 h-4.5" />
        </button>
      </div>
    </header>
  );
};
