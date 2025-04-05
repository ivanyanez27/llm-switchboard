import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Send } from 'lucide-react';
import { useComparisonStore } from '../store/comparison';

export function PromptInput() {
  const { prompt, setPrompt, clearResponses } = useComparisonStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // TODO: Implement API call
    clearResponses();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <TextareaAutosize
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full p-4 pr-12 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          minRows={3}
        />
        <button
          type="submit"
          className="absolute right-3 bottom-3 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!prompt.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}