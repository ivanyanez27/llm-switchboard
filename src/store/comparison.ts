import { create } from 'zustand';
import type { ComparisonState, LLMProvider, LLMResponse } from '../types';

const DEFAULT_PROVIDERS: LLMProvider[] = ['openai', 'anthropic'];

export const useComparisonStore = create<ComparisonState>((set) => ({
  prompt: '',
  responses: [],
  selectedProviders: DEFAULT_PROVIDERS,
  setPrompt: (prompt) => set({ prompt }),
  setResponses: (responses) => set({ responses }),
  toggleProvider: (provider) =>
    set((state) => ({
      selectedProviders: state.selectedProviders.includes(provider)
        ? state.selectedProviders.filter((p) => p !== provider)
        : [...state.selectedProviders, provider],
    })),
  clearResponses: () => set({ responses: [] }),
}));