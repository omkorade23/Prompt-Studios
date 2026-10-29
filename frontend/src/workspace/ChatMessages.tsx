import React from 'react';
import { Message } from './types';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

/** Very light markdown: bold **text**, inline code `code`, newlines → <br/> */
function renderContent(text: string) {
  // Split into parts separated by code blocks or bold
  const parts: React.ReactNode[] = [];
  let key = 0;

  // Process line-by-line for code fences
  const lines = text.split('\n');
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // close code block
        parts.push(
          <pre key={key++} className="my-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[12.5px] font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">
            {codeLines.join('\n')}
          </pre>
        );
        inCodeBlock = false;
        codeLines = [];
      } else {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
      }
    } else if (inCodeBlock) {
      codeLines.push(line);
    } else {
      // Process inline: bold **text**, inline `code`
      const inlineRendered = renderInline(line, key);
      key = inlineRendered.nextKey;
      parts.push(<span key={key++}>{inlineRendered.nodes}<br /></span>);
    }
  }

  // Unclosed code block
  if (inCodeBlock && codeLines.length > 0) {
    parts.push(
      <pre key={key++} className="my-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[12.5px] font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">
        {codeLines.join('\n')}
      </pre>
    );
  }

  return parts;
}

function renderInline(text: string, startKey: number): { nodes: React.ReactNode[], nextKey: number } {
  const nodes: React.ReactNode[] = [];
  let key = startKey;
  // Match **bold** and `code`
  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<React.Fragment key={key++}>{text.slice(lastIndex, match.index)}</React.Fragment>);
    }
    if (match[2]) {
      nodes.push(<strong key={key++} className="font-semibold text-gray-900">{match[2]}</strong>);
    } else if (match[3]) {
      nodes.push(<code key={key++} className="px-1.5 py-0.5 bg-gray-100 rounded text-[12px] font-mono text-gray-800">{match[3]}</code>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(<React.Fragment key={key++}>{text.slice(lastIndex)}</React.Fragment>);
  }
  return { nodes, nextKey: key };
}

const AssistantDot: React.FC = () => (
  <img
    src="/botly-logo.png"
    alt="Prompt Studio"
    className="w-5 h-5 object-contain shrink-0 mt-0.5"
  />
);

const TypingIndicator: React.FC = () => (
  <div className="flex items-start gap-3 max-w-3xl mx-auto px-4 py-3">
    <AssistantDot />
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 mt-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
          style={{ animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  </div>
);

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading, bottomRef }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
        {messages.map((msg) => {
          if (msg.role === 'user') {
            return (
              <div key={msg.id} className="flex justify-end py-1.5">
                <div className="max-w-[75%]">
                  <div className="px-4 py-3 rounded-2xl rounded-br-sm bg-[#111317] text-white text-[14px] font-normal leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                  <p className="text-[11px] text-gray-400 text-right mt-1 pr-1">{formatTime(msg.timestamp)}</p>
                </div>
              </div>
            );
          }
          // Assistant
          return (
            <div key={msg.id} className="flex items-start gap-3 py-1.5 group">
              <AssistantDot />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] text-gray-800 font-normal leading-relaxed">
                  {renderContent(msg.content)}
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">{formatTime(msg.timestamp)}</p>
              </div>
            </div>
          );
        })}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
