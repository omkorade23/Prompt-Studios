import React, { useRef, useState, useEffect } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

interface PromptComposerProps {
  onSend: (text: string, file?: File) => void;
  disabled?: boolean;
  initialValue?: string;
  onInitialValueConsumed?: () => void;
}

export const PromptComposer: React.FC<PromptComposerProps> = ({
  onSend,
  disabled,
  initialValue,
  onInitialValueConsumed,
}) => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inject suggestion from EmptyState
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      onInitialValueConsumed?.();
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [initialValue, onInitialValueConsumed]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const newHeight = Math.min(Math.max(el.scrollHeight, 32), 180);
    el.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed && !file) return;
    onSend(trimmed, file ?? undefined);
    setValue('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (textareaRef.current) {
      textareaRef.current.style.height = '32px';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const canSend = (value.trim().length > 0 || !!file) && !disabled;

  return (
    <div className="px-4 pb-3 pt-1.5 shrink-0 w-full max-w-3xl mx-auto">
      <div
        className={`relative bg-white rounded-[26px] border transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
          focused
            ? 'border-gray-300 shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
            : 'border-gray-200/90'
        }`}
      >
        {/* File attachment preview */}
        {file && (
          <div className="flex items-center gap-2 px-4 pt-2.5 pb-1">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 max-w-[240px]">
              <Paperclip className="w-3 h-3 shrink-0 text-gray-400" />
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-gray-400 hover:text-gray-700 transition-colors ml-1 shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Compact Single-row Pill Composer */}
        <div className="flex items-end gap-1.5 pl-2.5 pr-2 py-1.5">
          {/* Upload / Attachment button */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".txt,.md,.json,.csv,.pdf"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 shrink-0 mb-0.5"
            title="Attach a prompt file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Write or paste your prompt…"
            rows={1}
            disabled={disabled}
            className="flex-1 resize-none bg-transparent text-[14px] text-gray-900 placeholder-gray-400 py-1.5 px-2 outline-none leading-[20px] font-normal disabled:opacity-50 max-h-[180px] overflow-y-auto"
            style={{ height: '32px' }}
          />

          {/* Send button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 shrink-0 mb-0.5 ${
              canSend
                ? 'bg-[#111317] hover:bg-black text-white shadow-sm hover:shadow active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-[11px] text-gray-400 mt-2 font-normal select-none">
        Prompt Studio may produce inaccurate information.
      </p>
    </div>
  );
};
