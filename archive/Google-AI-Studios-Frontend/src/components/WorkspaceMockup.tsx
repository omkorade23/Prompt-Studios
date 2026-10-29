import React, { useState } from 'react';
import {
  Lock,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Share2,
  Zap,
  Mail,
  Plus,
  Inbox,
  FileText,
  Archive,
  Star,
  Send,
  Trash2,
  AlertOctagon,
  SlidersHorizontal,
  MoreVertical,
  Wand2,
  Scissors,
  Copy,
  Code,
  Tag,
  Paperclip,
  Check
} from 'lucide-react';

interface InboxItem {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  tagColor?: string;
  preview: string;
  subject: string;
  source: string;
  thread: {
    sender: string;
    isBot: boolean;
    avatar: string;
    time: string;
    content: string;
  }[];
}

const mockInboxItems: InboxItem[] = [
  {
    id: 'isabelle',
    sender: 'Isabelle Dubois',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    time: '16 minutes ago',
    subject: 'Nothing shows up on homepage',
    source: 'from Squarespace AI',
    preview: "I've embedded the chat but nothing shows up on my homepage.",
    thread: [
      {
        sender: 'Isabelle Dubois',
        isBot: false,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        time: '16 minutes ago',
        content: "I've embedded the chat but nothing shows up on my homepage."
      },
      {
        sender: 'Botly',
        isBot: true,
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        time: '15 minutes ago',
        content: "Hi Isabelle! 👋\nLet's get this sorted. Can you confirm if you've placed the embed script just before the </body> tag in your site's HTML?"
      },
      {
        sender: 'Isabelle Dubois',
        isBot: false,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        time: '13 minutes ago',
        content: "Yes, I added it to the footer of my site. I'm using Squarespace."
      },
      {
        sender: 'Botly',
        isBot: true,
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        time: '11 minutes ago',
        content: "Thanks for confirming!\nOn Squarespace, sometimes custom code blocks require enabling in settings. Go to Settings > Advanced > Code Injection and make sure scripts are allowed. Also, is your site published or still in preview mode?"
      },
      {
        sender: 'Isabelle Dubois',
        isBot: false,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        time: '2 minutes ago',
        content: "Oh it's still in preview — could that be why?"
      }
    ]
  },
  {
    id: 'liam',
    sender: 'Liam Turner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    time: '5 minutes ago',
    tagColor: '#f97316',
    subject: 'Training data reload issue',
    source: 'from Knowledge Base Assistant',
    preview: "Hey! My bot isn't responding after I added new training data.",
    thread: [
      {
        sender: 'Liam Turner',
        isBot: false,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        time: '5 minutes ago',
        content: "Hey! My bot isn't responding after I added new training data."
      },
      {
        sender: 'Botly',
        isBot: true,
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        time: '4 minutes ago',
        content: "Checking index sync status. The embedding vector pipeline finished indexing 12 documents. Let's run a test query."
      }
    ]
  },
  {
    id: 'sofia',
    sender: 'Sofia Alvarez',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    time: '2 hours ago',
    subject: 'Notion document ingestion',
    source: 'from Integration Hub',
    preview: 'Can I upload a Notion doc to train the bot?',
    thread: [
      {
        sender: 'Sofia Alvarez',
        isBot: false,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
        time: '2 hours ago',
        content: 'Can I upload a Notion doc to train the bot?'
      },
      {
        sender: 'Botly',
        isBot: true,
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        time: '2 hours ago',
        content: 'Yes! Prompt Studio supports direct Notion exports or public page URLs in Step 2 of your workspace.'
      }
    ]
  },
  {
    id: 'leo',
    sender: 'Leo Schneider',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
    time: '8 minutes ago',
    subject: 'Bot recovery request',
    source: 'from Account Settings',
    preview: 'I accidentally deleted a bot. Is there a way to recover it?',
    thread: [
      {
        sender: 'Leo Schneider',
        isBot: false,
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
        time: '8 minutes ago',
        content: 'I accidentally deleted a bot. Is there a way to recover it?'
      },
      {
        sender: 'Botly',
        isBot: true,
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop',
        time: '7 minutes ago',
        content: 'Your prompt configurations and version history remain in Trash for 30 days. You can restore it anytime!'
      }
    ]
  },
  {
    id: 'noah',
    sender: 'Noah Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    time: '27 minutes ago',
    subject: 'Billing inquiry',
    source: 'from Billing Portal',
    preview: "I noticed a $49.99 charge on my account that I don't recognize. Can you help me unde...",
    thread: [
      {
        sender: 'Noah Kim',
        isBot: false,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        time: '27 minutes ago',
        content: "I noticed a $49.99 charge on my account that I don't recognize. Can you help me understand what it is?"
      }
    ]
  },
  {
    id: 'mateo',
    sender: 'Mateo Rossi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    time: '45 minutes ago',
    subject: 'Knowledge base constraint',
    source: 'from System Prompt Editor',
    preview: 'How can I limit bot responses to a specific knowledge base?',
    thread: [
      {
        sender: 'Mateo Rossi',
        isBot: false,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        time: '45 minutes ago',
        content: 'How can I limit bot responses to a specific knowledge base?'
      }
    ]
  }
];

export const WorkspaceMockup: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('isabelle');
  const [activeTab, setActiveTab] = useState<'inbox' | 'drafts' | 'archive' | 'favorites'>('inbox');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const activeItem = mockInboxItems.find((item) => item.id === selectedId) || mockInboxItems[0];

  const handleCopy = () => {
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div id="product" className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 mb-16">
      {/* macOS Window Wrapper */}
      <div className="rounded-2xl border-[3px] border-[#18191c] bg-[#121316] shadow-2xl overflow-hidden transition-all duration-300">
        {/* Window Chrome / Title Bar */}
        <div className="px-4 py-3 bg-[#17181c] border-b border-[#23242a] flex items-center justify-between text-xs text-gray-400 select-none">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs"></span>

            <div className="hidden sm:flex items-center gap-1.5 ml-4 text-gray-500">
              <ChevronLeft className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
              <ChevronRight className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
              <RotateCw className="w-3 h-3 cursor-pointer hover:text-white ml-1" />
            </div>
          </div>

          {/* Browser Address Bar */}
          <div className="flex items-center gap-2 bg-[#0c0d0f] border border-[#26282e] rounded-lg px-3.5 py-1 text-gray-300 text-xs w-64 sm:w-80 justify-center">
            <Lock className="w-3 h-3 text-gray-400" />
            <span className="tracking-tight text-gray-200 font-mono text-[11.5px]">promptstudio.ai</span>
            <button onClick={handleCopy} className="ml-auto text-gray-400 hover:text-white focus:outline-none">
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
            </button>
          </div>

          {/* Right window actions */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 font-mono hidden md:inline">PromptStudio v1.0</span>
          </div>
        </div>

        {/* Window App Content Canvas */}
        <div className="bg-[#ffffff] text-slate-900 flex flex-col min-h-[580px] max-h-[720px] overflow-hidden">
          {/* App Header Bar */}
          <div className="h-14 border-b border-gray-200 px-5 flex items-center justify-between bg-white select-none">
            {/* Left: Email count */}
            <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="font-semibold text-gray-900">Email</span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500 text-xs">14,561 emails</span>
            </div>

            {/* Right: Last update, avatars, Share, Upgrade */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs text-gray-400 font-medium">
                Last Updates 4 day ago
              </span>

              {/* Avatar stack */}
              <div className="flex -space-x-1.5 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop"
                  alt="Team member"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"
                  alt="Team member"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&fit=crop"
                  alt="Team member"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop"
                  alt="Team member"
                />
              </div>

              {/* Share button */}
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              {/* Upgrade plan button */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#3b82f6] hover:bg-blue-600 rounded-lg shadow-xs transition-colors">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Upgrade plan</span>
              </button>
            </div>
          </div>

          {/* Category Tabs Sub-bar */}
          <div className="px-5 py-2.5 bg-gray-50/70 border-b border-gray-200 flex items-center gap-2 overflow-x-auto text-xs font-medium text-gray-600 select-none">
            {/* Compose button */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f1115] hover:bg-black text-white rounded-lg font-semibold shadow-xs mr-2 shrink-0">
              <Plus className="w-3.5 h-3.5" />
              <span>Compose</span>
            </button>

            {/* Inbox pill */}
            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                activeTab === 'inbox'
                  ? 'bg-white text-gray-900 shadow-xs border border-gray-200/90 font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Inbox 14,561</span>
            </button>

            <button
              onClick={() => setActiveTab('drafts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                activeTab === 'drafts'
                  ? 'bg-white text-gray-900 shadow-xs border border-gray-200/90 font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Drafts</span>
            </button>

            <button
              onClick={() => setActiveTab('archive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                activeTab === 'archive'
                  ? 'bg-white text-gray-900 shadow-xs border border-gray-200/90 font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Archive</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-white text-gray-900 shadow-xs border border-gray-200/90 font-semibold'
                  : 'hover:text-gray-900'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Favorites</span>
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <span className="flex items-center gap-1 px-2.5 py-1.5 text-gray-500 hover:text-gray-800 cursor-pointer">
                <Send className="w-3.5 h-3.5" />
                <span>Sent items</span>
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1.5 text-gray-500 hover:text-gray-800 cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Deleted</span>
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1.5 text-gray-500 hover:text-gray-800 cursor-pointer">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Spam</span>
              </span>
            </div>
          </div>

          {/* Main 2-Column Split: Inbox List (left) + Conversation Pane (right) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Left Column: Email Messages List (col-span-5) */}
            <div className="md:col-span-5 border-r border-gray-200 flex flex-col bg-white overflow-y-auto max-h-[500px]">
              {/* Inbox header */}
              <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-black" readOnly />
                  <span className="font-semibold text-gray-800">Inbox</span>
                </div>
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-700" />
              </div>

              {/* Message items */}
              <div className="divide-y divide-gray-100">
                {mockInboxItems.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`p-3.5 transition-colors cursor-pointer select-none text-left relative ${
                        isSelected
                          ? 'bg-blue-50/50 border-l-4 border-blue-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <img
                          src={item.avatar}
                          alt={item.sender}
                          className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 truncate">
                              <span
                                className={`text-xs font-semibold truncate ${
                                  isSelected ? 'text-blue-900' : 'text-gray-900'
                                }`}
                              >
                                {item.sender}
                              </span>
                              {item.tagColor && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: item.tagColor }}
                                ></span>
                              )}
                            </div>
                            <span className="text-[11px] text-gray-400 shrink-0 ml-2">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-[11.5px] text-gray-500 line-clamp-1 mt-0.5 leading-snug">
                            {item.preview}
                          </p>
                        </div>
                        <MoreVertical className="w-3.5 h-3.5 text-gray-300 hover:text-gray-600 shrink-0 mt-1 cursor-pointer" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Conversation (col-span-7) */}
            <div className="md:col-span-7 flex flex-col bg-[#fafbfc] overflow-y-auto max-h-[500px]">
              {/* Message toolbar */}
              <div className="px-5 py-3 border-b border-gray-200/80 bg-white flex items-center justify-between text-xs text-gray-500 select-none">
                <div className="flex items-center gap-3">
                  <Wand2 className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                  <Scissors className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                  <FileText className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                  <Tag className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                  <Code className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                  <Paperclip className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <span>{activeItem.time}</span>
                  <span>·</span>
                  <span>{activeItem.source}</span>
                </div>
              </div>

              {/* Message Thread Body */}
              <div className="p-5 space-y-5 text-left flex-1">
                {/* Subject Theme Bar */}
                <div className="text-xs font-semibold text-gray-900 pb-1">
                  <span className="text-gray-400 font-normal">Theme: </span>
                  {activeItem.subject}
                </div>

                {/* Conversation messages */}
                {activeItem.thread.map((msg, index) => {
                  return (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={msg.avatar}
                            alt={msg.sender}
                            className={`w-6 h-6 rounded-full object-cover ${
                              msg.isBot ? 'ring-2 ring-black' : ''
                            }`}
                          />
                          <span className="font-semibold text-gray-900 text-[12.5px]">
                            {msg.sender}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                          <span>{msg.time}</span>
                          <MoreVertical className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                        </div>
                      </div>

                      <div
                        className={`text-xs leading-relaxed rounded-xl p-3.5 whitespace-pre-line ${
                          msg.isBot
                            ? 'bg-white border border-gray-200/90 text-gray-800 shadow-xs'
                            : 'bg-transparent text-gray-700 pl-8'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
