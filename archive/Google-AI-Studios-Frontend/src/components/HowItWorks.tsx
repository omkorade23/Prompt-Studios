import React, { useState } from 'react';
import {
  Clock,
  FileText,
  Globe,
  UploadCloud,
  Check,
  Send,
  Sparkles,
  Copy,
  ExternalLink,
  Bot,
  Layers,
  ChevronRight,
  Plus,
  X
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  // Step 1 interactive states
  const [selectedPill, setSelectedPill] = useState('Customer Support');
  const [userCustomPrompt, setUserCustomPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      time: '14:27',
      text: "Hello! I'm here to help you set up your chatbot. Please select your use case and describe your assistant's purpose."
    },
    {
      role: 'user',
      time: '14:28',
      text: 'I want to create a customer support chatbot.'
    },
    {
      role: 'bot',
      time: '14:30',
      text: 'Great choice! I can help you build a chatbot that answers questions, resolves issues, and supports your customers 24/7.'
    }
  ]);

  // Step 2 interactive states
  const [activeStep2Tab, setActiveStep2Tab] = useState<'upload' | 'url' | 'examples'>('upload');
  const [sources, setSources] = useState([
    { name: 'ProductOverview.pdf', meta: '2.4 MB · 12 pages', ready: true },
    { name: 'FAQ_Document.docx', meta: '1.1 MB · 8 pages', ready: true },
    { name: 'https://helpservice.com', meta: 'Website · 45 pages indexed', ready: true }
  ]);

  // Step 3 interactive states
  const [activeDestination, setActiveDestination] = useState<'website' | 'chat' | 'product' | 'mobile'>('website');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCustomPrompt.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', time: 'Just now', text: userCustomPrompt },
      {
        role: 'bot',
        time: 'Just now',
        text: `Got it! I've structured your prompt for "${userCustomPrompt}". Let's refine the tone and context next.`
      }
    ]);
    setUserCustomPrompt('');
  };

  const handleSelectPill = (pill: string) => {
    setSelectedPill(pill);
    setMessages((prev) => [
      ...prev,
      { role: 'user', time: 'Just now', text: `Let's focus on: ${pill}` },
      {
        role: 'bot',
        time: 'Just now',
        text: `Configured preset for "${pill}". Ready to attach your knowledge documents in Step 2.`
      }
    ]);
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#f4f7fb] border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-gray-200/90 text-xs font-normal text-gray-600 shadow-xs mb-4">
            How it works
          </div>
          <h2 className="text-3xl sm:text-[38px] font-semibold text-gray-900 tracking-tight leading-tight">
            How Prompt Studio Works
          </h2>
          <p className="mt-3 text-base sm:text-[17px] text-gray-500 font-normal">
            From a rough idea to a reliable prompt — in three simple steps.
          </p>
        </div>

        {/* Steps Stack */}
        <div className="space-y-24">
          {/* STEP 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Step 1 Mockup (Left 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/90 shadow-md p-5 sm:p-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">Botly Setup Assistant</span>
                    <span className="text-[11px] text-gray-400">Define your assistant's purpose</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    <Clock className="w-3 h-3" />
                    <span>Takes: 1-2 mins</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  </div>
                </div>
              </div>

              {/* Inner Split: Chat Area + Steps Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Chat conversation */}
                <div className="md:col-span-8 flex flex-col justify-between border-r-0 md:border-r border-gray-100 pr-0 md:pr-4">
                  <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`text-xs p-3 rounded-xl leading-relaxed ${
                          m.role === 'bot'
                            ? 'bg-gray-50 text-gray-800 border border-gray-100'
                            : 'bg-blue-50 border border-blue-100 text-blue-950 font-medium ml-4'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                          <span>{m.role === 'bot' ? 'Assistant' : 'You'}</span>
                          <span>{m.time}</span>
                        </div>
                        {m.text}
                      </div>
                    ))}
                  </div>

                  {/* Quick Pills */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {['Customer Support', 'Lead Generation', 'Sales Assistant', '+ Other'].map((pill) => (
                        <button
                          key={pill}
                          onClick={() => handleSelectPill(pill)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                            selectedPill === pill
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {pill}
                        </button>
                      ))}
                    </div>

                    {/* Input form */}
                    <form onSubmit={handleSendPrompt} className="relative flex items-center">
                      <input
                        type="text"
                        value={userCustomPrompt}
                        onChange={(e) => setUserCustomPrompt(e.target.value)}
                        placeholder="Describe your assistant's purpose..."
                        className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-9 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 p-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Stepper Checklist right */}
                <div className="md:col-span-4 flex flex-col justify-between py-1 text-xs">
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block text-[11.5px]">Define your intent</span>
                        <span className="text-[10.5px] text-gray-500 leading-tight block">
                          Tell us what your chatbot will help with.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 opacity-60">
                      <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block text-[11.5px]">Train with context</span>
                        <span className="text-[10.5px] text-gray-500 leading-tight block">
                          Upload docs, FAQs, or type examples.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 opacity-60">
                      <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block text-[11.5px]">Deploy everywhere</span>
                        <span className="text-[10.5px] text-gray-500 leading-tight block">
                          Add it to your website or support chat.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 mt-4 text-[11px] text-blue-900">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 mb-1" />
                    <span className="font-medium">AI Structuring Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1 Explanation (Right 5 cols) */}
            <div className="lg:col-span-5 text-left pl-0 lg:pl-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-normal text-gray-600 shadow-xs mb-4">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>Step 1</span>
              </div>
              <h3 className="text-2xl sm:text-[28px] font-semibold text-gray-900 tracking-tight">
                Create Your Prompt
              </h3>
              <p className="mt-3 text-base text-gray-500 leading-relaxed font-normal">
                Start with your idea and turn it into a clear, structured prompt.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Step 2 Mockup (Left 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/90 shadow-md p-5 sm:p-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 text-xs">
                <div>
                  <span className="font-bold text-gray-900 block text-xs">Botly Setup Assistant</span>
                  <span className="text-[11px] text-gray-400">Train your chatbot with your sources</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    <Clock className="w-3 h-3" />
                    <span>Takes: 2-3 mins</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  </div>
                </div>
              </div>

              {/* Source Tabs */}
              <div className="flex items-center gap-2 mb-3 text-xs border-b border-gray-100 pb-2">
                <button
                  onClick={() => setActiveStep2Tab('upload')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activeStep2Tab === 'upload' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Upload Docs
                </button>
                <button
                  onClick={() => setActiveStep2Tab('url')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activeStep2Tab === 'url' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Add URL
                </button>
                <button
                  onClick={() => setActiveStep2Tab('examples')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activeStep2Tab === 'examples' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Type Examples
                </button>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-gray-200 bg-gray-50/70 rounded-xl p-5 text-center mb-4 hover:border-gray-300 transition-colors">
                <UploadCloud className="w-7 h-7 text-blue-500 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-gray-800 block">Drag & drop files here</span>
                <span className="text-[11px] text-gray-400 block mb-2">PDF, Word, TXT (MAX 500MB)</span>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-[11px] font-semibold text-gray-700 shadow-xs hover:bg-gray-50">
                  Choose Files
                </button>
              </div>

              {/* Sources List */}
              <div className="space-y-2 mb-4">
                <div className="text-[11px] font-semibold text-gray-500 flex items-center justify-between">
                  <span>Your sources</span>
                  <span>{sources.length} files · 2.6Mb</span>
                </div>
                {sources.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-gray-50/90 rounded-lg text-xs border border-gray-100"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-gray-800 truncate">{item.name}</span>
                      <span className="text-[10.5px] text-gray-400 shrink-0 hidden sm:inline">{item.meta}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Ready
                      </span>
                      <button
                        onClick={() => setSources(sources.filter((_, i) => i !== idx))}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar Training Status */}
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <Sparkles className="w-2.5 h-2.5" />
                    </div>
                    <span className="font-semibold text-blue-950 text-[11.5px]">Training your chatbot...</span>
                  </div>
                  <span className="font-bold text-blue-700 text-xs">75%</span>
                </div>
                <div className="w-full bg-blue-200/60 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full w-3/4 transition-all duration-500"></div>
                </div>
                <span className="text-[10px] text-blue-600 mt-1 block">
                  Botly is reading your content and building knowledge...
                </span>
              </div>
            </div>

            {/* Step 2 Explanation (Right 5 cols) */}
            <div className="lg:col-span-5 text-left pl-0 lg:pl-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-normal text-gray-600 shadow-xs mb-4">
                <FileText className="w-3.5 h-3.5 text-gray-500" />
                <span>Step 2</span>
              </div>
              <h3 className="text-2xl sm:text-[28px] font-semibold text-gray-900 tracking-tight">
                Refine with AI
              </h3>
              <p className="mt-3 text-base text-gray-500 leading-relaxed font-normal">
                Improve your instructions, context, and structure with AI-assisted refinement.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Step 3 Mockup (Left 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/90 shadow-md p-5 sm:p-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 text-xs">
                <div>
                  <span className="font-bold text-gray-900 block text-xs">Deploy everywhere</span>
                  <span className="text-[11px] text-gray-400">Add Botly to your website, product, or support channels.</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>All systems operational</span>
                </div>
              </div>

              {/* Destination selector grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  { id: 'website', name: 'Website', meta: 'HTML embed code' },
                  { id: 'chat', name: 'Support Chat', meta: 'Helpdesk hook' },
                  { id: 'product', name: 'Product', meta: 'In-app modal' },
                  { id: 'mobile', name: 'Mobile App', meta: 'iOS & Android SDK' }
                ].map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setActiveDestination(dest.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      activeDestination === dest.id
                        ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-bold text-gray-900 text-xs block">{dest.name}</span>
                    <span className="text-[10px] text-gray-500 block truncate">{dest.meta}</span>
                  </button>
                ))}
              </div>

              {/* Inner 2-column: Code snippet / Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* Embed code snippet */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800 text-[11.5px]">Embed your chatbot</span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:text-blue-700"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="bg-[#0f1115] text-gray-300 font-mono text-[10.5px] p-3 rounded-xl border border-gray-800 leading-relaxed overflow-x-auto">
                    <span className="text-gray-500">&lt;!-- Prompt Studio Widget --&gt;</span>
                    <br />
                    <span className="text-purple-400">&lt;script&gt;</span>
                    <br />
                    &nbsp;&nbsp;window.<span className="text-blue-400">botlyConfig</span> = &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;botId: <span className="text-emerald-400">"ps-bot-98412"</span>,
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;theme: <span className="text-emerald-400">"light"</span>
                    <br />
                    &nbsp;&nbsp;&#125;;
                    <br />
                    <span className="text-purple-400">&lt;/script&gt;</span>
                    <br />
                    <span className="text-purple-400">&lt;script</span> <span className="text-amber-300">src</span>=
                    <span className="text-emerald-400">"https://cdn.promptstudio.ai/v1.js"</span>
                    <span className="text-purple-400">&gt;&lt;/script&gt;</span>
                  </div>

                  {/* Share your bot link */}
                  <div className="pt-1">
                    <span className="font-bold text-gray-800 text-[11.5px] block mb-1">Share your bot</span>
                    <div className="flex items-center gap-1.5">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-500 font-mono flex-1 truncate">
                        https://promptstudio.ai/preview/bot-984
                      </div>
                      <button
                        onClick={handleCopyLink}
                        className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold shrink-0"
                      >
                        {copiedLink ? 'Copied' : 'Copy link'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side inside mockup: Mini live chat preview */}
                <div className="sm:col-span-5 bg-gray-50 border border-gray-200/80 rounded-xl p-3 flex flex-col justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                      <div className="w-4 h-4 rounded-full bg-black"></div>
                      <span className="font-bold text-gray-900 text-xs">Botly</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 rounded ml-auto">Live</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-gray-200/80 text-[11.5px] mb-2 shadow-xs">
                      Hi there! 👋 How can I help you today?
                    </div>

                    <div className="space-y-1">
                      <button className="w-full text-left p-1.5 bg-white border border-gray-200 rounded text-[10.5px] font-medium text-gray-700 hover:bg-gray-50">
                        Learn about features
                      </button>
                      <button className="w-full text-left p-1.5 bg-white border border-gray-200 rounded text-[10.5px] font-medium text-gray-700 hover:bg-gray-50">
                        Book a demo
                      </button>
                    </div>
                  </div>

                  {/* Integration list */}
                  <div className="mt-3 pt-2 border-t border-gray-200 text-[10.5px] space-y-1 text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Website</span>
                      <span className="text-emerald-600 font-semibold">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Support Chat</span>
                      <span className="text-emerald-600 font-semibold">Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 Explanation (Right 5 cols) */}
            <div className="lg:col-span-5 text-left pl-0 lg:pl-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-normal text-gray-600 shadow-xs mb-4">
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>Step 3</span>
              </div>
              <h3 className="text-2xl sm:text-[28px] font-semibold text-gray-900 tracking-tight">
                Test & Evaluate
              </h3>
              <p className="mt-3 text-base text-gray-500 leading-relaxed font-normal">
                Run your prompt, inspect the output, and iterate until it works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
