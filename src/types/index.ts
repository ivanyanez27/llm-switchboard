export type LLMProvider = 'openai' | 'anthropic' | 'gemini' | 'deepsek';

export interface LLMResponse {
  provider: LLMProvider;
  response: string;
  error?: string;
  loading?: boolean;
}

export interface ComparisonState {
  prompt: string;
  responses: LLMResponse[];
  selectedProviders: LLMProvider[];
  setPrompt: (prompt: string) => void;
  setResponses: (responses: LLMResponse[]) => void;
  toggleProvider: (provider: LLMProvider) => void;
  clearResponses: () => void;
}