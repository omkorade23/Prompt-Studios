import React, { useEffect } from 'react';
import { Plus, MessageSquare, X, Sparkles, ChevronRight, LogOut } from 'lucide-react';
import { Conversation } from './types';
import { User } from '../context/AuthContext';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  user: User | null;
  onLogout: () => void;
}

function timeLabel(date: Date): string {
  const diff = (Date.now() - date.getTime()) / 3600000;
  if (diff < 1) return 'Just now';
  if (diff < 24) return `${Math.floor(diff)}h ago`;
  if (diff < 48) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  isOpen,
  onClose,
  isMobile,
  user,
  onLogout,
}) => {
  // Close on Escape key on mobile
  useEffect(() => {
    if (!isMobile) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isMobile, onClose]);

  const sidebarContent = (
    <aside
      className="flex flex-col h-full bg-white border-r border-gray-100 w-[260px] shrink-0"
      style={{ minWidth: '260px', maxWidth: '260px' }}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <img
            src="/botly-logo.png"
            alt="Prompt Studio"
            className="w-6 h-6 object-contain shrink-0"
          />
          <span className="text-[15px] font-semibold tracking-tight text-gray-900">Prompt Studio</span>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* New Chat */}
      <div className="px-3 pt-3 pb-2">
        <button
          onClick={() => { onNewChat(); if (isMobile) onClose(); }}
          className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#111317] hover:bg-black text-white text-sm font-medium rounded-xl transition-all duration-150 shadow-sm hover:shadow group"
        >
          <Plus className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-90 duration-200" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {conversations.length > 0 && (
          <>
            <p className="px-2 py-2 text-[11px] font-medium text-gray-400 tracking-wider uppercase">Recent</p>
            <ul className="space-y-0.5">
              {conversations.map((conv) => {
                const isActive = conv.id === activeId;
                return (
                  <li key={conv.id}>
                    <button
                      onClick={() => { onSelect(conv.id); if (isMobile) onClose(); }}
                      className={`w-full flex items-start gap-2.5 px-2.5 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <MessageSquare
                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors ${
                          isActive ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-normal leading-snug truncate">{conv.title}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{timeLabel(conv.updatedAt)}</p>
                      </div>
                      {isActive && (
                        <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      {/* User/Profile */}
      <div className="px-3 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0 text-white font-semibold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : <Sparkles className="w-3.5 h-3.5 text-white" />}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-900 truncate">{user?.name || 'Prompt Studio'}</p>
              <p className="text-[11px] text-gray-400 truncate">{user?.email || 'Free Plan'}</p>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Log out"
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-200 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
        />
        {/* Drawer */}
        <div
          className={`fixed inset-y-0 left-0 z-50 flex transition-transform duration-200 ease-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return sidebarContent;
};
