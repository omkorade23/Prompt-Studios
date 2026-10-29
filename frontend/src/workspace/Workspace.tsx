import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { WorkspaceHeader } from './WorkspaceHeader';
import { EmptyState } from './EmptyState';
import { ChatMessages } from './ChatMessages';
import { PromptComposer } from './PromptComposer';
import { Conversation, Message } from './types';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api/client';

interface WorkspaceProps {
  onNavigateHome: () => void;
}

const mapConversation = (dto: any): Conversation => ({
  id: dto.id || dto._id,
  title: dto.title || 'New Conversation',
  messages: [],
  createdAt: dto.created_at ? new Date(dto.created_at) : new Date(),
  updatedAt: dto.updated_at ? new Date(dto.updated_at) : new Date(),
});

const mapMessage = (dto: any): Message => ({
  id: dto.id || dto._id,
  role: dto.role === 'user' ? 'user' : 'assistant',
  content: dto.content || '',
  timestamp: dto.created_at ? new Date(dto.created_at) : new Date(),
});

export const Workspace: React.FC<WorkspaceProps> = ({ onNavigateHome }) => {
  const { user, logout } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionText, setSuggestionText] = useState<string | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [chatError, setChatError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null!);

  // Responsive breakpoint
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, isLoading, activeId]);

  // Fetch user's conversations on mount / user change
  useEffect(() => {
    if (!user) {
      setConversations([]);
      setActiveId(null);
      return;
    }

    const fetchConversations = async () => {
      try {
        const res = await apiFetch('/api/conversations');
        if (res.ok) {
          const data = await res.json();
          const mapped: Conversation[] = data.map(mapConversation);
          setConversations(mapped);
        }
      } catch (err) {
        console.error('Failed to load conversations', err);
      }
    };

    fetchConversations();
  }, [user]);

  // Fetch messages when activeId changes
  useEffect(() => {
    if (!activeId) return;

    const fetchMessages = async () => {
      try {
        const res = await apiFetch(`/api/conversations/${activeId}/messages`);
        if (res.ok) {
          const data = await res.json();
          const mappedMsgs: Message[] = data.map(mapMessage);
          setConversations((prev) =>
            prev.map((c) => (c.id === activeId ? { ...c, messages: mappedMsgs } : c))
          );
        }
      } catch (err) {
        console.error('Failed to load messages for conversation', activeId, err);
      }
    };

    fetchMessages();
  }, [activeId]);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const handleNewChat = useCallback(() => {
    setActiveId(null);
    setSuggestionText(undefined);
    setChatError(null);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    setSuggestionText(undefined);
    setChatError(null);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    onNavigateHome();
  }, [logout, onNavigateHome]);

  const handleSend = useCallback(
    async (text: string, _file?: File) => {
      if (!text.trim() || isLoading) return;
      setChatError(null);

      let targetId = activeId;
      const userTempMsg: Message = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: new Date(),
      };

      try {
        setIsLoading(true);

        // 1. If no active conversation, create one on the backend first
        if (!targetId) {
          const titleText = text.length > 40 ? text.slice(0, 40) + '...' : text;
          const createRes = await apiFetch('/api/conversations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: titleText }),
          });

          if (!createRes.ok) {
            throw new Error('Failed to create new conversation');
          }

          const newConvDto = await createRes.json();
          const newConv = mapConversation(newConvDto);
          newConv.messages = [userTempMsg];

          setConversations((prev) => [newConv, ...prev]);
          setActiveId(newConv.id);
          targetId = newConv.id;
        } else {
          // Optimistically append user message to existing active conversation
          setConversations((prev) =>
            prev.map((c) =>
              c.id === targetId
                ? { ...c, messages: [...c.messages, userTempMsg], updatedAt: new Date() }
                : c
            )
          );
        }

        // 2. Call backend /api/chat
        const chatRes = await apiFetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversation_id: targetId,
            message: text,
          }),
        });

        if (!chatRes.ok) {
          const errBody = await chatRes.json().catch(() => ({}));
          throw new Error(errBody.message || 'Failed to send message to assistant');
        }

        const aiMsgDto = await chatRes.json();
        const aiMsg = mapMessage(aiMsgDto);

        // Update messages in conversation
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== targetId) return c;
            // Filter out temporary user message and re-fetch clean messages or append AI response
            const updatedMsgs = c.messages.filter((m) => !m.id.startsWith('temp-'));
            const cleanUserMsg: Message = {
              id: `user-${Date.now()}`,
              role: 'user',
              content: text,
              timestamp: new Date(),
            };
            return {
              ...c,
              messages: [...updatedMsgs, cleanUserMsg, aiMsg],
              updatedAt: new Date(),
            };
          })
        );
      } catch (err: any) {
        console.error('Chat error', err);
        setChatError(err.message || 'Failed to communicate with AI');
        // Rollback temp message on failure
        if (targetId) {
          setConversations((prev) =>
            prev.map((c) =>
              c.id === targetId
                ? { ...c, messages: c.messages.filter((m) => !m.id.startsWith('temp-')) }
                : c
            )
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [activeId, isLoading]
  );

  const handleSuggestion = useCallback((text: string) => {
    setSuggestionText(text);
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-white font-sans">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelect}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <WorkspaceHeader
          title={activeConversation?.title ?? null}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
          onNavigateHome={onNavigateHome}
          isMobile={isMobile}
        />

        {chatError && (
          <div className="bg-rose-50 border-b border-rose-100 text-rose-700 px-4 py-2 text-xs flex items-center justify-between">
            <span>{chatError}</span>
            <button
              onClick={() => setChatError(null)}
              className="text-rose-500 hover:text-rose-800 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Content */}
        {activeConversation && activeConversation.messages.length > 0 ? (
          <ChatMessages
            messages={activeConversation.messages}
            isLoading={isLoading}
            bottomRef={bottomRef}
          />
        ) : (
          <EmptyState onSuggestion={handleSuggestion} />
        )}

        {/* Composer */}
        <PromptComposer
          onSend={handleSend}
          disabled={isLoading}
          initialValue={suggestionText}
          onInitialValueConsumed={() => setSuggestionText(undefined)}
        />
      </div>
    </div>
  );
};
