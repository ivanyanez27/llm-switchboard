import { Check } from 'lucide-react';
import { useComparisonStore } from '../store/comparison';
import type { LLMProvider } from '../types';

const PROVIDERS: { id: LLMProvider; name: string }[] = [
  { id: 'openai', name: 'OpenAI' },
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'deepsek', name: 'Deepsek' },
];

export function ProviderSelector() {
  const { selectedProviders, toggleProvider } = useComparisonStore();

  return (
    <div className="flex flex-wrap gap-2">
      {PROVIDERS.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => toggleProvider(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            selectedProviders.includes(id)
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {selectedProviders.includes(id) && (
            <Check size={16} className="text-blue-700" />
          )}
          {name}
        </button>
      ))}
    </div>
  );
}